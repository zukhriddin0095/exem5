import { Fragment, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import request from "../server/data";
import { toast } from "react-toastify";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "./myblog.scss";
const MyBlogs = () => {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState([]);
  const [values, setValues] = useState({});
  const [data, setData] = useState([]);
  const [urlphoto, setUrlphoto] = useState(null);
  const [selected, setSelected] = useState(null)
  const [modalM, setModalM] = useState({})

  useEffect(() => {
    getCategory();
    myPosts();
  }, []);

  async function myPosts() {
    try {
      const res = await request.get("/post/user");
      setData(res.data.data);
    } catch (err) {
      toast.error("serverda hatolik");
    }
  }

  async function getCategory() {
    try {
      const res = await request.get("/category");
      setCategory(res.data.data);
    } catch (err) {
      toast.error("serverda hatolik");
    }
  }
  console.log(values);

  function handleInput(e) {
    setValues({ ...values, [e.target.id]: e.target.value });
  }

  async function upLoad(e) {
    try {
      let form = new FormData();
      form.append("file", e.target.files[0]);
      let { data } = await request.post("/upload", form);
      setUrlphoto(data);
      console.log(urlphoto);
      setValues({ ...values, photo: urlphoto });
      console.log(values);
    } catch (err) {
      toast.error("Serverda xatolik yuz berdi");
    }
  }
  async function handleOk() {
    try { 
      await request.post("/post", values);
      myPosts();
    } catch (err) {
      toast.error("serverda hatolik");
    } finally {
      toast.success("Asdad");
    }
  }

async function deleteD(id) {
  confirm("delete")
  try{
    await request.delete(`/post/${id}`)
    myPosts();
  }catch (err) {
    toast.error("serverda hatolik")
  }
}

async function editData(id) {
  setSelected(id)
  setShow(true)
  let { data } = await request.get(`/post/${id}`);
  setValues(data)
}


  return (
    <Fragment>
      <section className="myblog">
        <div className="container">
          <div className="myblog__mypost">
            <h1>My Posts</h1>
            <button onClick={() => setShow(true)}>Add Post</button>
          </div>
          <div className="myblog__search">
            <input type="text" placeholder="search" />
          </div>
        </div>

        <Modal show={show} onHide={handleOk}>
          <Modal.Header closeButton>
            <Modal.Title>Add Posts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="title">
                <label htmlFor="title">Category Name</label>
                <input
                  onChange={(e) => handleInput(e)}
                  id="title"
                  type="text"
                  placeholder="title"
                />
              </div>
              <select id="category" onChange={(e) => handleInput(e)}>
                {category.map((el) => {
                  return (
                    <option id={el.name} key={el._id} value={el.name}>
                      {el.name}
                    </option>
                  );
                })}
              </select>
              <div className="description">
                <label htmlFor="description">description</label>
                <input
                  onChange={(e) => handleInput(e)}
                  id="description"
                  type="text"
                  placeholder="description"
                />
              </div>
              <div className="file">
                <label htmlFor="photo">Add Photo</label>
                <input onChange={upLoad} type="file" />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button className="close_btn" onClick={() => setShow(false)}>
              Close
            </button>
            <button onClick={handleOk} type="submit" className="save_btn">
              Add Posts
            </button>
          </Modal.Footer>
        </Modal>
        <div className="container">
          <div className="cards">
            {data.map((el) => (
              <div key={el._id} className="cards__card">
                <LazyLoadImage
                  src={`https://blog-backend-production-a0a8.up.railway.app/upload/${el?.photo?._id}.jpg`}
                  alt="zxczxczxc"
                />
                <div className="title">
                  <h3>{el.title}</h3>
                  <p>{el.description}</p>
                </div>
                <div className="btns">
                  <div className="delete">
                    <button onClick={() => deleteD(el._id)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </div>
                  <div className="edit">
                    <button onClick={() => editData(el._id)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default MyBlogs;
