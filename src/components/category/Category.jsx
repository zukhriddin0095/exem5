import { Fragment, useEffect, useState } from "react";
import request from "../../server/data";



import { LazyLoadImage } from "react-lazy-load-image-component";

const Category1 = () => {
    const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const {
      data: { data },
    } = await request.get("/category");
    setData(data);
  }


  return (
    <Fragment> 
    <section style={{marginTop: "85px"}} className="container">
      <div className="category title">

      </div>
      <div style={{ paddingTop: "50px", marginBottom: "50px"}} className="category__Search">
        <input style={{width: "100%", padding: "24px"}} type="text" placeholder="Search . . ." />
      </div>
       <div className="cards">
      {data.map((el) => {
            return (
                <div key={el._id} className="card">
                  <LazyLoadImage
                    style={{ width: "48px", height: "48px" }}
                    effect="blur"
                    src={`https://blog-backend-production-a0a8.up.railway.app/upload/${el.photo._id}.jpg`}
                    alt=""
                  />
                  <h5>{el.name}</h5>
                  <p>{el.description}</p>
                </div>
            );
          })}
    </div>
    </section>

    </Fragment>
    



   
  )
}

export default Category1