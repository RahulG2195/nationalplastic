import Image from "next/image";
import CatCards from "../CommonComp/catCards";
export default function Highlight() {
 const productArr = [
    {
      key : 1,
      image : '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title : 'Lorem Ipsum is simply dummy text',
      short_desc : 'Lorem Ipsum is simply dummy text',
      url : '#'
    },
    {
      key : 2,
      image : '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title : 'Lorem Ipsum is simply dummy text',
      short_desc : 'Lorem Ipsum is simply dummy text',
      url : '#'
    },
    {
      key : 3,
      image : '/assets/images/HomepageImages/1st-section-kids-chair.jpg',
      title : 'Lorem Ipsum is simply dummy text',
      short_desc : 'Lorem Ipsum is simply dummy text',
      url : '#'
    },
  ];
  return (
    <section className="top_pick_sec common_section">
        <div className="container">
            <div className="row">
                <div className="section_header mx-auto text-center"data-aos="zoom-in">
                    <h2><span>Specific </span> Product Highlight</h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.</p>
                </div>
                <div className="col-12 highlight_col">
                  <div className="row">
                  {
                  productArr.map((product) => (
                      <div key={product.key} className="col-md-4" data-aos="slide-right">
                        <div className="card">
                          <Image
                          src={product.image}
                          alt={product.image}
                          width={100}
                          height={100}
                          layout="responsive"
                          objectFit="cover"
                          />
                          <div className="card-body">
                            <h5 className="card-title">{product.title}</h5>
                            <p className="card-text">{product.short_desc}</p>
                            <a href={product.url} className="btn btn-dark text-white rounded-circle highArrow">
                            <i className="fa fa-arrow-right" aria-hidden="true"></i>
                            </a>
                          </div>
                        </div>
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
