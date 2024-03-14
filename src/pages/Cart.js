import React, { useCallback, useEffect, useMemo, useState } from "react";
import "../css/Cart.css";
import { useCartStore, useFavoriteStore } from "../utils/globalState";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "../components/FavoriteIcon";
import { handleFavorite } from "../utils/common";

const Cart = () => {
  const navigate = useNavigate();
  const cartItem = useCartStore((state) => state.cartItem);
  const setCartItem = useCartStore((state) => state.setCartItem);
  const defaultPrice = useCartStore((state) => state.defaultPrice);
  const [checkedList, setCheckedList] = useState([]);
  const [total, setTotal] = useState(0);
  const [discount, setDisCount] = useState(0);
  const deliveryFee = 3000;
  const [lastTotal, setLastTotal] = useState(0);
  const favoriteItem = useFavoriteStore((state) => state.favoriteItem);
  const setFavoriteItem = useFavoriteStore((state) => state.setFavoriteItem);
  const isFavoriteClicked = useFavoriteStore(
    (state) => state.isFavoriteClicked,
  );
  const setIsFavoriteClicked = useFavoriteStore(
    (state) => state.setIsFavoriteClicked,
  );

  //장바구니
  //수량 감소
  const handleMinusCount = (cartMinusItem) => {
    const minusCountItem = cartItem.map((item) => {
      if (cartMinusItem.id === item.id) {
        const idx = defaultPrice.findIndex((i) => i.id === item.id);
        return {
          ...item,
          count: item.count > 0 && item.count - 1,
          price:
            defaultPrice[idx].id === item.id && item.count > 0
              ? defaultPrice[idx].price * (item.count - 1)
              : 0,
        };
      } else return item;
    });
    const result = minusCountItem.filter((item) => item.count > 0);
    setCartItem(result.filter((item) => item.count > 0));

    if (checkedList.length > 0) {
      const changeList = checkedList.map((item, idx) => {
        if (item.id === cartMinusItem.id) {
          const idx = defaultPrice.findIndex((i) => i.id === item.id);
          return {
            ...item,
            price: cartMinusItem.price - defaultPrice[idx].price,
          };
        } else return item;
      });
      setCheckedList(changeList);
    }
  };
  //수량 증가
  const handlePlusCount = (cartPlusItem) => {
    const addCountItem = cartItem.map((item) => {
      if (cartPlusItem.id === item.id) {
        const idx = defaultPrice.findIndex((i) => i.id === item.id);
        return {
          ...item,
          count: item.count + 1,
          price:
            defaultPrice[idx].id === item.id &&
            defaultPrice[idx].price * (item.count + 1),
        };
      } else return item;
    });
    setCartItem(addCountItem);

    if (checkedList.length > 0) {
      const changeList = checkedList.map((item, idx) => {
        if (item.id === cartPlusItem.id) {
          const idx = defaultPrice.findIndex((i) => i.id === item.id);
          return {
            ...item,
            price: cartPlusItem.price + defaultPrice[idx].price,
          };
        } else return item;
      });
      setCheckedList(changeList);
    }
  };

  const onCheckedItem = useCallback(
    (checked, item) => {
      if (checked) {
        setCheckedList((prev) => [...prev, item]);
      } else if (!checked) {
        setCheckedList(checkedList.filter((el) => el.id !== item.id));
      }
    },
    [checkedList],
  );

  const totalPrice = useMemo(() => {
    const totalPrice = checkedList.reduce((acc, cur) => {
      acc += cur.price;
      return acc;
    }, 0);
    setTotal(totalPrice);
  }, [cartItem, checkedList]);

  useEffect(() => {
    setLastTotal(total + deliveryFee);
  }, [total]);

  //닫기
  const handleClose = () => {
    navigate("/");
  };

  //결제하기
  const handlePay = async () => {
    if (checkedList.length === 0) {
      alert("선택한 상품이 없습니다.");
      return;
    }
    const confirm = await window.confirm("결제하시겠습니까?");

    if (confirm) {
      const leaveList = cartItem.filter((item) => !checkedList.includes(item));
      setCartItem(leaveList);

      alert("결제되었습니다.");
      navigate("/");
    }
  };

  return (
    <div className="cart">
      <div className="cart__header">
        <div className="cart__header__title">
          <span className="cart__header__title__text">장바구니</span>
          <div className="cart__header__cancle">
            <span
              className="cart__header__cancle_text"
              onClick={handleClose}
            ></span>
          </div>
        </div>
        {cartItem.length > 0 ? (
          cartItem.map((value, idx) => {
            return (
              <div className="cart__items" key={idx}>
                <input
                  type="checkbox"
                  id="cart__check"
                  onChange={(e) => onCheckedItem(e.target.checked, value)}
                />
                <div className="cart__item">
                  <div className="cart__item__detail">
                    <img
                      className="cart__item__detail__image"
                      src={value.image}
                      alt=""
                    />
                    <div className="cart__item__detail__content">
                      <div className="cart__item__detail__content__description">
                        <span className="cart__item__detail__content__description__title">
                          {value.label}
                        </span>
                        <div className="cart__item__detail__content__description__price__container">
                          <span className="cart__item__detail__content__description__price">
                            {value.price.toLocaleString()}
                          </span>
                          <div className="cart__item__detail__content__description__unit__container">
                            <span className="cart__item__detail__content__description__unit">
                              원
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="cart__item__count">
                        <button
                          className="cart__item__btn__minus"
                          onClick={() => handleMinusCount(value)}
                        >
                          <MinusOutlined />
                        </button>
                        <input
                          type="number"
                          min={0}
                          readOnly
                          value={value.count}
                          className="cart__item__count__number"
                        />
                        <button
                          className="cart__item__btn__plus"
                          onClick={() => handlePlusCount(value)}
                        >
                          <PlusOutlined />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cart__item__favorite__btn__container">
                  <FavoriteIcon
                    isBoard={false}
                    style={{
                      fontSize: "23px",
                      color:
                        favoriteItem.findIndex(
                          (item) => item.id === value.id,
                        ) !== -1
                          ? "rgba(224, 49, 49, 1)"
                          : "rgba(222, 226, 230, 1)",
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
            );
          })
        ) : (
          <div>장바구니가 비어있어요!</div>
        )}
        {cartItem.length > 0 && (
          <>
            <div className="cart__item__pay">
              <span className="cart__item__pay__title">결제 예정금액</span>
              <div className="cart__item__pay__detail">
                <div className="cart__item__pay__detail__order">
                  <span className="cart__item__pay__detail__order__text">
                    주문금액
                  </span>
                  <div className="cart__item__pay__detail__order__momey_container">
                    <span className="cart__item__pay__detail__order__momey">
                      {total.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="cart__item__pay__detail__order">
                  <span className="cart__item__pay__detail__order__text">
                    할인
                  </span>
                  <div className="cart__item__pay__detail__order__momey_container">
                    <span className="cart__item__pay__detail__order__momey">
                      {discount.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="cart__item__pay__detail__order">
                  <span className="cart__item__pay__detail__order__text">
                    배송비
                  </span>
                  <div className="cart__item__pay__detail__order__momey_container">
                    <span className="cart__item__pay__detail__order__momey">
                      {deliveryFee.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <span className="cart__item__pay__line"></span>
            <div className="cart__item__total__container">
              <span className="cart__item__total__text">총 결제예정금액</span>
              <span className="cart__item__total__money">
                {lastTotal.toLocaleString()}
              </span>
            </div>
            <div className="cart__item__btns">
              <button className="cart__item__btn__close" onClick={handleClose}>
                <label className="cart__item__btn__close__text">닫기</label>
              </button>
              <button className="cart__item__btn__pay" onClick={handlePay}>
                <label className="cart__item__btn__pay__text">결제하기</label>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
