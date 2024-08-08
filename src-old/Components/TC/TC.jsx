import Image from "next/image"
import Link from "next/link";

const TC = () => {
    return (
        <>

            <Image
                src="/Assets/images/Terms-and-Condition-pg-page-banner/Terms-and-Condition-pg-page-banner.png"
                width={100}
                height={80}
                layout='responsive'
                objectFit='cover'
                alt="Picture of the author" />



            <div className="text-center fw-bold my-5">
                <div className=" title2 fs-1 ">Terms & <span className="fw-bold text-danger"> Conditions</span> </div>
            </div>

            <p className='px-md-5 fw-semibold TCTxt'>
                These Terms and Conditions ("T&amp;C") are electronic record in terms of Information
                Technology Act, 2000 and Rules made thereunder (as amended from time to time)
                ("IT Act"). This electronic record is generated by a computer system and does not
                require any physical or digital signatures. These T&amp;C are published in accordance
                with the provisions of the applicable rules of the IT Act, that require publishing the
                rules and regulations, privacy policy and T&amp;C for access or usage
                of <Link href="/"> www.nationalplastic.com/</Link> websites ("Website").
                Please read these T&amp;C carefully as they set out the terms of a legally binding
                agreement between you (the reader) and National Plastics Industries Limited a
                company incorporated under the Companies Act, 1956 section 23, having its
                registered office at Survey 4th Floor, Vilco Center, Subhash Rd, opp. Garware Lane,
                Victory Society, Navpada, Vile Parle East, Vile Parle, Mumbai, Maharashtra 400057. The
                terms "you" and "user" as used herein refer to all individuals and/or entities accessing
                this Website for any reason whatsoever. In case you seek any clarifications regarding
                the terms stated hereunder you may correspond with the Company at the address
                mentioned under the 'Contact Us' section of the Website.
                These T&amp;Cs and any additional terms posted on this Website together constitute the
                entire agreement between National Plastic Industries Ltd and you with respect to your
                use of this Website.
            </p>

        </>
    )

}
export default TC 