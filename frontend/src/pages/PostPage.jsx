import { useEffect, useState, useContext } from "react";
import { useParams, Link,useNavigate } from "react-router-dom";
import { userContext } from "../../context/userContext";

const SinglePost = () => {
  const [postInfo, setPostinfo] = useState(null);
  const [postExist,setPostExist] = useState(true)
  const navigate = useNavigate()
  const { id } = useParams();
  
  const { userInfo } = useContext(userContext);

  

  const getSinglePost = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/post/${id}`, {
      method: "GET",
    });

    const result = await response.json();
    console.log("postinfo in post page : ",result);

    if (response.ok) {
      if(result){setPostinfo(result);
        
      }

      if(!result){
        setPostExist(false)
        
        
      }
      
      
      
    }
  };

  const handleDelete = async ()=>{
    
    const response  = await fetch(`${import.meta.env.VITE_API_URL}/api/post/${id}`,{
      method : 'DELETE',
      credentials : 'include'
    })

    const result = await response.json();

    if(response.ok){
      console.log("deleted post , printing in postpage : ",result)
      setPostExist(false)
      setPostinfo(null)
      
      navigate("/")
      
    }
  }

  


  useEffect(() => {
    
    getSinglePost();

    

    
    
    
    
    
  }, []);


  


  useEffect(()=>{
    if(!postExist)navigate("/")
    
  },[postExist])

  

  

  


  


 


  

  
  
  
  return (
    <div className="single-post">
      <h1 className="single-post-title">{postInfo ? postInfo.title : ""}</h1>
      <time>
        {postInfo ? postInfo.updatedAt.split("T")[0] +
          postInfo.updatedAt.split("T")[1].split(".")[0] : ""}
      </time>
      <div className="author">by @{postInfo ? postInfo.author.username : ""}</div>
      {userInfo && postInfo && userInfo.id === postInfo.author._id ? (
        <div className="edit-post">
          <Link className="edit-btn" to={`/edit/${id}`}>
            Edit Post
          </Link>
        </div>
      ) : (null)}

      {userInfo && postInfo && userInfo.id === postInfo.author._id ? (
        <div className="delete-post">
          <Link onClick={()=>handleDelete()} className="delete-btn" >
            Delete Post
          </Link>
        </div>
      ) : (null)}
      <div className="single-post-img">
        <img src={`${postInfo ? postInfo.cover : ""}`}></img>
      </div>

      <div className="single-post-content" dangerouslySetInnerHTML={postInfo ? { __html: postInfo.content } : null} />
    </div>
  );
};

export default SinglePost;
