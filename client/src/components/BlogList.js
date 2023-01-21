import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import  { fetchBlogs } from '../reducers/blogs/blogs.actions';
import { useDispatch, useSelector } from 'react-redux';
import './BlogList.style.css';

const BlogList = () => {
    let dispatch = useDispatch();

    useEffect(() => {
    dispatch(fetchBlogs())
    },[dispatch])

    const data = useSelector((state) => state.blog);
    const { blogs } = data;

    console.log( blogs );

    return(
        <div className='blog_parent'>
        { blogs.length ? (
            blogs.map((blog) => (
                    <div className="card darken-1 horizontal" key={blog._id}>
                    <div className="card-stacked">
                    <div className="card-content">
                    <span className="card-title">{blog.title}</span>
                    <p>{blog.content}</p>
                    </div>
                    <div className="card-action">
                    <Link to={`/blogs/${blog._id}`}>Read</Link>
                    </div>
                    </div>
                    </div>
            ))
        ) : (
            <span className='empty-message'>No Blogs Found</span>
        )}
        </div>
    )
}

export default BlogList;
