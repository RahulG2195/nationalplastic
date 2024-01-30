import PreChairsCard from "@/Components/preChairsCard/preChairsCard";


const RecentlyViewedDetails = () => {

    return (
        <>

            <div className="mt-5">
                <div className="text-center">
                    <div className="fs-1 fw-bold darkBlue">Recently Viewed <span className="text-danger">Products</span> </div>
                </div>
            </div>

            <div className='container'>

                <PreChairsCard ChairImg="/assets/images/New-launches-4/New-launches-4.png" Title="SHAMIYANA" Discription="Lorem ipsum dolor sit amet." Price="00,000" orignalPrice="00,000" Discount="20%" />
                <PreChairsCard ChairImg="/assets/images/New-launches-4/New-launches-4.png" Title="SHAMIYANA" Discription="Lorem ipsum dolor sit amet." Price="00,000" orignalPrice="00,000" Discount="20%" />
                <PreChairsCard ChairImg="/assets/images/New-launches-4/New-launches-4.png" Title="SHAMIYANA" Discription="Lorem ipsum dolor sit amet." Price="00,000" orignalPrice="00,000" Discount="20%" />
            </div>


        </>
    )
}
export default RecentlyViewedDetails;