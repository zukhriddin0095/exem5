import { useEffect, useState } from "react";
import { Fragment } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import request from "../../server/data";

import "swiper/css";
import "./populr.scss";
import Loading from "../LOADING/Loading";
const PopularBlogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true)
    const { data } = await request.get("/post/lastones");
    setData(data);
    setLoading(false)
  }


  return (
    <Fragment>
      <div className="container border">
        <div className="popular-title">
          <h1>Popular blogs</h1>
        </div>
        <Swiper
          style={{ marginTop: "64px" }}
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {data.map((el, i) => {
            return (
              <SwiperSlide key={i} {...el}>
                {loading ? (
                  <Loading />
                ) : (
                  <div className="cards__card">
                    <div className="cards__card__img">
                      <LazyLoadImage
                        effect="blur"
                        style={{
                          width: "100%",
                          borderTopLeftRadius: "20px",
                          borderTopRightRadius: "20px",
                        }}
                        src={`https://blog-backend-production-a0a8.up.railway.app/upload/${el.photo?._id}.jpg`}
                        alt="assd"
                      />
                    </div>
                    <div className="cards__card__title">
                      <h5>
                        By{" "}
                        <span>
                          {el.user.first_name} {el.user.last_name}{" "}
                        </span>
                        | {el.updatedAt.split("T")[0]}
                      </h5>
                      <h3>{el.category.description}</h3>
                      <p>{el.description}</p>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </Fragment>
  );
};

export default PopularBlogs;
