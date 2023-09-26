import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../server/data";
import { LazyLoadImage } from "react-lazy-load-image-component";

const BlogPage = () => {
  const { blogId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await request.get(`category/${blogId}`);
    setData(data);
  }

  return (
    <Fragment>
      <div style={{ marginTop: "80px" }}>
        <div className="container">
          <div className="blogs">
            <div style={{ textAlign: "center" }} className="blogs__img">
              <LazyLoadImage
                style={{ width: "100%" }}
                effect="blur"
                src={`https://blog-backend-production-a0a8.up.railway.app/upload/${data.photo?._id}.jpg`}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogPage;
