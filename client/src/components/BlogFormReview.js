import React from 'react';
import formFields from './formFields';
import { submitBlog } from '../reducers/blogs/blogs.actions';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import './BlogFormReview.style.css';

const BlogFormReview = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const formfields = useSelector((state) => state.form);

    // const blogfield = useSelector((state) => state.blog);

    // const { success } = blogfield;

    const { data } = formfields;
    const { onCancel } = props;

    const handleSubmitReview = (event) => {
        event.preventDefault();

        // dispatch(test());

          dispatch(submitBlog(data, navigate));
    } 

    return (
        <form className="form_box" onSubmit={handleSubmitReview}>
        <h5>Please confirm your entries</h5>
        {
            formFields.map(({name, label}) => {
               return (
                <div key={name} className="reviewdiv">
                <label>{label}</label>
                <div>{data[name]}</div>
                </div>
               ) 
            })
        }
        <div className="btns">
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button type="submit" className="green btn-flat right white-text">
          Save Blog
          <i class="fa-solid fa-envelope"></i>
        </button>
      </div>
        </form>
    )
}

export default BlogFormReview;