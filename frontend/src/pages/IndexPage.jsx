import { useEffect, useState } from "react";
import Post from "../components/Post";

const IndexPage = () => {
  const [posts, setPosts] = useState([]);

  const getAllPosts = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/post`, {
      method: "GET",
    });

    const result = await response.json();

    if (response.ok) {
      setPosts(result);
    }

    if (!response.ok) {
      console.log("error in fetching posts frontend ", result.error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  return (
    <div className="outermost-container">
      {posts?.map((post) => (
        <Post
          key={post._id}
          title={post.title}
          summary={post.summary}
          updatedAt={post.updatedAt}
          cover={post.cover}
          user={post.author}
          postId = {post._id}
          content = {post.content}
        />
      ))}
    </div>
  );
};

export default IndexPage;
