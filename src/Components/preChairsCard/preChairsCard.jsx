import './PreChairsCard.css'
import Image from 'next/image'

const PreChairsCard = (props) => {
    return (
        <>
            <div className='preCont p-3 mt-3 position-relative '>

                <div className="preImgCont">
                    <Image
                        src={props.ChairImg}
                        width={100}
                        height={100}
                        layout='responsive'
                        objectFit='cover'
                        alt="Picture of the author"
                    />
                </div>

                <div className="PreFoot mt-2 ">

                    <div className="class d-flex flex-wrap justify-content-between my-2 ">
                        <div className="left fw-bold text-danger">{props.Title}</div>
                        <div className="right"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
                    </div>

                    <div className='text-center fw-medium my-2'>{props.Discription}</div>

                    <div className="rs d-flex flex-wrap  justify-content-between align-items-center ">
                        <div className='d-flex gap-2 align-items-center'>
                            <div><i class="medium fa fa-inr fw-bold " aria-hidden="true"></i></div>
                            <div className='medium fw-bold '>{props.Price}</div>
                            <div className='small text-secondary'>{props.orignalPrice}</div>

                        </div>
                        <div className='d-flex flex-wrap fw-semibold text-danger '>
                            <div>{props.Discount}</div>
                        </div>
                    </div>


                </div>

            </div>



        </>
    )
}
export default PreChairsCard