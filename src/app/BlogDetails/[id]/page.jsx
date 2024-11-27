"use client";

import Details from "@/Components/BlogDetails/Details"
import { useParams } from 'next/navigation';
const BlogDetails = () => {
    const params = useParams();
    const blogId = params.id;

    return (
        <>
            <Details blogId={blogId} />
        </>
    )
}
export default BlogDetails