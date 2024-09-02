import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import { userContext } from "../../context/userContext";
import Loader from "../components/Loader";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const { userInfo } = useContext(userContext);
  const navigate = useNavigate();

  const createNewPost = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    let data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    console.log(data);

    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/post`, {
      method: "POST",
      credentials: "include",
      body: data,
    });

    const result = await response.json();

    console.log("post info in create page", result);

    setLoading(false); // Stop loading

    if (response.ok) {
      setTitle("");
      setContent("");
      setSummary("");
      setFiles("");
      navigate("/");
    }
  };

  useEffect(() => {
    console.log("userinfo in create page : ", userInfo);
    if (!userInfo || !userInfo.hasOwnProperty("username")) navigate("/");
  }, []);

  if(loading)return <Loader/>

  return (
    <>
      <form className="create-post-form" onSubmit={createNewPost}>
        <input
          type="title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="summary"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input type="File" onChange={(e) => setFiles(e.target.files)} />
        <Editor onChange={setContent} value={content} />

        <button style={{ marginTop: "7px" }} disabled={loading}>
            Create Post
          </button>
        
        
      </form>
    </>
  );
};

export default CreatePost;

