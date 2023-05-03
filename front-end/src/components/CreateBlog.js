import {useState} from "react";
import axios from "axios";
import non_id_url from "../constants/Url";

const CreateBlog = ({blogs, setBlogs}) => {
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')

    function handleOnChange(event, setValue) {
        setValue(event.target.value);
    }

    function handleOnClick() {
        const blog = {title, body, image};
        axios.post(non_id_url, blog)
            .then(response => {
                if (response.data) {
                    setBlogs(response.data);
                    alert('Add blog successfully');
                }
            })
            .catch(event => {
                alert("Error getting data by Blog: " + event);
                setBlogs([])
            });
    }

    return (
        <div>
            <div>Create new blog</div>
            <label htmlFor="title">Title: </label>
            <input id="title" type={"text"} value={title} onChange={(event) => handleOnChange(event, setTitle)}></input>
            <br/>
            <label htmlFor="body">Body: </label>
            <input id="body" type={"text"} value={body} onChange={(event) => handleOnChange(event, setBody)}></input>
            <br/>
            <label htmlFor="image">Image: </label>
            <input id="image" type={"text"} value={image} onChange={(event) => handleOnChange(event, setImage)}></input>
            <br/>
            <button style={{margin: '10px'}} type={"submit"} onClick={() => {handleOnClick()}}>Create</button>
        </div>
    )
}

export default CreateBlog