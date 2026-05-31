import GetRatting from "@/hooks/GetRatting";
import useGlobalContext from "@/hooks/use-context";
import { CartProductType } from "@/interFace/interFace";
import ShopPreloader from "@/preloaders/ShopPreloader";
import { cart_product } from "@/redux/slices/cartSlice";
import { wishlist_product } from "@/redux/slices/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const GridViewProduct = ({ products, limit }: any) => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [ageCategory, setAgeCategory] = useState("");
  const { openModal, setOpenModal, setModalId, prodcutLoadding } =
    useGlobalContext();
  const dispatch = useDispatch();
  const handleAddToWishlist = (product: CartProductType) => {
    dispatch(wishlist_product(product));
  };

  const handleMoldalData = (id: string) => {
    if (id) {
      setOpenModal(!openModal);
      setModalId(id);
    }
  };

  return (
    <>
      {prodcutLoadding === true && <ShopPreloader end={8} />}
      {products?.length ? (
        <>
          {products.slice(0, limit).map((item: any, index: number) => {
            const rettingsArray = Array.isArray(item?.rettings)
              ? item.rettings
              : [];

            const sum = rettingsArray.reduce(
              (acc: number, currentValue: number) => acc + currentValue,
              0,
            );

            const rettingsLength = rettingsArray.length;
            const rowRetting = rettingsLength > 0 ? sum / rettingsLength : 0;
            const averageRating = parseFloat(rowRetting.toFixed(1));

            return (
              <div
                className="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6"
                key={index}
              >
                <div className="bd-trending__item text-center mb-30 position-relative">
                  <div className="bd-trending__product-thumb border-5">
                    <Link href={`/performance-details/${item?._id}`}>
                      <Image
                        src={item?.img}
                        alt="product-img"
                        width={500}
                        height={500}
                        style={{ width: "100%", height: "auto" }}
                      />
                    </Link>
                    {/* {item?.productQuantity > 0 ? (
                      <> */}
                    <div className="bd-product__action">
                      <span
                        className="cart-btn"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Quick Performance"
                        onClick={() => {
                          setSelectedProduct(item);
                          setAgeCategory("");
                          setShowCategoryModal(true);
                        }}
                      >
                        <i className="fal fa-cart-arrow-down"></i>
                      </span>
                      <span
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Quick View"
                        data-bs-toggle="modal"
                        data-bs-target="#productmodal"
                        onClick={() => handleMoldalData(item._id)}
                      >
                        <i className="fal fa-eye"></i>
                      </span>
                      <span
                        className="wishlist-btn"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Quick Wishlist"
                        onClick={() => handleAddToWishlist(item)}
                      >
                        <i className="fal fa-heart"></i>
                      </span>
                    </div>
                    {/* </>
                    ) : (
                      <>
                        <div className="bd-product__action">
                          <span
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Quick View"
                            data-bs-toggle="modal"
                            data-bs-target="#productmodal"
                            onClick={() => handleMoldalData(item._id)}
                          >
                            <i className="fal fa-eye"></i>
                          </span>
                        </div>
                      </>
                    )} */}
                  </div>
                  <div className="bd-teanding__content">
                    <h4 className="bd-product__title">
                      <Link href={`/performance-details/${item?._id}`}>
                        {item?.productName}
                      </Link>
                    </h4>
                    <div className="bd-product__price">
                      {item?.offer === true ? (
                        <span className="bd-product__old-price">
                          <del>
                            {`₹${
                              item?.oldPrice % 1 === 0
                                ? `${item?.oldPrice}.00`
                                : item?.oldPrice.toFixed(2)
                            }`}
                          </del>
                        </span>
                      ) : (
                        <></>
                      )}

                      {item?.price % 1 === 0 ? (
                        <span className="bd-product__new-price">
                          ₹{`${item?.price}.00`}
                        </span>
                      ) : (
                        <span className="bd-product__new-price">
                          ₹{item?.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="bd-product__icon">
                      <GetRatting averageRating={averageRating} />
                    </div>
                  </div>

                  <div className="bd-product__tag">
                    {item?.offer ? (
                      <>
                        <span className="tag-text danger-bg">
                          {" "}
                          {item?.offerPersent}%
                        </span>
                      </>
                    ) : (
                      <>
                        {/* {
                          item?.productQuantity > 0 ? <> */}
                        <span className="tag-text theme-bg">
                          {" "}
                          {item?.productStatus}
                        </span>
                        {/* </>
                          :
                          <>
                          <span className="tag-text wraning-bg">
                          {" "}
                           Stock Out
                        </span>
                          </>
                        } */}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <>
          {prodcutLoadding === false && (
            <p className="text center">No Product</p>
          )}
        </>
      )}
      {showCategoryModal && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Age Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowCategoryModal(false)}
                />
              </div>

              <div className="modal-body">
                <p className="mb-2 fw-medium">{selectedProduct?.productName}</p>

                <select
                  className="form-select"
                  value={ageCategory}
                  onChange={(e) => setAgeCategory(e.target.value)}
                >
                  <option value="">-- Select Category --</option>
                  <option value="Tiny Stars">
                    🌟 Tiny Stars (Playschool–UKG)
                  </option>
                  <option value="Super Kids">🚀 Super Kids (Grades 1–4)</option>
                  <option value="Cool Champs">
                    ⭐ Cool Champs (Grades 5–8)
                  </option>
                  <option value="Teen Titans">
                    🔥 Teen Titans (Grades 9–12)
                  </option>
                </select>
              </div>

              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowCategoryModal(false)}
                >
                  Cancel
                </button>

                <button
                  className="btn btn-primary"
                  disabled={!ageCategory}
                  onClick={() => {
                    dispatch(
                      cart_product({
                        ...selectedProduct,
                        ageCategory,
                      }),
                    );
                    setShowCategoryModal(false);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GridViewProduct;
