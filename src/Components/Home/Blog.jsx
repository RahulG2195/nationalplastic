import BlogCard from "../CommonComp/BlogCard";
import '../../styles/blog.css';

export default function Blog() {
 const productArr = [
    {
      key : 1,
      image : '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title : 'Dinning Table Set',
      url : '#',
      cat: 'Furniture',
      date: 'November 4, 2023',
      duration: '5 minutes',
      shortDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      key : 2,
      image : '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title : 'Multipurpose storage',
      url : '#',
      cat: 'Furniture',
      date: 'November 4, 2023',
      duration: '5 minutes',
      shortDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
    {
      key : 3,
      image : '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title : 'Kids Chairs',
      url : '#',
      cat: 'Furniture',
      date: 'November 4, 2023',
      duration: '5 minutes',
      shortDesc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    },
  ];

  return (
    <section className="top_pick_sec common_section">
        <div className="container">
            <div className="row">
                <div className="section_header mx-auto text-center">
                    <h2><span>Blog</span></h2>
                    <p>Lorem Ipsum</p>
                </div>
                <div className="col-12 products_col">
                  <div className="row">
                  {
                  productArr.map((product) => (
                      <div key={product.key} className="col-md-4">
                        <BlogCard
                          image={product.image}
                          title={product.title}
                          url={product.url}
                          cat={product.cat}
                          date={product.date}
                          duration={product.duration}
                          shortDesc={product.shortDesc}
                        />
                      </div>
                    ))
                    }
                  </div>
                </div>
            </div>
        </div>
    </section>
  )
}
