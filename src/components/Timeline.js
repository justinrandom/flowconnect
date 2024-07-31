// src/components/Timeline.js
import React, { useState, useEffect } from "react";
import { fetchPosts } from "../services/fetchService";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };
    getPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-6 rounded-lg shadow-lg mb-4">
          <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
          <p>
            <strong>Posted by:</strong> {post.posted_by}
          </p>
          <p>
            <strong>Posted on:</strong>{" "}
            {new Date(post.posted_on).toLocaleDateString()}
          </p>
          <p>
            <strong>Category:</strong> {post.category}
          </p>
          <p className="mt-4">{post.summarized_content}</p>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
