import CatCards from "../CommonComp/catCards";
export default function Dealers() {
 const productArr = [
    {
      key : 1,
      image : '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title : 'Event Chairs',
      url : '#'
    },
    {
      key : 2,
      image : '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title : 'Premium Chairs',
      url : '#'
    },
    {
      key : 3,
      image : '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title : 'Kids Chairs',
      url : '#'
    },
  ];
  return (
    <section className="happy_Story_sec common_section">
        <div className="container">
            <div className="row">
                <div className="section_header mx-auto text-center">
                    <h2><span>National Plastic  </span> Dealers</h2>
                    <p>States We Deliver In (carousel will be here)</p>
                </div>
                <div className="col-12 products_col">
                  <div className="row">
                  {
                  productArr.map((product) => (
                      <div key={product.key} className="col-md-4">
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
    </section>
  )
}
