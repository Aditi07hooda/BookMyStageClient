import { blogDataType } from "@/interFace/api-interFace";
import Link from "next/link";
import React from "react";
import thumb from "../../../public/assets/img/news/news-02.jpg";
import Image from "next/image";
import BlogComments from "./BlogComments";
import BlogCommentForm from "./BlogCommentForm";
import BlogSidebarSearch from "./BlogSidebarSearch";
import BlogSidebarAbout from "./BlogSidebarAbout";
import BlogSidebarBlogs from "./BlogSidebarBlogs";
import BlogSidebarCategory from "./BlogSidebarCategory";
import BlogSidebarTags from "./BlogSidebarTags";
import useGlobalContext from "@/hooks/use-context";
const BlogDetailsArea = () => {
  const {blog} = useGlobalContext()
  const item:blogDataType = blog[0]
  return (
    <>
      <div className="blog-area pt-115 pb-100">
        <div className="container small-container">
          <div className="row">
            <div className="col-xl-8 col-lg-12">
              <div className="blog-main-wrapper mb-30">
                <div className="row">
                  <div className="blog-wrapper position-relative blog-details-wrapper mb-30">
                    <div className="blog-thumb ">
                      <Image
                        src={item?.img}
                        width={500}
                        height={500}
                        style={{ width: "100%", height: "auto" }}
                        alt="blog-img"
                      />
                    </div>
                    <div className="blog-content-wrapper">
                      <div className="blog-meta">
                        <div className="blog-date">
                          <i className="fa-solid fa-calendar-days"></i>
                          <span>{item?.date}</span>
                        </div>
                        <div className="blog-user">
                          <i className="fa-regular fa-user"></i>
                          <span>{item?.author}</span>
                        </div>
                        <div className="blog-comrent">
                          <i className="fal fa-comments"></i>
                          <span>
                            {item?.comment > 1
                              ? `${item?.comment} comments`
                              : `${item?.comment} comment`}
                          </span>
                        </div>
                      </div>
                      <div className="blog-content">
                        <h2>{item?.title}</h2>
    
                        <blockquote>
                          <p>
                          {item?.title}
                          </p>
                          <p className="mb-0">
                            <cite>{item?.author}</cite>
                          </p>
                        </blockquote>
                        <div dangerouslySetInnerHTML={{ __html: item?.blogDetails }} />
                      </div>
                    </div>
                  </div>
                </div>
                <BlogComments id={item?._id} />
                <BlogCommentForm item={item && item} />
              </div>
            </div>
            <div className="col-xl-4 col-lg-8 col-md-8">
              <div className="sidebar-widget-wrapper mb-30">
                <BlogSidebarSearch />
                <BlogSidebarAbout />
                <BlogSidebarBlogs />
                <BlogSidebarCategory />
                <BlogSidebarTags id={item?._id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsArea;
