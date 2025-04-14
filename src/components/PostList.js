import axios from 'axios';
import React, { useEffect, useState } from 'react';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_MY_IP}/api/posts`);
      setPosts(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert('Please fill out both fields!');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_MY_IP}/api/posts`, { title, content });
      setTitle('');
      setContent('');
      fetchPosts();
    } catch (error) {
      console.error('Error adding post:', error);
      alert('Failed to add post. Is your backend running?');
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Simple Blog</h2>

      <div className="mb-3">
        <input
          className="form-control mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          className="form-control mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          rows={4}
        />
        <button onClick={handleSubmit} className="btn btn-primary">Add Post</button>
      </div>

      {loading ? (
        <p>Loading posts...</p>
      ) : (
        <ul className="list-group">
          {posts.map(p => (
            <li key={p.id} className="list-group-item">
              <strong>{p.title}</strong><br />
              {p.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostList;
