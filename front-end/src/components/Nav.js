import '../styles/Nav.css'

const Nav = () => {
    return (
        <div>
            <div className="top-nav">
                <a className='active' href="/">Home</a>
                <a href="/create">Create New Blog</a>
                <a href="/update">Update Certain Blog</a>
                <a href="/delete">Delete Certain Blog</a>
            </div>
        </div>
    )
}

export default Nav