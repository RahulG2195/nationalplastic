import React from 'react';
import { SyncLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className='text-center spinner'>
      {/* <h1>Loading the page...</h1> */}
      <SyncLoader color='#36D7B7' loading={true} size={15} />
    </div>
  );
};

export default Loading;