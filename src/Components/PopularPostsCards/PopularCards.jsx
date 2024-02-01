import './PopularCards.css'
const PopularCards = (props) => {
    return (
        <>
            <div className={props.StikyCard ? props.StikyCard : "mt-5 pt-5"}>
                <p className="fs-2 fw-bold mt-5 text-danger">Popular Posts</p>

                <div className='d-flex align-items-c gap-3 mt-4'>
                    <div className='popularPostCard'></div>
                    <p className="Popularcaption fw-bold medium">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        Lorem ipsum dolor sit amet,
                    </p>
                </div>

                <div className='d-flex align-items-c gap-3 mt-4'>
                    <div className='popularPostCard'></div>
                    <p className="Popularcaption fw-bold medium">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        Lorem ipsum dolor sit amet,
                    </p>
                </div>

                <div className='d-flex align-items-c gap-3 mt-4'>
                    <div className='popularPostCard'></div>
                    <p className="Popularcaption fw-bold medium">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        Lorem ipsum dolor sit amet,
                    </p>
                </div>

                <div className='d-flex align-items-c gap-3 mt-4'>
                    <div className='popularPostCard'></div>
                    <p className="Popularcaption fw-bold medium">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        Lorem ipsum dolor sit amet,
                    </p>
                </div>

            </div>
        </>
    )
}
export default PopularCards