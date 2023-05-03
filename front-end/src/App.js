import React, {useState, useEffect} from 'react';
import logo from './image/logo.svg';
import './styles/App.css'
import axios from 'axios';
import non_id_url from "./constants/Url";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Nav from './components/Nav';
import BlogData from './components/BlogData';
import GetBlogs from "./components/GetBlogs";
import CreateBlog from "./components/CreateBlog";
import UpdateBlog from "./components/UpdateBlog";
import DeleteBlog from "./components/DeleteBlog";


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
        axios.get(non_id_url)
            .then(response => setBlogs(response.data));
    }, []);

    return (
        <Router>
            <div className={'App'}>
                <Nav/>
                <header className='App-header'>
                    <img src={logo} className="App-logo" alt="logo"/>
                    <Switch>
                        <Route path="/" exact>
                            <GetBlogs
                                setBlogs={setBlogs}
                            />
                        </Route>
                        <Route path="/create" exact>
                            <CreateBlog
                                blogs={blogs}
                                setBlogs={setBlogs}
                            />
                        </Route>
                        <Route path="/update" exact>
                            <UpdateBlog
                                setBlogs={setBlogs}
                            />
                        </Route>
                        <Route path="/delete" exact>
                            <DeleteBlog
                                blogs={blogs}
                                setBlogs={setBlogs}
                            />
                        </Route>
                    </Switch>
                    <BlogData
                        blogs={blogs}/>
                </header>


            </div>
        </Router>

    );
}

export default App;