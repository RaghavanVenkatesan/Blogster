import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import BlogField from "./BlogField";
import formFields from "./formFields";
import { fetchformfielderror, fetchformdata } from "../reducers/form/form.action";

import './BlogForm.style.css';

const defaultFormFields = {
    title: '',
    content: ''
}

const BlogForm = (props) => {
const [FormFields, setFormFields] = useState(defaultFormFields);
let { title, content } = FormFields;
const dispatch = useDispatch();

const formfields = useSelector((state) => state.form);

const { error, error_field, data } = formfields;


useEffect(() => {
    if(data){
        const { title, content } = data;
    
        setFormFields({ ...FormFields, title, content });
    }
}, [dispatch, data, FormFields])


const { onBlogSubmit } = props;

const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...FormFields, [name]: value });
};

// const resetFormFields = () => {
//     setFormFields(defaultFormFields);
// }

const handleSubmit = async (event) => {
    event.preventDefault();

    if(title === '' || content === '') {
    let errors ={}
    
    if(title === ''){
       errors['title'] = 'title';
    }

    if(content === ''){
       errors['content'] = 'content';
    }

    dispatch(fetchformfielderror("You must provide a value", errors));

    return
}

if(title !== '' && content !== ''){
    dispatch(fetchformfielderror("",""));
    dispatch(fetchformdata({ ...FormFields }))
    onBlogSubmit();
    return
}
}

return (
    <div className="form_box">
    <form onSubmit={handleSubmit}>
    {
        formFields.map((field) => {
            const { label, name } = field;
            return <BlogField
            key={name}
            type="text"
            label={label}
            name={name}
            id={name}
            onChange={handleChange}
            defaultValue={FormFields[name]}
            error= {error}
            empty= {error_field}
            />
        })
    }
    <Link to="/blogs" className="red btn-flat white-text">
     Cancel
    </Link>
    <button type="submit" className="teal btn-flat right white-text">
     Next
     <i class="fa-solid fa-check"></i>
    </button>
    </form>
    </div>
)
}


export default BlogForm;
