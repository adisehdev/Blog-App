
import { Link } from "react-router-dom"
import img from "../assets/defaultBlog.png"


const Post = ({title,summary,cover,updatedAt,user,postId,content})=>{
   
    return (
      
        <div className='post'>
        <div className='image'>
        <Link to={`/posts/${postId}`}>
        <img src={cover ? cover : img} alt="post-image"></img>
        </Link>
        
        </div>
        <div className='post-info'>
        <Link to={`/posts/${postId}`}>
        <h2>{title}</h2>
        </Link>
        
        <p className='post-data'>
          <a className='author'>{user.username}</a>
          <time>{updatedAt.split('T')[0] + ' ' + updatedAt.split('T')[1].split('.')[0] }</time>
        </p>
        <p className='summary'>{summary.length > 90 ? (summary.substring(0,90) + '...') : (summary)}</p>
        </div>
      </div>
      
    )
}

export default Post