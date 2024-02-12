import Link from "next/link";
import CatCards from "../CommonComp/catCards";

export default function TopPick() {
  const productArr = [
    {
      key: 1,
      image: '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title: 'Event Chairs',
      url: '#'
    },
    {
      key: 2,
      image: '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title: 'Premium Chairs',
      url: '#'
    },
    {
      key: 3,
      image: '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title: 'Kids Chairs',
      url: '#'
    },
  ];
  return (
    <section className="top_pick_sec common_section">
      <div className="container" data-aos="fade-up">
        <div className="row">
          <div className="section_header mx-auto text-center" data-aos="zoom-in" >
            <h2><span>Top Picks</span> For You</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.</p>
          </div>
          <div className="col-12 products_col">
            <div className="row">
              {
                productArr.map((product) => (
                  <div key={product.key} className="col-md-4" data-aos="fade-down">
                    <CatCards
                      image={product.image}
                      title={product.title}
                      url={product.url}
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}
