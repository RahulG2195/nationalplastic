import Link from 'next/link'
import React from 'react'

const ComapnyProfileSidebar = ({title}) => {
    return (
        <>
            <div className="company-profile-sidebar">
                <h3 className="sidebar-title">{title}</h3>
                <ul className="sidebar-list">
                    <li className="sidebar-item"><Link href="/">Company Profile</Link></li>
                    <li className="sidebar-item"><Link href="/Infrastructure">Infrastructure</Link></li>
                    <li className="sidebar-item"><Link href="/Directors">Promoters/Directors</Link></li>
                    <li className="sidebar-item"><Link href="/Management">Management and Board Committees</Link></li>
                    <li className="sidebar-item"><Link href="/Awards">Awards/Exports</Link></li>
                    <li className="sidebar-item"><Link href="/About">Introduction</Link></li>
                    <li className="sidebar-item"><Link href="/Term">Terms & Conditions</Link></li>
                </ul>
            </div>
        </>
    )
}

export default ComapnyProfileSidebar