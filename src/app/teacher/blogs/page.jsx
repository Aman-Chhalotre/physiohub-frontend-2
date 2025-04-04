"use client";
import Empty from "../../../components/blogs/empty.jsx";
import Blogs from "../../../components/blogs/blogs.jsx";
import CreateBlog from "../../../components/blogs/createBlog.jsx";
import { useState } from "react";


export default function TeacherDashboard() {
  const [showInBlog, setShowInBlog] = useState("Blogs");
  return (
    <>
      <div className="flex flex-col md:flex-col sm:flex-col lg:flex-row">
        <div className="w-full">
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            {showInBlog == "Empty"&&<Empty setShowInBlog={setShowInBlog}/>}
            {showInBlog == "Blogs" &&<Blogs setShowInBlog={setShowInBlog}/>}
            {showInBlog == "CreateBlog"&&<CreateBlog setShowInBlog={setShowInBlog}/>}  
          </div>
        </div>
      </div>
    </>
  );
}
