import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [blogs, setBlogs] = useState([]);
    /**
     * @param {{_id:string}} blog
     */
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState('');
    //
  useEffect(() => {
    axios.get('http://localhost:3000/api/blogs')
        .then(response => setBlogs(response.data));
    console.log(blogs);
  }, [blogs]);

  const handleAddBlog = () => {
    const blog = { title, body, image };
    axios.post('/api/blogs', blog)
        .then(response => setBlogs([...blogs, response.data]));
  };

  const handleDeleteBlog = (id) => {
    axios.delete(`/api/blogs/${id}`)
        .then(() => setBlogs(blogs.filter(blog => blog._id !== id)));
  };

  return (
      <div>
        <h1>Blogs</h1>
        <table>
          <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
            <th>Image</th>
          </tr>
          </thead>
          <tbody>
          {blogs.map(blog => (
              <tr key={blog._id}>
                <td>{blog.title}</td>
                <td>{blog.body}</td>
                <td>{blog.image}</td>
                <td>
                  <button onClick={() => handleDeleteBlog(blog._id)}>Delete</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
        <h2>Add Blog</h2>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Body:</label>
          <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
        </div>
        <div>
          <label>Image:</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
        </div>
        <button onClick={handleAddBlog}>Add</button>
      </div>
  );
}

export default App;