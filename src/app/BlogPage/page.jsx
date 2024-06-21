import BlogCategory from "@/Components/BlogPage/BlogCategory"
import BlogBanner from "@/Components/BlogPage/BlogBanner"
import CategoryGrid from "@/Components/BlogPage/CategoryGrid"


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