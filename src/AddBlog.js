import "./Home.css";
import "./AddBlog.css";
import { useState } from "react";
import { RichTextEditor } from "@mantine/rte";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./AppData";
const initialValue = "<p>Your Blog Goes Here...</p>";
const emptyValue = "<p><br></p>";
const authorDetails = {
  name: "Varad",
  imageUrl: "sample.png",
};
const addBlogUrl = API_URL+"/addblog";
const AddBlog = (props) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [bodyValue, onChange] = useState(initialValue);
  const navigate = useNavigate();
  const submitHandler = async () => {
    if (
      title === "" ||
      bodyValue === initialValue ||
      bodyValue === emptyValue
    ) {
      return;
    }
    const newBlog = {
      title: title,
      tags: tags,
      body: bodyValue,
      author: authorDetails,
    };
    console.log(newBlog);
    try {
      await fetch(addBlogUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });
      navigate("/");
    } catch (error) {
      console.log("Could not add a blog" + error);
    }
  };
  const tagsChangeHandler = (tags) => {
    if (tags !== "") {
      const filteredTags = tags.replace(/#/g, "");
      setTags(filteredTags.split(","));
    }
  };
  return (
    <div className="outer-container">
      <div className="inner-container">
        <label>Title</label>
        <input
          required
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Tags</label>
        <input
          onChange={(e) => {
            tagsChangeHandler(e.target.value);
          }}
        />

        <label className="writing-body">Body</label>
        <RichTextEditor
          value={bodyValue}
          onChange={onChange}
          style={{ width: "80%" }}
        />
        <button onClick={submitHandler}>Submit</button>
      </div>
    </div>
  );
};
export default AddBlog;
