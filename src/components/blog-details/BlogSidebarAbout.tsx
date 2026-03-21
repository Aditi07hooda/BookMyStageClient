import React from "react";
import thumb from "../../../public/assets/img/logo/footer-logo.png";
import Image from "next/image";
import useGlobalContext from "@/hooks/use-context";
import { blogDataType } from "@/interFace/api-interFace";
const BlogSidebarAbout = () => {
  const { blog } = useGlobalContext();
  const item: blogDataType = blog[0];
  return (
    <div className="sidebar__widget mb-30">
      <div className="sidebar__widget-head mb-35">
        <h4 className="sidebar__widget-title">About Me</h4>
      </div>
      <div className="bd-sidebar__author-box text-center">
        <div className="bd-sidebar__author-img">
          <Image
            width={100}
            height={100}
            style={{ width: "auto", height: "auto" }}
            src={thumb}
            alt="img"
          />
        </div>
        <div className="bd-sidebar__blog-text">
          <h4>{item?.author}</h4>
          <p>
            Book My Stage is a digital center for performing arts where school
            students receive expert evaluation, meaningful feedback, and
            recognition while reducing stage fear, building confidence and
            accessing performance opportunities—regardless of location.
          </p>
        </div>
        <div className="bd-sidebar__social">
          <a href="#">
            <i className="fa-brands fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-behance"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebarAbout;
