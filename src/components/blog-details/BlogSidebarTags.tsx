import { dynamicIdType } from "@/interFace/api-interFace";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";

interface BlogTagItem {
  primaryTags: string[];
  secondaryTags?: string[];
}

const BlogSidebarTags = ({ id }: dynamicIdType) => {
  const [tags, setTags] = React.useState<string[]>();

  useEffect(() => {
    axios
      .get<{ tags: BlogTagItem[] }>(`${process.env.BASE_URL}blog/all-blog-tags/${id}`)
      .then((res) => {
        console.log("response from api - ", res.data.tags)
        const allTags = res.data.tags.flatMap((item) => [
          ...item.primaryTags,
          ...(item.secondaryTags || []),
        ]);

        // Remove duplicates
        const uniqueTags : string[] = Array.from(new Set(allTags));

        setTags(uniqueTags);
      })
      .catch((e) => {});
  }, [id]);

  return (
    <div className="sidebar__widget mb-30">
      <div className="sidebar__widget-head mb-35">
        <h4 className="sidebar__widget-title">Tags</h4>
      </div>

      <div className="sidebar__widget-content">
        <div className="sidebar__tag">
          {tags?.map((tag, index) => (
            <Link
              key={index}
              href={`/blog?tag=${encodeURIComponent(tag)}`}
              className="me-2 d-inline-block"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebarTags;
