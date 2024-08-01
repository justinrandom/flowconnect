import React, { useState, useEffect } from "react";
import { fetchPosts } from "../services/fetchService";

const Timeline = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetchPosts();
        if (response.statusCode === 200 && response.body) {
          const parsedPosts = JSON.parse(response.body);
          setPosts(parsedPosts);
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        setError(error.message);
      }
    };
    getPosts();
  }, []);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredPosts = posts.filter((post) => {
    return categoryFilter === "All" || post.category === categoryFilter;
  });

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortOrder === "asc") {
      return new Date(a.posted_on) - new Date(b.posted_on);
    } else {
      return new Date(b.posted_on) - new Date(a.posted_on);
    }
  });

  const uniqueCategories = [
    "All",
    ...new Set(posts.map((post) => post.category)),
  ];

  const formatContent = (content) => {
    const lines = content.split("\\n");
    const formattedContent = [];

    lines.forEach((line, index) => {
      const boldText = line.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      if (boldText.startsWith("- ")) {
        formattedContent.push(
          <li
            key={index}
            dangerouslySetInnerHTML={{ __html: boldText.slice(2) }}
          />
        );
      } else {
        formattedContent.push(
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: boldText }}
            className="font-bold mt-2"
          />
        );
      }
    });

    return formattedContent;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-2 text-white">Filter by Category:</label>
          <select
            value={categoryFilter}
            onChange={handleCategoryChange}
            className="p-2 border rounded text-black bg-white"
          >
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            onClick={handleSortOrderChange}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Sort by Date ({sortOrder === "asc" ? "Ascending" : "Descending"})
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-white">Total Results: {sortedPosts.length}</p>
      </div>

      {sortedPosts.length === 0 ? (
        <div className="text-white">No posts available.</div>
      ) : (
        <div className="space-y-4">
          {sortedPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-6 rounded-lg shadow-lg mb-4"
            >
              <h2 className="text-2xl font-bold mb-2 text-black">
                {post.title}
              </h2>
              <p className="text-black">
                <strong>Posted by:</strong> {post.posted_by}
              </p>
              <p className="text-black">
                <strong>Posted on:</strong>{" "}
                {new Date(post.posted_on).toLocaleDateString()}
              </p>
              <p className="text-black">
                <strong>Category:</strong> {post.category}
              </p>
              <div className="mt-4 text-black">
                <ul>{formatContent(post.summarized_content)}</ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timeline;
