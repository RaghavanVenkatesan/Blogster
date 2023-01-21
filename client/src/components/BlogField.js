import React from "react";


const BlogField = ({ label, error, empty, ...otherprops }) => {
   return (
      <div className="input_div">
      <label> {label} </label>
      <input {...otherprops} />
      { empty[otherprops.name] === otherprops.name ? error ? (<small className="red-text" > {error} </small>) : "" : "" }
      </div>
   );
};

export default BlogField;