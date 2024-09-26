import Link from 'next/link'
import React from 'react'
import "@/app/(Aboutus)/Companyprofile/companyprofile.css"


const ComapnyProfileSidebar = ({title}) => {
    return (
        <>
            <div className="company-profile-sidebar">
                <h3 className="sidebar-title">{title}</h3>
                <ul className="sidebar-list">
                    <li className="sidebar-item border p-1"><Link href="/company-profile">Company Profile</Link></li>
                    <li className="sidebar-item border p-1"><Link href="/infrastructure">Infrastructure</Link></li>
                    <li className="sidebar-item border p-1"><Link href="/promoters">Promoters/Directors</Link></li>
                    <li className="sidebar-item border p-1"><Link href="/management-and-board-committees">Management and Board Committees</Link></li>
                    <li className="sidebar-item border p-1"><Link href="/awards">Awards/Exports</Link></li>
                    {/* <li className="sidebar-item border p-1"><Link href="/About">Introduction</Link></li> */}
                    <li className="sidebar-item border p-1"><Link href="/terms-and-conditions">Terms & Conditions</Link></li>
                </ul>
            </div>
        </>
    )
}

export default ComapnyProfileSidebar