import Image from "next/image"
const BulkOrderBannar = () => {
    return (
        <>
            <Image
                src="/Assets/images/Bulk-Orders-pg-banner/Bulk-Orders-pg-banner.png"
                width={100}
                height={70}
                layout='responsive'
                objectFit='cover'
                alt="Picture of the author" />
        </>
    )
}
export default BulkOrderBannar