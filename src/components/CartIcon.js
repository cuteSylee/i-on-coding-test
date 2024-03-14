import React from "react";
import { Button } from "antd";
import { ShoppingCartOutlined } from "@mui/icons-material";

//장바구니 아이콘
const CartIcon = ({ isBoard, style, onClick, cartCnt }) => {
  return isBoard ? (
    <Button
      shape="circle"
      icon={<ShoppingCartOutlined />}
      style={style}
      onClick={onClick}
    />
  ) : (
    <div>
      <ShoppingCartOutlined
        style={{ color: "rgba(33, 37, 41, 1)", position: "relative" }}
      />
      <label className="cart__item__count" id="cartCount">
        {cartCnt}
      </label>
    </div>
  );
};

export default CartIcon;
