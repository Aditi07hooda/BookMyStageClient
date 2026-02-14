import Link from 'next/link';
import React from 'react';

const BlogSidebarCategory = () => {
    return (
        <div className="sidebar__widget mb-30">
            <div className="sidebar__widget-head mb-35">
                <h4 className="sidebar__widget-title">Category</h4>
            </div>
            <div className="sidebar__widget-content">
                <div className="sidebar__category">
                    <ul>
                        <li><Link href="/blog">Tiny Stars (Playschool - UKG)</Link></li>
                        <li><Link href="/blog">Super Kids (Grades 1-4)</Link></li>
                        <li><Link href="/blog">Cool Champs (Grades 5-8)</Link></li>
                        <li><Link href="/blog">Teen Titans (Grades 9-12)</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BlogSidebarCategory;