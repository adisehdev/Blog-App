import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../context/userContext";
import Editor from "../components/Editor";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [postInfo, setPostinfo] = useState(null);
  const [authorized,setAuthorized] = useState(true)
  const [authenticated,setAuthenticated] = useState(true)
  
  
  const {userInfo,setUserinfo} = useContext(userContext)

  

  const { id } = useParams();

  const navigate = useNavigate();

  const getSinglePost = async () => {
    
    const response = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/post/${id}`, {
      method: "GET",
    });

    

    const result = await response.json();
    

    

    if (response.ok) {
      if(!userInfo)setAuthenticated(false)
      else if(result?.author?.username!==userInfo.username)setAuthorized(false)
      setPostinfo(result);
      setTitle(result.title);
      setContent(result.content);
      setSummary(result.summary);
      setFiles(result.cover);
    }
  };

  useEffect(() => {
    getSinglePost();
    
    

    
    
  }, []);

  useEffect(() => {
    
    
    if(!authenticated){
      navigate("/login")
    }
  
    if(!authorized){
      navigate("/")
    }
    
    
  }, [authorized,authenticated]);

  

  

  const editPost = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if(files?.[0]){
        data.set('file',files?.[0])
    }

    console.log(data);
    
    const response = await fetch(`http://localhost:${import.meta.env.VITE_BACKEND_PORT}/api/post/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: data,
    });

    const result = await response.json();
    
    

    if (response.ok) {
      setTitle("");
      setContent("");
      setSummary("");
      setFiles("");
      navigate(`/posts/${id}`);
    }
  };

  
  
  
  
  
  

  return (
    <>
      <form className="edit-post-form" onSubmit={editPost}>
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
        <button style={{ marginTop: "7px" }}>Edit Post</button>
      </form>
    </>
  );
};

export default EditPost;
