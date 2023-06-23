import React, { useContext } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const AddArticle = () => {
  const [state] = useContext(UserContext);
  const navigate = useNavigate();
  const addArticle = async (articleData) => {
    try {
      await axios.post("/api/v1/articles/", articleData).then(() => {
        navigate("/articles");
        // window.location.href = "/articles";
        // window.location.reload();
      });
    } catch (err) {
      console.log("Error adding article");
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      imageUrl: "",
      content: "",
      access: "Free",
    },
    onSubmit: (values) => {
      //   const { title, imageUrl, content, access } = values;
      addArticle(values);
    },
  });
  return state?.data && state?.data?.email === "jain00prince@gmail.com" ? (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group" style={{ width: "50rem" }}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter Title"
            required
            value={formik.values.title}
            onChange={formik.handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="url"
            className="form-control"
            id="imageUrl"
            placeholder="Enter Image URL"
            required
            value={formik.values.imageUrl}
            onChange={formik.handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="content">Image URL</label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            placeholder="Enter Content"
            required
            value={formik.values.content}
            onChange={formik.handleChange}
          ></textarea>
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="access">Acces Type</label>
          <select
            className="form-control"
            id="access"
            required
            value={formik.values.access}
            onChange={formik.handleChange}
          >
            <option value="Free">Free</option>
            <option value="Basic">Basic</option>
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <br />
        <button type="submit" className="btn btn-primary">
          Add Article
        </button>
      </form>
    </div>
  ) : (
    <Navigate to={"/articles"} />
  );
};

export default AddArticle;
