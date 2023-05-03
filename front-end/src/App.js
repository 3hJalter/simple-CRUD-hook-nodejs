import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css'
import axios from 'axios';
import Nav from './components/Nav';
import GetList from "./components/GetList";
import {BrowserRouter as Router,
    Route,
    Switch} from 'react-router-dom'

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
    }, []);

    const handleAddBlog = () => {
        const blog = {title, body, image};
        axios.post('/api/blogs', blog)
            .then(response => setBlogs([...blogs, response.data]));
    };

    const handleDeleteBlog = (id) => {
        axios.delete(`/api/blogs/${id}`)
            .then(() => setBlogs(blogs.filter(blog => blog._id !== id)));
    };

    return (
        <Router>
            <div className={'App'}>
                <Nav/>
                <header className='App-header'>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <Switch>
                        <Route path="/" exact>
                            <GetList
                                blogs={blogs}
                                setBlogs={setBlogs}
                            />
                        </Route>
                        <Route path="/create" exact>

                        </Route>
                        <Route path="/update" exact>

                        </Route>
                        <Route path="/delete" exact>

                        </Route>
                    </Switch>
                </header>
            </div>
        </Router>

    );
}

export default App;