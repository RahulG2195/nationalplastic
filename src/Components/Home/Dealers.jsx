import Image from "next/image";
import CatCards from "../CommonComp/catCards";
import Link from "next/link";
export default function Dealers() {
 const DealerArr = [
    {
      key : 1,
      image : '/assets/images/HomepageImages/Others Cities Icons-01.png',
      title : 'Ahmedabad',
      url : '#'
    },
    {
      key : 2,
      image : '/assets/images/HomepageImages/Others Cities Icons-02.png',
      title : 'Bangalore',
      url : '#'
    },
    {
      key : 3,
      image : '/assets/images/HomepageImages/Others Cities Icons-03.png',
      title : 'Jaipur',
      url : '#'
    },
    {
      key : 4,
      image : '/assets/images/HomepageImages/Others Cities Icons-04.png',
      title : 'Kolkata',
      url : '#'
    },
    {
      key : 5,
      image : '/assets/images/HomepageImages/Others Cities Icons-05.png',
      title : 'Mumbai',
      url : '#'
    },
    {
      key : 6,
      image : '/assets/images/HomepageImages/Others Cities Icons-06.png',
      title : 'Chennai',
      url : '#'
    },
    // {
    //   key : 7,
    //   image : '/assets/images/HomepageImages/Others Cities Icons-07.png',
    //   title : 'Delhi',
    //   url : '#'
    // },
    // {
    //   key : 8,
    //   image : '/assets/images/HomepageImages/Others Cities Icons-09.png',
    //   title : 'Hyderabad',
    //   url : '#'
    // },
  ];
  return (
    <section className="dealer_Sec common_section">
        <div className="container">
            <div className="row">
                <div className="section_header mx-auto text-center">
                    <h2><span>National Plastic  </span> Dealers</h2>
                    <p>States We Deliver In (carousel will be here)</p>
                </div>
                <div className="col-12 view_all_sec">
                  <Link href='#' className="my-3"><h6>View All</h6></Link>
                </div>
                <div className="col-12 products_col">
                  <div className="row">
                  {
                  DealerArr.map((dealer) => (
                      <div key={dealer.key} className="col-lg-2 col-md-3 col-sm-6 col-xs-12">
                          <div className="dealer_cont">
                              <div className="dealer_imgs">
                                <Image 
                                  src={dealer.image}
                                  alt={dealer.image}
                                  // width={100}
                                  // height={100}
                                  // layout="responsive"
                                  // objectFit="cover"
                                  fill
                                  />
                              </div>
                                <p>{dealer.title}</p>
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
