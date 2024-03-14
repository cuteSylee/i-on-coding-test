import data from "../data/meta.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import styled from "styled-components";

//슬라이더
const Slider = () => {
  return (
    <Container>
      <div className="main__top">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          loop={true}
          navigation={true}
          pagination={{ clickable: true }}
          style={{ height: "400px" }}
        >
          {data.slideList.map((value, index) => {
            return (
              <SwiperSlide key={index} virtualIndex={index}>
                <div className="main__container">
                  <span id="mainTitle">{value.title}</span>
                  <div className="main__description">
                    <p id="mainContent">{value.content}</p>
                  </div>
                  <button className="main__btn">
                    <label className="main__btn__text">더 알아보기</label>
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Container>
  );
};

export default Slider;

const Container = styled.section`
  /* main_top */

  width: 1920px;
  height: 600px;

  /* Inside auto layout */
  flex: none;
  flex-grow: 0;

  order: 1;
  background: linear-gradient(
      0deg,
      rgba(32, 32, 32, 0.25),
      rgba(32, 32, 32, 0.25)
    ),
    url(${data.slideList[0].image});
`;
