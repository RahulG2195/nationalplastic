import TopPics from '@/Components/ProductsCatlogue/TopPics'
import CatlogueBanner from '../../Components/ProductsCatlogue/Banner'
import PremiumChairs from '@/Components/ProductsCatlogue/PremiumChairs'
import PreChairsCards from '@/Components/ProductsCatlogue/PreChairCards'
import BoughtTogether from '@/Components/ProductsCatlogue/BoughtTogether'
import RecentlyViewed from '@/Components/ProductsCatlogue/RecentlyViewed'

const ProductCatlogue = () => {
    return (
        <>

            <CatlogueBanner />
            <TopPics />
            < PremiumChairs />
            < PreChairsCards />
            <BoughtTogether />
            < RecentlyViewed />

        </>
    )
}
export default ProductCatlogue