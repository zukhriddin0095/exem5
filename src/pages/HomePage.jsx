import { Fragment } from "react"
import Home from "../components/Home/Home"
import PopularBlogs from "../components/Home/PopularBlogs"
import Category from "../components/Home/Category"



const HomePage = () => {
  return (
    <Fragment>
      <Home />
      <PopularBlogs />
      <Category />
    </Fragment>
  )
}

export default HomePage