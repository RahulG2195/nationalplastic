import BlogBanner from "@/Components/BlogPage/BlogBanner"
import CategoryGrid from "@/Components/BlogPage/CategoryGrid"

export const metadata = {
    title: 'Blog | National Plastic Industries Ltd',
    description: 'Explore our journey in plastic manufacturing excellence. National Plastic Industries Ltd has been a leading manufacturer of premium plastic products including Cafeteria Chairs, Rattan Furniture, and Luxury Chairs since 1952.',
    keywords: [
        'National Plastic Industries Ltd',
        'plastic manufacturing',
        'cafeteria chairs',
        'rattan furniture',
        'luxury chairs',
        'plastic products manufacturer',
        'plastic furniture',
        'Mumbai manufacturer',
        'plastic exports',
        'furniture supplier'
    ],
};

const BlogPage = () => {
    return (
        <>
            <BlogBanner />
            <CategoryGrid />
        </>
    )
}
export default BlogPage