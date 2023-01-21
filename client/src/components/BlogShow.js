import { Fragment } from "react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlog } from "../reducers/blogs/blogs.actions";

import "./BlogShow.style.css";

const BlogShow = () => {
const dispatch = useDispatch();
    
let { _id } = useParams();

useEffect(() => {
   dispatch(fetchBlog(_id));
},[dispatch, _id])

const data = useSelector((state) => state.blog);

const { blogs } = data;

const { title, content } = blogs;

return (
    <Fragment>
    {blogs ? ( <div className="blogDetail">
        <h3>{title}</h3>
        <p>{content}</p>
        </div>) : ""}
    </Fragment>
)
}

export default BlogShow;