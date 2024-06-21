import BlogCategory from "@/components/BlogPage/BlogCategory"
import BlogBanner from "@/components/BlogPage/BlogBanner"
import CategoryGrid from "@/components/BlogPage/CategoryGrid"


const BlogPage = () => {
    return (
        <>
            <BlogBanner />
            <BlogCategory />
            <CategoryGrid />
        </>
    )
}
export default BlogPage