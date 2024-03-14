import React, { useEffect, useRef, useState } from "react";
import data from "../data/meta.json";
import "./../css/Notice.css";

//공지사항
const Notice = () => {
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0);

  useEffect(() => {
    let timer = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % data.noticeList.length;
      setIdx(idxRef.current);
    }, 2000);

    return () => clearInterval(timer);
  });

  return (
    <ul className="notice">
      <div
        className="notice__slide"
        style={{
          transform: `translateY(-${77 * idx}px)`,
        }}
      >
        {data.noticeList.map((value, id) => {
          return (
            <li className="notice__content" key={id}>
              <div className="notice__category">
                <span className="notice__category__text">{value.category}</span>
              </div>
              <div className="notice__label">
                <span className="notice__label__text">{value.label}</span>
              </div>
              <div className="notice__date">
                <span className="notice__date__text">{value.date}</span>
              </div>
            </li>
          );
        })}
      </div>
    </ul>
  );
};

export default Notice;
