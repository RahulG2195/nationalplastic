import Link from 'next/link';
import '../../styles/header.css';

function TopBar() {
  return (
      <div className="row p-2 top_nav m-0">
          <div className="col d-flex justify-content-end text-white">
            <p className='medium '>Explore Our Brands:- </p>
            <Link href="" target='_blank' className='medium text-white px-2'>Webite 1</Link>
            <Link href="" target='_blank' className='medium text-white'>Webite 2</Link>
          </div>
        </div>
  )
}

export default TopBar
