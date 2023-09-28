import { Fragment, useEffect, useState } from "react";
import request from "../../server/data";

import "./home.scss";
import {  useNavigate } from "react-router-dom";
const Home = () => {
  const [data, setData] = useState([]);
  const [time, setTime] = useState("")
  const [name, setName] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    let { data } = await request.get("/post/lastone");
    setData(data.category);
    


    setName(data.user);
     setTime(data.updatedAt.split("T")[0]);
  }


  let res = new Date(time).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })
 


  return (
    <Fragment>
      <section
        className="home"
        style={{
          backgroundImage:
            "url(https://cdn.serif.com/affinity/img/photo/og-photo-080820220738.png)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <div className="home__wrapper">
            <h4>{data?.name}</h4>
            <h5>Step-by-step guide to choosing great font pairs</h5>
            <h6>
              By{" "}
              <span>
                {name?.first_name} {name?.last_name}
              </span>{" "}
              | {res}
            </h6>
            <h6>{data?.description}</h6>
            <button
              onClick={() => navigate(`blogs/${data._id}`)}
              className="ReadMOre"
            >
              Read More
            </button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};
export default Home;
