import { Fragment, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { toast } from "react-toastify";
import request from "../../server/data";

import "./category1.scss";
import { useParams } from "react-router-dom";
import Loading from "../LOADING/Loading";

const Category1 = () => {
  const [data, setData] = useState([]);
  const [data_1, setData_1] = useState([]);
  const [totalPost, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const idCateg = useParams();
  const [loading, setLoading] = useState(false)

  async function getData() {
    try {
      setLoading(true);
      const { data } = await request.get(`/category/${idCateg?.idCateg}`);
      setData_1(data);
      setLoading(false);
    } catch (err) {
      toast.error("serverda hatolik");
    }
  }

  async function fetchData() {
    try {
      setLoading(true);
      const { data } = await request.get(
        `/post?page=${currentPage}&limit=10&category=${idCateg.idCateg}`
      );
      setTotalPage(data.pagination.total);
      setData(data.data);
      setLoading(false);
    }catch (err) {
      toast.error("serverda hatolik")
    }
      
  }

  const maxPage = Math.ceil(totalPost / 10);

  const nextPageFunc = () => {
    if (currentPage < maxPage) {
      setCurrentPage(currentPage + 1);
      fetchData();
    }
  };

  const prevPageFunc = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchData();
    }
  };

  const setPage = (page) => {
    if (page >= 1 && page <= maxPage) {
      setCurrentPage(page);
      fetchData();
    }
  };

  async function handleSearch(e) {
    try {
      setLoading(true)
      const { data } = await request.get(
        `post?page=${currentPage}&limit=10&search=${e.target.value}&category=${idCateg.idCateg}`
      );
      setData(data.data);
      setTotalPage(data.pagination.total);
      getData();
    } catch (err) {
      toast.error("serverda hatolik");
    }finally {
      setLoading(false);

    }
  }

  useEffect(() => {
    getData(currentPage);
    fetchData(currentPage);
  }, [currentPage]);
  return (
    <Fragment>
      <section className="category">
        <div className="category__title">
          <h1>{data_1.name}</h1>
          <p>{data_1.description}</p>
          <h3>BLOG || {data_1.name}</h3>
        </div>
        <div className="container">
          <div
            style={{ paddingTop: "50px", marginBottom: "50px" }}
            className="category__Search"
          >
            <input
              onChange={handleSearch}
              style={{ width: "100%", padding: "24px" }}
              type="text"
              placeholder="Search . . ."
            />
          </div>
          <div className="cards">
            {loading ? (
              <Loading />
            ) : (
              data.map((el) => {
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
      </section>
    </Fragment>
  );
};

export default Category1;
