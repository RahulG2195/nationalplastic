import CatCards from "../CommonComp/catCards";

export default function ShopRoom() {
 const productArr = [
    {
      key : 1,
      image : '/Assets/images/HomepageImages/Living-Room.jpg',
      title : 'Seatings',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 2,
      image : '/Assets/images/HomepageImages/Dining.jpg',
      title : 'Tables',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 3,
      image : '/Assets/images/HomepageImages/Bedroom.jpg',
      title : 'Storage',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 4,
      image : '/Assets/images/HomepageImages/Bedroom.jpg',
      title : 'Sets',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 5,
      image : '/Assets/images/HomepageImages/Dining.jpg',
      title : 'Stools',
      url : '#',
      style : 'shop-room'
    },
    {
      key : 6,
      image : '/Assets/images/HomepageImages/Bedroom.jpg',
      title : 'Kids Chair',
      url : '#',
      style : 'shop-room'
    },
  ];
  return (
    <section className="shop_room_sec common_section">
        <div className="container">
            <div className="row">
                <div className="section_header mx-auto text-center"data-aos="zoom-in">
                    <h2>Shop By <span>Rooms</span></h2>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s,</p>
                </div>
                <div className="col-12 products_col">
                  <div className="row">
                  {
                  productArr.map((product) => (
                      <div key={product.key} className="col-md-4 shop_col my-md-4 my-2"data-aos="fade-up">
                        <CatCards
                          image={product.image}
                          title={product.title}
                          url={product.url}
                          style={product.style}
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
