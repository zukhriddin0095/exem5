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
import { toast } from "react-toastify";
import Loading from "../LOADING/Loading";
const Category = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try{
      setLoading(true)
      const {
      data: { data },
    } = await request.get("/category");
    setData(data);
    setLoading(false)
    }catch (err) {
      toast.error("serverda hatolik")
    }
  }

  const navigate1 = (id) => {
    navigate(`/category/${id}`);
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
        {loading ? <Loading /> : data.map((el) => {
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
