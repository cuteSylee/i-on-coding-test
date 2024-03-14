import React, { useState } from "react";
import "../css/Products.css";
import data from "../data/meta.json";
import CartIcon from "./CartIcon";
import FavoriteIcon from "./FavoriteIcon";
import CartModal from "./CartModal";
import { useCartStore, useFavoriteStore } from "../utils/globalState";
import { handleCart, handleFavorite } from "../utils/common";

//상품목록
const Products = () => {
  const [isOpen, setIsOpen] = useState(false);
  const defaultPrice = useCartStore((state) => state.defaultPrice);
  const setDefaultPrice = useCartStore((state) => state.setDefaultPrice);
  const cartItem = useCartStore((state) => state.cartItem);
  const setCartItem = useCartStore((state) => state.setCartItem);
  const favoriteItem = useFavoriteStore((state) => state.favoriteItem);
  const setFavoriteItem = useFavoriteStore((state) => state.setFavoriteItem);
  const isFavoriteClicked = useFavoriteStore(
    (state) => state.isFavoriteClicked,
  );
  const setIsFavoriteClicked = useFavoriteStore(
    (state) => state.setIsFavoriteClicked,
  );

  return (
    <>
      <div className="products">
        <div className="products__container">
          <div className="products__title">
            <span className="products__title__text">PROUDUCT LIST</span>
          </div>
          <div className="products__contents1">
            <div className="products__contents__row1">
              {data.productList.map((value, idx) => {
                return (
                  idx < 3 && (
                    <div className="products__items" key={idx}>
                      <img
                        className="products__item"
                        src={value.image}
                        alt=""
                      />
                      <div className="products__btns">
                        <CartIcon
                          isBoard={true}
                          style={{
                            position: "relative",
                            backgroundColor: "#2BBA3E",
                            color: "#F8F9FA",
                          }}
                          onClick={() =>
                            handleCart(
                              value,
                              cartItem,
                              setCartItem,
                              defaultPrice,
                              setDefaultPrice,
                              setIsOpen,
                              isOpen,
                            )
                          }
                        />
                        <FavoriteIcon
                          isBoard={true}
                          style={{
                            position: "relative",
                            bottom: "8px",
                            left: "5px",
                            backgroundColor: "#2BBA3E",
                            color: isFavoriteClicked[value.id - 1]
                              ? "rgba(224, 49, 49, 1)"
                              : "rgba(222, 226, 230, 1)",
                          }}
                          onClick={() =>
                            handleFavorite(
                              value,
                              isFavoriteClicked,
                              setIsFavoriteClicked,
                              favoriteItem,
                              setFavoriteItem,
                            )
                          }
                        />
                      </div>
                      <div className="products__label__container">
                        <span className="products__label">{value.label}</span>
                        <div className="products__price__container">
                          <span className="products__price">
                            {value.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </span>
                          <div className="products__price__unit__container">
                            <span className="products__price__unit">원</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
          <div className="products__contents2">
            <div className="products__contents__row2">
              {data.productList.map((value, idx) => {
                return (
                  idx > 2 &&
                  idx < 6 && (
                    <div className="products__items" key={idx}>
                      <img
                        className="products__item"
                        src={value.image}
                        alt=""
                      />
                      <div className="products__btns">
                        <CartIcon
                          isBoard={true}
                          style={{
                            position: "relative",
                            backgroundColor: "#2BBA3E",
                            color: "#F8F9FA",
                          }}
                          onClick={() =>
                            handleCart(
                              value,
                              cartItem,
                              setCartItem,
                              defaultPrice,
                              setDefaultPrice,
                              setIsOpen,
                              isOpen,
                            )
                          }
                        />
                        <FavoriteIcon
                          isBoard={true}
                          style={{
                            position: "relative",
                            bottom: "8px",
                            left: "5px",
                            backgroundColor: "#2BBA3E",
                            color: isFavoriteClicked[value.id - 1]
                              ? "rgba(224, 49, 49, 1)"
                              : "rgba(222, 226, 230, 1)",
                          }}
                          onClick={() =>
                            handleFavorite(
                              value,
                              isFavoriteClicked,
                              setIsFavoriteClicked,
                              favoriteItem,
                              setFavoriteItem,
                            )
                          }
                        />
                      </div>
                      <div className="products__label__container">
                        <span className="products__label">{value.label}</span>
                        <div className="products__price__container">
                          <span className="products__price">
                            {value.price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                          </span>
                          <div className="products__price__unit__container">
                            <span className="products__price__unit">원</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <CartModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Products;
