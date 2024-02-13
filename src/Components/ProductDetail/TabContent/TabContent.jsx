import React from 'react'
import Image from 'next/image'
import "../../../styles/TabContent.css";

const TabContent = () => {
    return (
        <>
            <div class="tab-content" id="myTabContent">
            <div class="row justify-content-center">
                <div
                    class="col-sm-12 col-md-8 p-5 tab-pane fade show active fw-bold mt-3"
                    id="description"
                    role="tabpanel"
                    aria-labelledby="description-tab"
                >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                </div>

                <div class="col-sm-12 col-md-6 imgCont">
                    <Image
                        src="/Assets/images/Image 5/Image 5.png"
                        width={100}
                        height={100}
                        layout="responsive"
                        objectFit="cover"
                    />
                </div>
            </div>
        </div>
        </>
    )
}

export default TabContent