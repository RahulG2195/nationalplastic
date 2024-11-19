// // YourPage.js
// // import AboutCTA from './AboutCTA';
// import AboutCTA from "@/Components/About/AboutCTA";
// // import AboutSlider from "@/Components/About/AboutSlider";
// import SliderCard from "@/Components/About/SliderCard";
// import Subbanner from "@/Components/About/Subbanner";
// import VMCard from "@/Components/About/VMCard";

// function About() {
//   const arr = [
//     {
//       key: 1,
//       title: "Vision",
//       desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
//     },
//     {
//       key: 2,
//       title: "Mission",
//       desc: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
//     },
//   ];

//   return (
//     <>
//       <Subbanner />
//       <div className="container">
//         <div className="row section_header">
//           <h2>
//             About<span> us</span>
//           </h2>
//         </div>
//       </div>
//       <SliderCard />
//       <AboutCTA />
//       <div className="container">
//         <div className="row">
//           {arr.map((val) => (
//             <div className="col-md-6" key={val.key}>
//               {" "}
//               <VMCard title={val.title} description={val.desc} />
//             </div>
//           ))}
//           {/* <div className="col-md-6"> <VMCard  title={titleValue} description={descriptionValue}/> </div> */}
//         </div>
//       </div>
//     </>
//   );
// }

// export default About;
