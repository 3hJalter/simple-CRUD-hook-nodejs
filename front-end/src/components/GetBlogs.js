import {useState} from "react";
import axios from "axios";
import non_id_url from "../constants/Url";

const GetBlogs = ({setBlogs}) => {
    const [value, setValue] = useState('')

    function handleOnChange(event) {
       setValue(event.target.value);
    }

    function handleOnClick() {
        axios.get(non_id_url, {
            params: {
                id: value
            }
        })
            .then(response => {
                if (!response.data.message) setBlogs(response.data);
                else {
                    alert(response.data.message);
                }
            })
            .catch(event => {
                alert("Error getting data by Blog: " + event);
                setBlogs([])
            });
    }

    return (
        <div>
            <div>
                <div>Find blog by id</div>
                <input type={"text"} value={value} onChange={(event) => handleOnChange(event)}></input>
                <button style={{margin: '10px'}} type={"submit"} onClick={() => {handleOnClick()}}>Find</button>
            </div>
        </div>
    )
}

export default GetBlogs