import React from "react";
import { NavLink } from "react-router-dom";
import data from "./../data/meta.json";
import CartIcon from "./CartIcon";
import FavoriteIcon from "./FavoriteIcon";
import { useCartStore } from "../utils/globalState";

//네비게이션 바
const Nav = () => {
  const cartItem = useCartStore((state) => state.cartItem);
  return (
    <nav>
      <NavLink className="logo" to="/">
        <div className="logo__item">{data.title}</div>
      </NavLink>
      <div className="gnb_menu">
        <NavLink
          className="menu_btn_customer_service"
          to="/cart"
          style={{ textDecoration: "none" }}
        >
          <div className="menu_btn_customer_service_item">
            <CartIcon isBoard={false} cartCnt={cartItem.length} />
          </div>
        </NavLink>
        <NavLink className="menu_btn_customer_service" to="/favorite">
          <div className="menu_btn_customer_service_item">
            <FavoriteIcon
              isBoard={false}
              style={{ fontSize: "23px", color: "rgba(33, 37, 41, 1)" }}
            />
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
