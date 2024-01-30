import TopPics from '@/Components/ProductsCatlogue/TopPics'
import CatlogueBanner from '../../Components/ProductsCatlogue/Banner'
import PremiumChairs from '@/Components/ProductsCatlogue/PremiumChairs'
import PreChairsCards from '@/Components/ProductsCatlogue/PreChairCards'
import BoughtTogether from '@/Components/ProductsCatlogue/BoughtTogether'
import RecentlyViewed from '@/Components/ProductsCatlogue/RecentlyViewed'
import FooterRow from '@/Components/FooterRow/FooterRow'
import BottomCTABanner from '@/Components/ProductsCatlogue/bottomCTABanner'

const ProductCatlogue = () => {
    return (
        <>

            <CatlogueBanner />
            <TopPics />
            < PremiumChairs />
            < PreChairsCards />
            <BoughtTogether />
            < RecentlyViewed />
            <FooterRow />
            <BottomCTABanner />

        </>
    )
}
export default ProductCatlogue