import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userContext } from "../../context/userContext";
import Editor from "../components/Editor";
import ClipLoader from "react-spinners/ClipLoader"; // Import the loader

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [postInfo, setPostinfo] = useState(null);
  const [authorized,setAuthorized] = useState(true)
  const [authenticated,setAuthenticated] = useState(true)
  const [loading, setLoading] = useState(false); // Loading state
  
  
  const {userInfo,setUserinfo} = useContext(userContext)

  

  const { id } = useParams();

  const navigate = useNavigate();

  const getSinglePost = async () => {
    setLoading(true)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/post/${id}`, {
      method: "GET",
    });

    

    const result = await response.json();
    
    setLoading(false)
    

    if (response.ok) {
      if(!userInfo)setAuthenticated(false)
      else if(result?.author?.username!==userInfo.username)setAuthorized(false)
      console.log("after editing the post the result is : ",result)
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
    setLoading(true)
    let data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    if(files?.[0]){
        data.set('file',files?.[0])
    }

    console.log(data);
    
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/post/${id}`, {
      method: "PATCH",
      credentials: "include",
      body: data,
    });

    const result = await response.json();

    setLoading(false)
    
    

    if (response.ok) {
      setTitle("");
      setContent("");
      setSummary("");
      setFiles("");
      navigate(`/posts/${id}`);
    }
  };

  
  
  
  if(loading)return <>Loading...</>
  
  

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



