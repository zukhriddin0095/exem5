import { Fragment, useEffect, useState } from "react";
import request from "../../server/data";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./category.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
const Category = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const {
      data: { data },
    } = await request.get("/category");
    setData(data);
  }

  const navigate1 = (id) => {
    navigate(`/blogs/${id}`);
  };
  console.log(data);
  return (
    <Fragment>
      <div className="container">
        <div className="category">
          <h1>Choose A Catagory</h1>
        </div>

        <Swiper
          // install Swiper modules
          modules={[Navigation]}
          spaceBetween={50}
          slidesPerView={3}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {data.map((el) => {
            return (
              <SwiperSlide key={el._id}>
                <div onClick={() => navigate1(el._id)} className="card">
                  <LazyLoadImage
                    style={{ width: "48px", height: "48px" }}
                    effect="blur"
                    src={`https://blog-backend-production-a0a8.up.railway.app/upload/${el.photo._id}.jpg`}
                    alt=""
                  />
                  <h5>{el.name}</h5>
                  <p>{el.description}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Fragment>
  );
};

export default Category;
