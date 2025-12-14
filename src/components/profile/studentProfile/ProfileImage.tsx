import Image from "next/image";
import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa"; // Install if needed: npm i react-icons
import { IUser } from "../../../interFace/interFace";
import thumb from "../../../../public/assets/img/icon/user-icon.png";
import axios from "axios";
import { useRouter } from "next/navigation";

const ProfileImage = ({ user }: { user: IUser }) => {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(user?.photo || null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview instantly
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/");
      return;
    }

    // 1️⃣ Upload to Cloudinary
    const cloudinaryUrl = await uploadToCloudinary(file, user.email);

    // 2️⃣ Save Cloudinary URL to backend
    const res = await axios.put(
      `${process.env.BASE_URL}user/update-photo?email=${user.email}`,
      {
        id: user._id,
        photo: cloudinaryUrl, // save real hosted URL, not blob
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.status === 200) {
      console.log("Profile photo updated successfully");
    } else {
      console.error("Failed to update profile photo");
    }
  };

  const uploadToCloudinary = async (file: File, email: string) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", "profile_photo_preset");
    formData.append("folder", "profilePhoto");

    // Set file public_id as email_profile
    const fileName = `${email}_profile`;
    formData.append("public_id", fileName);

    const cloudName = "db94junmz";

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const res = await axios.post(uploadUrl, formData);

    return res.data.secure_url;
  };

  return (
    <div
      className="position-relative d-inline-block"
      style={{ width: "130px", height: "130px" }}
    >
      <Image
        src={preview || thumb}
        alt="User"
        width={130}
        height={130}
        className="rounded-circle border"
        style={{ objectFit: "cover" }}
      />

      {/* EDIT BUTTON */}
      <button
        className="btn btn-primary p-1 position-absolute"
        style={{
          bottom: "0",
          right: "0",
          borderRadius: "50%",
          width: "35px",
          height: "35px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={handleClick}
      >
        <FaCamera size={16} />
      </button>

      {/* HIDDEN FILE INPUT */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="d-none"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfileImage;
