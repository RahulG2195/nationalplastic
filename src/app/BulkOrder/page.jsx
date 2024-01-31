import BulkOrderBannar from "@/Components/BulkOrder/BulkOrderBannar"
import GetQuote from "@/Components/BulkOrder/GetQuote"
import BulkPremiumCards from "@/Components/BulkOrder/BulkPremiumCards"
import BulkOrders from "@/Components/BulkOrder/BulkOrders"

const BulkOrder = () => {
    return (
        <>
            <BulkOrderBannar />
            <GetQuote />
            <BulkPremiumCards/>
            <BulkOrders/>
        </>
    )
}
export default BulkOrder