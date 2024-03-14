import { HeartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

//찜하기 아이콘
const FavoriteIcon = ({ isBoard, style, onClick, isFavoriteClicked }) => {
  return isBoard ? (
    <Button
      shape="circle"
      icon={<HeartOutlined />}
      style={style}
      onClick={onClick}
    />
  ) : (
    <div>
      <HeartOutlined style={style} onClick={onClick} />
    </div>
  );
};

export default FavoriteIcon;
