import ProdData from "@/Components/ProductDetail/ProdData";
import Breadcrump from "../Breadcromp/page";

function page() {
  return (
    <>
      <div className="pd-wrap">
        <Breadcrump />
        <ProdData />
      </div>
    </>
  );
}

export default page;
