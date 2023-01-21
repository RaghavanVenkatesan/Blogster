import React, { useState } from 'react';
import BlogForm from './BlogForm';
import BlogFormReview from './BlogFormReview';

const BlogNew = () => {
    const [showFormReview, setshowFormReview] = useState(false);

  if( showFormReview ) {
    return (
        <BlogFormReview 
        onCancel = {() => setshowFormReview(false)}
        />
    )
  }

    return (
        <BlogForm
        onBlogSubmit = {() => setshowFormReview(true)}
        />
    )
}

export default BlogNew;