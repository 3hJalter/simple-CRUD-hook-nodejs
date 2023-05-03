const BlogData = ({blogs}) => {
    return (
        <div>
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

export default BlogData