import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import Nav from "./components/Nav";
import Cart from "./pages/Cart";
import Favorite from "./pages/Favorite";

const Layout = () => {
  return (
    <div>
      <Nav />
      {/* 자식 요소를 렌더링 해줌 */}
      <Outlet />
    </div>
  );
};
const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorite" element={<Favorite />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
