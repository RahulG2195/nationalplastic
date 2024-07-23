import Link from 'next/link';
import '../../styles/header.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function TopBar() {

  const [basicInfo, setBasicInfo] = useState({
    logo: '',
    brand1_link: '',
    brand2_link: '',
   
});

  useEffect(() => {
    const fetchBasicInfo = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/basicInfo`);
            const basicInfoData = response.data.basicInfo;
            console.log("Basic Info: " + basicInfoData);
            setBasicInfo(basicInfoData);
            setInitialBasicInfo(basicInfoData);
        } catch (error) {
            console.error('There was an error fetching the basic info!', error);
        }
    };

    fetchBasicInfo();
}, []);
  return (
      <div className="row p-2 top_nav m-0">
          <div className="col d-flex justify-content-end text-white">
            <p className='medium '>Explore Our Brands:- </p>
            <a href={basicInfo.brand1_link} target='_blank' className='medium text-white px-2'>Webite 1</a>
            <a href={basicInfo.brand2_link} target='_blank' className='medium text-white'>Webite 2</a>
          </div>
        </div>
  )
}

export default TopBar
