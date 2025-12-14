"use client";

import CustomDateFormatter from "@/hooks/CustomDateFormatter ";
import useGlobalContext from "@/hooks/use-context";
import { PaymentInfoType } from "@/interFace/interFace";
import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const PaymentInfo = () => {
  const { user, header } = useGlobalContext();
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfoType[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  useEffect(() => {
    axios
      .get(
        `${process.env.BASE_URL}success/payment-info?email=${user?.email}`,
        header
      )
      .then((res) => {
        const sortedData = res.data.data.sort(
          (a: PaymentInfoType, b: PaymentInfoType) =>
            moment(b.date, "MM/DD/YY hh:mm a").valueOf() -
            moment(a.date, "MM/DD/YY hh:mm a").valueOf()
        );
        setPaymentInfo(sortedData);
      })
      .catch((e) => { });
  }, [user?.email, header]);
  const copyPaymentId = (item: PaymentInfoType) => {
    setCopied(false);
    setProductId(item._id);
    if (item._id == productId) {
      navigator.clipboard.writeText(item.paymentId);
      toast.success("Payment Id Copied");
      setCopied(true);
    }
  };
  return (
    <>
      {paymentInfo.length ? (
        <>
          {paymentInfo?.map((item) => (
            <div key={item._id} className="student-profile-reviews">
              <div className="student-profile-reviews-item mb-30">
                <div className="student-profile-reviews-course-title d-flex justify-content-between cursore_class">
                  <h5>
                    {" "}
                    Payment Id : <small>{item.paymentId}</small>{" "} <br></br>
                    <p>
                      Date: <CustomDateFormatter inputDate={item?.date as string} />{" "}</p>
                  </h5><br />



                  <button
                    onClick={() => copyPaymentId(item)}
                    className="copy-button"
                  >
                    <i
                      className={`fa-solid ${copied && item._id === productId
                          ? "fa-check"
                          : "fa-copy"
                        }`}
                    ></i>
                  </button>

                </div>

                <div className="student-profile-reviews-text">
                  <div className="student-profile-review-content">
                    <h6></h6>
                    {/* pro */}
                    <div className="d-flex justify-content-between">
                      <h5>Products List </h5>
                      <h5>Total Price : {item.totalPrice} </h5>
                    </div>
                    <ul className="icon_list  unordered_list_block">
                      {item.orderProducts.length ? (
                        <>
                          {item.orderProducts.map((itm: any) => (
                            <li
                              key={itm._id}
                              className="d-flex justify-content-between"
                            >
                              <span className="list_item_text">
                                {" "}
                                {itm.productName}{" "}
                              </span>
                              <span className="list_item_text">
                                {" "}
                                Product Id : {itm._id}{" "}
                              </span>
                            </li>
                          ))}
                        </>
                      ) : (
                        <> <p className="text-center">No Purchases</p> </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <> <p className="text-center">No Purchases</p> </>
      )}
    </>
  );
};

export default PaymentInfo;
