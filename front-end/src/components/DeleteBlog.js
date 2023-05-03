import {useState} from "react";
import axios from "axios";
import non_id_url from "../constants/Url";

const DeleteBlog = ({blogs, setBlogs}) => {
    const [id, setId] = useState('')

    function handleOnChange(event) {
        setId(event.target.value);
    }

    const handleOnClick = (id) => {
        if (!id) {
            alert("Please fill the id field!")
            return;
        }
        axios.delete(`${non_id_url}${id}`)
            .then(response => {
                alert(response.data.message)
                setBlogs(blogs.filter(blog => blog._id !== id))
                }
            );
    };

    return (
        <div>
            <div>
                <div>Delete blog by id</div>
                <input type={"text"} value={id} onChange={(event) => handleOnChange(event)}></input>
                <button style={{margin: '10px'}} type={"submit"} onClick={() => {handleOnClick(id)}}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteBlog