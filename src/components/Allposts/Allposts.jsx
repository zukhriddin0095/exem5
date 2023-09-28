import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";
import request from "../../server/data";

import "./allposts.scss";
import Loading from "../LOADING/Loading";
const Allposts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalPost, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const res = await request.get(`/post?page=${currentPage}&limit=10`);
    setTotalPage(res.data.pagination.total);
    setData(res.data.data);
  }
  async function handleSearch(e) {
    try {
      setLoading(true);
      const res = await request.get(
        `post?page=${currentPage}&limit=10&search=${e.target.value}`
      );
      setData(res.data.data);
    } catch (err) {
      toast.error("serverda hatolik");
    } finally {
      setLoading(false);
    }
  }

  const maxPage = Math.ceil(totalPost / 10);

  const nextPageFunc = () => {
    if (currentPage < maxPage) {
      setLoading(true)
      setCurrentPage(currentPage + 1);
      fetchData();
      setLoading(false);

    }
  };

  const prevPageFunc = () => {
    if (currentPage > 1) {
      setLoading(true);
      setCurrentPage(currentPage - 1);
      fetchData();
      setLoading(false);

    }
  };

  const setPage = (page) => {
    if (page >= 1 && page <= maxPage) {
      setLoading(true);
      setCurrentPage(page);
      fetchData();
      setLoading(false);
    }
  };
  return (
    <Fragment>
      <div className="container">
        <div className="allposts">
          <div className="allposts__search">
            <input
              onChange={handleSearch}
              type="text"
              placeholder="Search . . ."
            />
          </div>
          <h1>All Posts</h1>
          <div className="allposts__cards">
            {loading ? (
              <Loading />
            ) : (
              data.map((el, i) => {
                return (
                  <div key={i} className="allposts__cards__card">
                    <div className="allposts__cards__card__img">
                      <LazyLoadImage
                        src={`https://blog-backend-production-a0a8.up.railway.app/upload/${el.photo._id}.jpg`}
                        alt={el?.title}
                      />
                    </div>
                    ;
                    <div className="allposts__cards__card__title">
                      <h5>{el.category?.name}</h5>
                      <h3>{el.category?.description}</h3>
                      <p>{el.category?.description}</p>
                    </div>
                    ;
                  </div>
                );
              })
            )}
          </div>
          {data.length ? (
            <div className="pagination-buttons">
              <button
                className={
                  currentPage === 1
                    ? "disabled pagination-button"
                    : "pagination-button"
                }
                onClick={prevPageFunc}
              >
                {"< Prev"}
              </button>
              {Array.from({ length: maxPage }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index + 1)}
                  className={
                    currentPage === index + 1
                      ? "pagination-button active-page"
                      : "pagination-button"
                  }
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={
                  currentPage === maxPage
                    ? "disabled pagination-button"
                    : "pagination-button"
                }
                onClick={nextPageFunc}
              >
                {"> Next"}
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

export default Allposts;
