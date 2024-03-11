"use client";
import AddBody from "@/Components/Address/AddBody";
import AddHeader from "@/Components/Address/Adress";
// import { useDispatch, useSelector } from "react-redux";
// // import { setTotalPrice} from '@/redux/reducer/counterSlice';
// import { useEffect, useState } from "react";
const AddressPage = () => {
  //   const priceFromState = useSelector((state) => state.cart.total_price || 0);

  //   const [totalPrice, setTotalPrice] = useState(priceFromState);
  //   useEffect(() => {
  //     setTotalPrice(priceFromState);
  //   }, [priceFromState]);
  return (
    <>
      <div className="main_conatiner">
        <AddHeader />
        <AddBody />
      </div>
    </>
  );
};
export default AddressPage;
