import {useState} from "react";
import axios from "axios";
import non_id_url from "../constants/Url";

const UpdateBlog = ({setBlogs}) => {
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')

    function handleOnChange(event, setValue) {
        setValue(event.target.value);
    }

    function handleOnClick(id) {
        const blog = {title, body, image};
        axios.put(`${non_id_url}${id}`, blog)
            .then(response => {
                if (!response.data.message)
                    setBlogs(response.data);
                else alert(response.data.message);
            })
            .catch(event => {
                alert("Error getting data by Blog: " + event);
                setBlogs([])
            });
    }

    return (
        <div>
            <div>Update existed blog</div>
            <label htmlFor="id">Id: </label>
            <input id="id" type={"text"} value={id} onChange={(event) => handleOnChange(event, setId)}></input>
            <br/>
            <label htmlFor="title">Title: </label>
            <input id="title" type={"text"} value={title} onChange={(event) => handleOnChange(event, setTitle)}></input>
            <br/>
            <label htmlFor="body">Body: </label>
            <input id="body" type={"text"} value={body} onChange={(event) => handleOnChange(event, setBody)}></input>
            <br/>
            <label htmlFor="image">Image: </label>
            <input id="image" type={"text"} value={image} onChange={(event) => handleOnChange(event, setImage)}></input>
            <br/>
            <button style={{margin: '10px'}} type={"submit"} onClick={() => {handleOnClick(id)}}>Update</button>
        </div>
    )
}

export default UpdateBlog