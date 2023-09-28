import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../server/data";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./blogPage.scss"
const BlogPage = () => {
  const { blogId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const { data } = await request.get(`post/${blogId}`);
    setData(data);
  }
  console.log(data?.category?.photo, );

  return (
    <Fragment>
      <div style={{ marginTop: "80px" }}>
        <div className="container">
          <div className="blogs">
            <div style={{ textAlign: "center" }} className="blogs__img">
              <LazyLoadImage
                style={{ width: "100%" }}
                effect="blur"
                src={`https://blog-backend-production-a0a8.up.railway.app/upload/${data?.category?.photo}.jpg`}
                alt="sasada"
              />
            </div>
            <div className="wrapper">
              <LazyLoadImage
                effect="blur"
                src={`https://blog-backend-production-a0a8.up.railway.app/upload/${data?.category?.photo}.jpg`}
                alt="sasada"
              />
              <div className="wrapper__title">
                <h5>
                  {data?.user?.first_name} {data?.user?.last_name}
                </h5>
                <h6>Posted on 27th January 2022</h6>
              </div>
            </div>
            <div className="wrapper__desc">
              <h3>{data?.description}</h3>

              <h4>Startup (#business, #screen, #life)</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus. Sociis natoque
                penatibus et magnis dis parturient montes. Ridiculus mus mauris
                vitae ultricies leo. Neque egestas congue quisque egestas diam.
                Risus in hendrerit gravida rutrum quisque non.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Non
                blandit massa enim nec. Scelerisque viverra mauris in aliquam
                sem. At risus viverra adipiscing at in tellus. Sociis natoque
                penatibus et magnis dis parturient montes. Ridiculus mus mauris
                vitae ultricies leo. Neque egestas congue quisque egestas diam.
                Risus in hendrerit gravida rutrum quisque non.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default BlogPage;
