import React, { useState } from "react";
import "../css/Favorite.css";
import { useCartStore, useFavoriteStore } from "../utils/globalState";
import { handleCart, handleFavorite } from "../utils/common";
import CartModal from "../components/CartModal";
import FavoriteIcon from "../components/FavoriteIcon";
import { useNavigate } from "react-router-dom";

//찜목록
const Favorite = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const favoriteItem = useFavoriteStore((state) => state.favoriteItem);
  const setFavoriteItem = useFavoriteStore((state) => state.setFavoriteItem);
  const isFavoriteClicked = useFavoriteStore(
    (state) => state.isFavoriteClicked,
  );
  const setIsFavoriteClicked = useFavoriteStore(
    (state) => state.setIsFavoriteClicked,
  );
  const defaultPrice = useCartStore((state) => state.defaultPrice);
  const setDefaultPrice = useCartStore((state) => state.setDefaultPrice);
  const cartItem = useCartStore((state) => state.cartItem);
  const setCartItem = useCartStore((state) => state.setCartItem);

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="favorite">
      <div className="favorite__header">
        <div className="favorite__header__title">
          <span className="favorite__header__title__text">찜목록</span>
          <div className="favorite__header__cancle">
            <span
              className="favorite__header__cancle_text"
              onClick={handleClose}
            ></span>
          </div>
        </div>
      </div>
      {favoriteItem.length > 0 ? (
        favoriteItem.map((value, idx) => {
          return (
            <div className="favorite__items" key={idx}>
              <div className="favorite__item">
                <div className="favorite__item__detail">
                  <img
                    className="favorite__item__detail__image"
                    src={value.image}
                    alt=""
                  />
                  <div className="favorite__item__detail__content">
                    <div className="favorite__item__detail__content__description">
                      <span className="favorite__item__detail__content__description_title">
                        {value.label}
                      </span>
                      <div className="favorite__item__detail__content__description__price__container">
                        <span className="favorite__item__detail__content__description__price">
                          {value.price.toLocaleString()}
                        </span>
                        <div className="favorite__item__detail__content__description__unit__container">
                          <span className="favorite__item__detail__content__description__unit">
                            원
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="favorite__item__cart__add">
                      <div className="favorite__item__cart__add__btn__container">
                        <button
                          className="favorite__item__cart__add__btn"
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
                        >
                          <label className="favorite__item__cart__add__btn__label">
                            장바구니 추가
                          </label>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="favorite__item__favorite__btn__container">
                  <FavoriteIcon
                    isBoard={false}
                    style={{
                      fontSize: "23px",
                      color: "rgba(224, 49, 49, 1)",
                      cursor: "pointer",
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
              </div>
            </div>
          );
        })
      ) : (
        <div style={{ position: "relative", left: "21%" }}>
          찜목록이 비어있어요!
        </div>
      )}
      <CartModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Favorite;
