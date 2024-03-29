import Link from 'next/link'
import './PreChairsCard.css'

const PreChairsCard = (props) => {
    return (
        <>

            <div className='preCont cards mt-3 p-1 position-relative  my-4 '>
                <Link href="/ProductDetail">
                    <div className='card-header'>
                        <img src={props.ChairImg} className="card-img-top" alt="..." />
                    </div>
                </Link>
                <div className="card-body">
                    <div className="PreFoot mt-2 ">

                        <div className="class d-flex flex-wrap justify-content-between my-2 ">
                        <Link href="/ProductDetail"><div className="left fw-bold text-danger">{props.Title}</div></Link>
                            <div className="right "><i className="fa fa-heart-o" aria-hidden="true"></i></div>
                        </div>

                        <div className='text-center fw-medium my-2 DESCresp'>{props.Discription}</div>

                        <div className="rs d-flex flex-wrap  justify-content-between align-items-center ">
                            <div className='d-flex gap-2 align-items-center'>
                                <div><i className="medium fa fa-inr fw-bold priceResp" aria-hidden="true"></i></div>
                                <div className='medium fw-bold priceResp'>{props.Price}</div>
                                <div className='small text-secondary'>{props.orignalPrice}</div>

                            </div>
                            <div className='d-flex flex-wrap fw-semibold text-danger '>
                                <div>{props.Discount}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}
export default PreChairsCard