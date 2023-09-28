import { useEffect, useState } from "react";
import { Fragment } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import request from "../../server/data";

import "swiper/css/mousewheel";
import "swiper/css/effect-cards";
import "swiper/css";
import "./populr.scss";
import Loading from "../LOADING/Loading";
import { toast } from "react-toastify";
const PopularBlogs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await request.get("/post/lastones");
      setData(data);
    } catch (err) {
      toast.error("serverda hatolik");
    } finally {
      setLoading(false);
    }
  }

  function blogs(id) {
    navigate(`/blogs/${id}`);
  }

  return (
    <Fragment>
      <div className="container border">
        <div className="popular-title">
          <h1>Popular blogs</h1>
        </div>
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            350: {
              width: 370,
              slidesPerView: 1,
            },
            576: {
              width: 576,
              slidesPerView: 2,
            },
            950: {
              width: 576,
              slidesPerView: 3,
            },
            1280: {
              width: 1300,
              slidesPerView: 3,
            },
          }}
        >
          {data.map((el, i) => {
            return (
              <SwiperSlide key={i} {...el}>
                {loading ? (
                  <Loading />
                ) : (
                  <div onClick={() => blogs(el._id)} className="cards__card">
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
                          {el.user?.first_name} {el.user?.last_name}{" "}
                        </span>
                        | {el.updatedAt.split("T")[0]}
                      </h5>
                      <h3>{el.category?.description}</h3>
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
