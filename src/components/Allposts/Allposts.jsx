import { Fragment, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { LazyLoadImage } from "react-lazy-load-image-component";
import request from "../../server/data";

import "./allposts.scss";
const Allposts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const {
      data: { data },
    } = await request.get(`/post`);
    setData(data);
  }

  console.log(data);

  function handlePageClick(e) {
    console.log(e);
  }
  return (
    <Fragment>
      <div className="container">
        <div className="allposts">
          <div className="allposts__search">
            <input type="text" placeholder="Search . . ." />
          </div>
          <h1>All Posts</h1>
          <div className="allposts__cards">
            {data.map((el, i) => {
              return (
                <div key={i} className="allposts__cards__card">
                  <div className="allposts__cards__card__img">
                    <LazyLoadImage
                    src={`https://blog-backend-production-a0a8.up.railway.app/upload/${el.photo._id}.jpg`}
                    alt={el.title}
                  />
                  </div>
                  
                  ;
                  <div className="allposts__cards__card__title">
                    <h5>{el.category.name}</h5>
                    <h3>{el.category.description}</h3>
                    <p>{el.category.description}</p>
                  </div>
                  ;
                </div>
              );
            })}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={8}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            marginPagesDisplayed={2}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Allposts;
