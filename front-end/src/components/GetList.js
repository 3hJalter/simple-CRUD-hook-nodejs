import {useState} from "react";
import axios from "axios";

const GetList = ({blogs, setBlogs}) => {
    const [value, setValue] = useState('')

    function handleOnChange(event) {
       setValue(event.target.value);
    }

    function handleOnClick() {
        axios.get('http://localhost:3000/api/blogs', {
            params: {
                id: value
            }
        })
            .then(response => {
                setBlogs(response.data.reverse);
                console.log('Response successfully: ', response.data);
            })
            .catch(event => {
                alert("Error getting data by Blog: " + event);
                setBlogs([])
            });
    }

    return (
        <div>
            <div>
                <h1> Blog List</h1>
                <div>Find blog by id</div>
                <input type={"text"} value={value} onChange={(event) => handleOnChange(event)}></input>
                <button style={{margin: '10px'}} type={"submit"} onClick={() => {handleOnClick()}}>Find</button>
            </div>
            <hr />
            <table id={'blogs'}>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Body</th>
                    <th>Image</th>
                    <th>Created At</th>
                </tr>
                </thead>
                <tbody>
                {blogs.map(blog => (
                    <tr key={blog._id}>
                        <td>{blog._id}</td>
                        <td>{blog.title}</td>
                        <td>{blog.body}</td>
                        <td>{blog.image}</td>
                        <td>{blog.createdAt}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default GetList