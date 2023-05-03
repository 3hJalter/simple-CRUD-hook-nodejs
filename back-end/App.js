require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {Schema, connect, model, Types} = require('mongoose');
const app = express();

// Connect to MongoDB database
connect(process.env.MONGODB_URI || "mongodb+srv://it4409:it4409-soict@lamdb-crud.qd3s7vv.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(error => console.log(error));

// Allow requests from any origin
app.use(cors());

// Serve the frontend files
// app.use(express.static(path.join(__dirname, '../front-end/build')));

const blogSchema = new Schema({
    title: String,
    body: String,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Blog = model('Blog', blogSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CREATE
app.post('/api/blogs/', async (req, res) => {
    const blog = new Blog(req.body);
    await blog.save();
    res.json([blog]);
});

// READ
app.get('/api/blogs', async (req, res) => {
    const id  = req.query.id;
    if (!id) {
        const blogs = await Blog.find({});
        res.json(blogs);
        return;
    }
    if (!Types.ObjectId.isValid(id)) {
        res.json({message: 'Invalid input id'}); // Return an empty array if the id is invalid
        return;
    }
    const blog = await Blog.findById(id);
    if (!blog) {
        res.json({message: 'Blog not found'});
        return;
    }
    res.json([blog]);
});

// UPDATE
app.put('/api/blogs/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || !Types.ObjectId.isValid(id)) {
        res.json({ message: 'Invalid input' });
        return;
    }
    const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
    if (!blog) {
        res.json({message: 'Not found blog'})
        return;
    }
    res.json([blog]);
});

// DELETE
app.delete('/api/blogs/:id', async (req, res) => {
    const { id } = req.params;
    if (!id || !Types.ObjectId.isValid(id)) {
        res.json({ message: 'Invalid input' });
        return;
    }
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
        res.json({ message: 'Not found blog' });
        return;
    }
    res.json({ message: 'Blog deleted successfully' });
});

app.listen(3001, () => {
    console.log('listening on http://localhost');
    console.log('Server is running on port 3000');
});