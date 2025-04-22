import React from "react";
import {useState} from "react";
import {useLocation} from 'react-router-dom';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";

const write = () => {
  const state = useLocation().state;
  console.log(state);
  const [value, setValue] = useState(state ? state.description : "");
  const [title, setTitle] = useState(state ? state.title : "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state ? state.category : null);

  const upload = async () =>{
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:3000/api/uploads/postImage",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res.data.message);
      return res.data.message;
    } catch (err) {
      console.log("err->", err);
    }
  }

  const handleUploadImage = async (e) => {
    e.preventDefault();
    const imageUrl = await upload();
    console.log("ImageUrl ->" , imageUrl)

      try{
        state ? await axios.put(`http://localhost:3000/api/post/${state.post_id}`,{
          description : value,
          title : title,
          image : file ? imageUrl: "Post-Image",
          category : cat,
        },{ withCredentials: true}) 
        : 
        await axios.post(`http://localhost:3000/api/post/`,{
          description : value,
          title : title,
          image : file ? imageUrl : "Post-Image",
          Date : moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          category : cat,
        },{ withCredentials: true}) 
      }catch(err)
      {
        console.log(err);
      }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div>
          <ReactQuill
            className="editorContainer"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>

      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b> Status </b> : Draft
          </span>
          <span>
            <b> Visibility </b> : Public
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
              console.log("Selected File:", e.target.files[0]); // Debugging
            }}
          ></input>
          <label className="file" htmlFor="file">
            Upload Image
          </label>
          <div className="buttons">
            <button> Save as a Draft</button>
            <button onClick={handleUploadImage}> Publish </button>
          </div>
        </div>
        <div className="item">
          <h1> Category </h1>
          <div className="cat">
            <input
              type="radio"
              id="art"
              name="cat"
              value="art"
              checked = {cat === "art"}
              onChange={(e) => setCat(e.target.value)}
            ></input>
            <lable className="file" htmlFor="art">
              Art
            </lable>
          </div>
          <div className="cat">
            <input
              type="radio"
              id="design"
              name="cat"
              value="design"
              checked = {cat === "design"}
              onChange={(e) => setCat(e.target.value)}
            ></input>
            <lable htmlFor="design">Design</lable>
          </div>
          <div className="cat">
            <input
              type="radio"
              id="food"
              name="cat"
              value="food"
              checked = {cat === "food"}
              onChange={(e) => setCat(e.target.value)}
            ></input>
            <lable htmlFor="food">Food</lable>
          </div>
          <div className="cat">
            <input
              type="radio"
              id="Movie"
              name="cat"
              value="Movie"
              checked = {cat === "Movie"}
              onChange={(e) => setCat(e.target.value)}
            ></input>
            <lable htmlFor="Movie">Movie</lable>
          </div>

          <div className="cat">
            <input
              type="radio"
              id="Science"
              name="cat"
              value="Science"
              checked = {cat === "Science"}
              onChange={(e) => setCat(e.target.value)}
            ></input>
            <lable htmlFor="Science">Science</lable>
          </div>
          <div className="cat">
            <input
              type="radio"
              id="technology"
              name="cat"
              value="Technology"
              checked = {cat === "Technology"}
              onChange={(e) => setCat(e.target.value)}
            ></input>
            <lable htmlFor="Technology">Technology</lable>
          </div>
        </div>
      </div>
    </div>
  );
};

export default write;
