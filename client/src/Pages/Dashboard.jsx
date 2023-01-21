import React from "react";
import { Link } from "react-router-dom";
import BlogList from "../components/BlogList";
import { useDispatch } from "react-redux";
import { resetform } from "../reducers/form/form.action";


import './Dashboard.style.css';

const Dashboard = () => {
    const dispatch = useDispatch();

    return(
        <div className="parent">
        <BlogList />
        <div className="fixed-action-btn">
        <Link to="/blogs/new" className="btn-floating btn-large red" onClick={() => {
           dispatch(resetform()); 
        }}>
        <i class="fa-solid fa-plus"></i>
        </Link>
        </div>
        </div>
    )
}

export default Dashboard;