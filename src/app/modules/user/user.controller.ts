import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "./user.model";
import { Order } from "../OrderProduct/orderSuccess.model";
import { EventSubmission } from "../submission/submission.model";
import {
  sendprofileUpdatedEmail,
  sendSignUpEmail,
} from "../email/email.controller";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { GoogleUser } from "./googleUser.model";
import { EvaluatorEligibleEvent } from "../evaluators/evaluatorEligibleEvent.model";
require("dotenv").config();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const createUser = async (req: Request, res: Response) => {
  try {
    const userinfo = req.body;
    const {
      name,
      email,
      password,
      role,
      phone,
      date,
      photo,
      gender,
      address,
      city,
      pincode,
    } = userinfo;
    const enryptedpass = await bcrypt.hash(password, 10);
    const alreayExist = await User.findOne({ email: email });
    if (alreayExist) {
      res.send({ message: "User Is Alreay Exist" });
    } else {
      const user = new User({
        name,
        email,
        password: enryptedpass,
        role,
        phone,
        date,
        photo,
        gender,
        address,
        city,
        pincode,
      });

      await user.save();
      sendSignUpEmail(email, name);
      res.status(200).send({ message: "success" });
    }
  } catch (e) {
    res.send({ message: "custome error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const userinfo = req.body;
    const { email, password } = userinfo;
    const validuser = await User.findOne({ email: email });

    if (validuser) {
      const validPass = await bcrypt.compare(password, validuser.password);

      if (validPass) {
        const token = jwt.sign(
          { email: validuser.email },
          `${process.env.JWT_SECRET}`,
          { expiresIn: "1d" }
        );
        res.status(200).send({ message: "Login Successful", data: token });
      } else {
        res.send({ message: "password not Match" });
      }
    } else {
      res.send({ message: "user not Valid" });
    }
  } catch (e) {
    res.send({ message: "custom error" });
  }
};

export const getLoginUser = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    const secretKey: Secret = process.env.JWT_SECRET || "fallbackSecret"; // Cast to Secret type
    const user = jwt.verify(token, secretKey) as { email: string };
    const userEmail = user.email;
    const userdata = await User.findOne({ email: userEmail }).select(
      "-password"
    );

    let googleuserdata;
    if (!userdata) {
      googleuserdata = await GoogleUser.findOne({ emailId: userEmail }).select(
        "-_id"
      );
    }

    if (userdata || googleuserdata) {
      if (userdata?.evaluator) {
        const eligibleEvents = await EvaluatorEligibleEvent.findOne({
          userId: userdata._id,
        });
        return res.status(200).send({
          message: "Successful",
          data: {
            ...(userdata?.toObject() || googleuserdata?.toObject()),
            eligibleEvents: eligibleEvents?.eligibleEvents || [],
          },
        });
      }

      return res
        .status(200)
        .send({ message: "Successful", data: userdata || googleuserdata });
    } else {
      return res.status(400).send({ message: "Not Valid User" });
    }
  } catch (e) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getRecentUsers = async (req: Request, res: Response) => {
  try {
    const recentUser = await User.find({})
      .select("-password -__v")
      .sort({ date: -1 })
      .limit(5);

    res.send(recentUser);
  } catch (e) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const updateUserInfo = async (req: Request, res: Response) => {
  try {
    const { id, name, phone, photo: profilePic, gender } = req.body;
    await User.updateOne(
      { _id: id },
      {
        $set: {
          name,
          phone,
          photo: profilePic,
          gender,
        },
      }
    );

    const data = await User.findById({ _id: id });
    const email = data?.email || "";

    await sendprofileUpdatedEmail(
      email,
      name,
      process.env.FRONTEND_URL + "/dashboard"
    );

    res.status(200).send({ message: "success" });
  } catch (e) {
    res.send({ message: "custom error" });
  }
};

export const updateUserPhoto = async (req: Request, res: Response) => {
  try {
    const { id, photo: profilePic } = req.body;
    await User.updateOne(
      { _id: id },
      {
        $set: {
          photo: profilePic,
        },
      }
    );

    const data = await User.findById({ _id: id });
    const name = data?.name || "User";
    const email = data?.email || "";

    await sendprofileUpdatedEmail(
      email,
      name,
      process.env.FRONTEND_URL + "/dashboard"
    );

    res.status(200).send({ message: "success" });
  } catch (e) {
    res.status(500).send({ message: "custom error" });
  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    const parsedPage = parseInt(page as string);
    const parsedLimit = parseInt(limit as string);
    const skip = (parsedPage - 1) * parsedLimit;
    const users = await User.find({})
      .select("-orderProducts")
      .sort({ date: -1 })
      .skip(skip)
      .limit(parsedLimit);
    const totaluserCount = await User.countDocuments();
    const totalPages = Math.ceil(totaluserCount / parsedLimit);
    res.status(200).send({
      users,
      totalPages,
      currentPage: parsedPage,
      totalProducts: totaluserCount,
    });
  } catch (e) {
    res.status(500).send({ message: "custom error" });
  }
};

// delete users

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await User.deleteOne({ _id: req.query.id });
    if (result.deletedCount === 1) {
      res.send({ message: "success" });
    } else {
      res.send({ message: "something is wrong" });
    }
  } catch (err) {
    res.send({ message: "Error occurred while deleting user history" });
  }
};

// update user role

export const makeUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await User.updateOne(
      { _id: id },
      {
        $set: {
          role: "user",
        },
      }
    );

    res.send({ message: "success" });
  } catch (e) {
    res.send({ message: "custom error" });
  }
};

export const makeAdmin = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    await User.updateOne(
      { _id: id },
      {
        $set: {
          role: "admin",
        },
      }
    );

    res.send({ message: "success" });
  } catch (e) {
    res.send({ message: "custom error" });
  }
};

// search user

export const searchUser = async (req: Request, res: Response) => {
  try {
    const searchQuery = req.query.search;
    let keywordArray: any = [];

    if (searchQuery && typeof searchQuery === "string") {
      keywordArray = searchQuery.split(",");
    } else if (Array.isArray(searchQuery)) {
      keywordArray = searchQuery;
    }

    const keywordFilter = keywordArray.map((keyword: string) => ({
      $or: [
        { email: { $regex: keyword, $options: "i" } },
        { name: { $regex: keyword, $options: "i" } },
        { role: { $regex: keyword, $options: "i" } },
        { Phone: { $regex: keyword, $options: "i" } },
        { date: { $regex: keyword, $options: "i" } },
      ],
    }));

    const query = keywordFilter.length > 0 ? { $or: keywordFilter } : {};
    const result = await User.find(query).sort({ date: -1 });
    res.send(result);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

// change password
export const changePassword = async (req: Request, res: Response) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.send({ message: "User not found" });
    }

    // Check if the current password matches the one in the database
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.send({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const newPasswordHash = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    await User.updateOne({ email }, { password: newPasswordHash });

    res.status(200).send({ message: "Password changed successfully" });
  } catch (e) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

export const getAllContestants = async (req: Request, res: Response) => {
  try {
    const { eventName } = req.body;

    if (!eventName) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    // Find all orders that have the specified product name in their orderProducts array
    const contestants = await EventSubmission.find({
      eventname: eventName,
    }).exec();

    return res.status(200).json({
      success: true,
      contestants,
      total: contestants.length,
    });
  } catch (error) {
    console.error("Error fetching contestants:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching contestants",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const submittingRating = async (req: Request, res: Response) => {
  try {
    const { productName } = req.body;

    if (!productName) {
      return res.status(400).json({
        success: false,
        message: "Product name is required",
      });
    }

    // Find all orders that have the specified product name in their orderProducts array
    const contestants = await EventSubmission.find({
      eventname: productName,
    }).exec();

    return res.status(200).json({
      success: true,
      contestants,
      total: contestants.length,
    });
  } catch (error) {
    console.error("Error fetching contestants:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching contestants",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const signinByGoogle = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }

    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!googleRes.ok) {
      return res.status(400).json({
        success: false,
        message: "Failed to fetch Google user info",
      });
    }

    const payload: { sub: string; email: string; name: string } =
      await googleRes.json();
    const { email, name, sub: googleId } = payload;

    const dateFormatted = new Date().toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    if (!email || !googleId) {
      return res.status(400).json({
        success: false,
        message: "Invalid token payload",
      });
    }

    const alreadyExistingUser = await GoogleUser.findOne({
      googleId: googleId,
    });

    if (!alreadyExistingUser) {
      try {
        const newGoogleUser = new GoogleUser({
          googleId,
          emailId: email,
          name,
        });
        await newGoogleUser.save();

        const user = new User({
          name,
          email,
          role: "user",
          date: dateFormatted,
        });
        console.log("user table data " + user);
        await user.save();
        console.log("data saved to user table");
      } catch (err) {
        console.error("Error saving Google user to DB:", err);
        return res.status(500).json({
          success: false,
          message: "Failed to save user to database",
        });
      }
    }

    const jwttoken = jwt.sign({ email: email }, `${process.env.JWT_SECRET}`, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token: jwttoken,
      user: {
        email,
        name,
      },
      message: "Login Successful",
    });
  } catch (error) {
    console.error("Error in Google Sign-In:", error);
    return res.status(500).json({
      success: false,
      message: "Error signing in with Google",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};

export const signinByFacebook = async (req: Request, res: Response) => {
  try {
    const { accessToken } = req.body;
    const myaccesstoken = `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`;

    if (!accessToken) {
      console.log("data coming for facebook login - " + accessToken);
      return res.status(400).json({
        success: false,
        message: "Access Token is required",
      });
    }

    const data = await fetch(
      `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${myaccesstoken}`
    );
    const dataJson = await data.json();

    if (dataJson.error || dataJson.data.is_valid === false) {
      console.log("data from facebook:", dataJson);
      return res.status(400).json({
        success: false,
        message: "Invalid Facebook User Access Token",
      });
    }

    const userInfoResponse = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,gender,location,picture.type(large)&access_token=${accessToken}`
    );
    const userInfo = await userInfoResponse.json();

    if (userInfo.error) {
      console.log("data from facebook:", userInfo);
      return res.status(400).json({
        success: false,
        message: "Error fetching user info from Facebook",
      });
    }

    const dateFormatted = new Date().toLocaleString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const alreadyExistingUser = await User.findOne({ email: userInfo.email });

    if (!alreadyExistingUser) {
      try {
        const user = new User({
          name: userInfo.name,
          email: userInfo.email,
          gender: userInfo.gender,
          photo: userInfo.picture.data.url,
          role: "user",
          date: dateFormatted,
        });
        console.log("user table data " + user);
        await user.save();
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to save user to database",
          error:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    }

    const jwttoken = jwt.sign(
      { email: userInfo.email },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      token: jwttoken,
      user: {
        email: userInfo.email,
        name: userInfo.name,
      },
      message: "Login Successful",
    });
  } catch (error) {
    console.error("Error in Google Sign-In:", error);
    return res.status(500).json({
      success: false,
      message: "Error signing in with Google",
      error: error instanceof Error ? error.message : "Unknown error occurred",
    });
  }
};
