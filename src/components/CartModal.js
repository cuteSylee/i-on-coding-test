import React, { useState } from "react";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";

//장바구니 추가 모달창
const CartModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const handleCart = () => {
    navigate("/cart");
  };
  const handleCancel = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        title="장바구니 추가"
        open={isOpen}
        onCancel={handleCancel}
        style={{ zIndex: 0 }}
        footer={() => (
          <>
            <button className="cart__modal__more" onClick={handleCart}>
              <span className="cart__modal__more__text">장바구니 더보기</span>
            </button>
            <button className="cart__modal__shopping" onClick={handleCancel}>
              <span className="cart__modal__shopping__text">쇼핑 더 하기</span>
            </button>
          </>
        )}
      >
        <p className="ant_modal_body_content">
          장바구니에 정상적으로 추가되었습니다.
        </p>
      </Modal>
    </>
  );
};

export default CartModal;
