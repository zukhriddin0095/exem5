import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import FrontLayout from "./components/Layout/Front";
import { useContext } from "react";
import {
  AboutPage,
  AccountPage,
  BlogPage,
  BlogsPage,
  CategoryPage,
  HomePage,
  LoginPage,
  MyBlogs,
  RegiterPage,
} from "./pages";
import NotFound from "./pages/NotFound";
import "react-toastify/dist/ReactToastify.css";
import AllPostsPage from "./pages/AllPostsPage";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { IsAuthenticated } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route index element={<HomePage />} />
          <Route path="allposts" element={<AllPostsPage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="blogs/:blogId" element={<BlogPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="register" element={<RegiterPage />} />
          <Route path="login" element={<LoginPage />} />
          {IsAuthenticated ? (
            <Route path="my-blogs" element={<MyBlogs />} />
          ) : null}
          {IsAuthenticated ? (
            <Route path="account" element={<AccountPage />} />
          ) : null}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
