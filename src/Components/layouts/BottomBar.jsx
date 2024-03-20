"use client"
import { useEffect, useState } from 'react'
import './BottomBar.css'
import './BottomBar.module.css'
import Link from 'next/link'

function BottomBar() {
const [name , setName] = useState('')
// const[prdctDetail ,SetprdctDetail] = useState()

useEffect(() => {
  console.log("nameenamee", name)
 
}, [name])

  const handleonClick = (e) => {
    const title = e.target.text
    setName(e.target.innerText);
    // SetprdctDetail(`/ProductDetail/${name}`)
  }


  return (
    <div className="row px-4 py-2 d-flex align-items-center bottom_nav position-relative mainrow">
      <div className="col first">
        <p>Premium Event Chair</p>
        <div className='ulCont mx-4 p-3'>
          <p className='text-start fw-bold dropHeading '>Premium Event Chair</p>
          <div className='d-flex gap-5'>
            <div className='d-flex gap-5 scroll p-3'>
              <div>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>karen</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>ICE, GLASS </Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>GHOST CHAIR </Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Peral, Crown, Marble</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Kia, Karen, Karnival</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Shagun</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Vivha, Shamiyana, Bada Shagun</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Leon , Cambridge</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Harrier</Link></p>
              </div>
            </div>
            <div className='barImgCont'>
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>

        </div>
      </div>


      <div className="col second ">
        <p>Without Arm Tent</p>
        <div className='ulCont SecondDrop mx-4 p-3'>
          <p className='py-3'>Without Arm Tent</p>
          <div className='d-flex gap-5'>
            <div className='d-flex gap-5 scroll p-3'>
              <div>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Alto</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>ReAlto</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Vista</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Apollo / Volvo / Vento</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>UNO from Silvassa</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Seltos</Link></p>
              </div>

            </div>
            <div className='barImgCont'>
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>

        </div>
      </div>

      <div className="col second ">
        <p>Premium Chair</p>
        <div className='ulCont SecondDrop mx-4 p-3'>
          <p className='text-start fw-bold dropHeading '>Premium Chair</p>
          <div className='d-flex gap-5'>
            <div className='d-flex gap-5 scroll p-3'>
              <div>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Victoria</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Orca</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>The Boss</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>STAR /QUEEN</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Rover</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Ferrari .S.</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Magna, Saab</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Relax</Link></p>
              </div>
              <div>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Solace</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Altis</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Atlantis</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Bentley</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>BOSS</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Storm, Phantom</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Thunder, Wonder, Aspire, Thunder</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Leisure</Link></p>
              </div>
              <div>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Spinex</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Hector</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Merc</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Milano, Linea</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Omega</Link></p>
              </div>

            </div>
            <div className='barImgCont'>
              <img src="/Assets\images\Home-page\Blog-section-1.jpg" alt="" />
            </div>
          </div>

        </div>
      </div>

      <div className="col second ">
        <p>Popular Chair</p>
        <div className='ulCont SecondDrop mx-4 p-3'>
          <p className='text-start fw-bold dropHeading '>Popular Chair</p>
          <div className='d-flex gap-5'>
            <div className='d-flex gap-5 scroll p-3'>
              <div>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Delhi, Agra, Shimla, Jaisalmer</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Ajanta</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Florish</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Cretaa</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Galaxy</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Pune </Link></p>
              </div>

              <div>
                <p><Link className="nav-link" href={`/ProductDetail/${name}`}>GETZ/ BEST/ZEST</Link></p>
              </div>

            </div>
            <div className='barImgCont'>
              <img src="/Assets/images/Home-page/Blog-section-1.jpg" alt="" />
            </div>
          </div>

        </div>
      </div>


      <div className="col second ">
        <p>Cabinet</p>
        <div className='ulCont SecondDrop mx-4 p-3'>
          <p className='text-start fw-bold dropHeading '>Cabinet</p>
          <div className='d-flex gap-5'>
            <div className='d-flex gap-5 scroll p-3'>
              <div>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Planet Small</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Planet Big</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Planet Power Small</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Planet Power Medium</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Planet Power Big</Link></p>
              </div>

            </div>
            <div className='barImgCont'>
              <img src="/Assets/images/Home-page/Blog-section-1.jpg" alt="" />
            </div>
          </div>

        </div>
      </div>



      <div className="col second ">
        <p> Baby Chair</p>
        <div className='ulCont SecondDrop mx-4 py-5'>
          <p className='text-start fw-bold dropHeading '>Baby Chair</p>
          <div className='d-flex gap-5'>
            <div className='d-flex scroll p-3'>
              <div>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Flora, Wave, Poo</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Yoyo rocker</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Bubbly</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Sleeper/Dolphin</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Polo</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Babylon</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Beatle With Tray</Link></p>
              </div>

            </div>
            <div className='barImgCont'>
              <img src="/Assets/images/Home-page/Blog-section-1.jpg" alt="" />
            </div>
          </div>

        </div>
      </div>
      <div className="col Stool position-relative ">
        <p> Stool</p>
        <div className='ulCont SecondDrop mx-4 '>
          <p className='text-start fw-bold dropHeading '>Stool</p>
          <div className='d-flex gap-3'>
            <div className='d-flex gap-3 scroll p-3'>
              <div>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Cheeta</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Jaguar</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Puma</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Tiger</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Matisse</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Sigma Steppe Stool</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Hippo</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Panda Stool</Link></p>
              </div>

              <div>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Otter Stool</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Decor Panda Stool</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Decor Otter Stool</Link></p>
              </div>
            </div>
            <div className='barImgCont'>
              <img src="/Assets/images/Home-page/Blog-section-1.jpg" alt="" />
            </div>
          </div>

        </div>
      </div>

      <div className="col Table position-relative">
        <p>Table</p>
        <div className='ulCont SecondDrop mx-4 p-3'>
          <p className='text-start fw-bold dropHeading '>Table</p>
          <div className='d-flex gap-3'>
            <div className='d-flex gap-3 scroll p-3'>
              <div>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Jaipur Dinning</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Party Round</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Patiala Centre Trolley</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Rajkot Centre Trolley</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Spectra</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Regal</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Jaipur RoMa Dinning</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Party Round RoMa</Link></p>
              </div>

              <div>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Java Centre Table</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>JODHPUR (ROUND FOLDING)</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>UDAIPUR (RECTANGULAR)</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Rave Center Table</Link></p>
              </div>

            </div>
            <div className='barImgCont'>
              <img src="/Assets/images/Home-page/Blog-section-1.jpg" alt="" />
            </div>
          </div>

        </div>
      </div>

      <div className="col Box position-relative">
        <p>Box</p>
        <div className='ulCont SecondDrop mx-4 p-3'>
          <p className='text-start fw-bold dropHeading '>Box</p>
          <div className='d-flex gap-3'>
            <div className='d-flex gap1 scroll p-3'>
              <div>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Tote Box 15 Ltrs Without Wheels</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Tote Box 15 Ltrs With Wheels</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Tote Box 35 Ltrs Without Wheels</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Tote Box 35 Ltrs With Wheels</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Tote Box 60 Ltrs Without Wheels</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Tote Box 60 Ltrs With Wheels</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Under the bed-40 ltr</Link></p>
              </div>
            </div>
            <div className='barImgCont'>
              <img src="/Assets/images/Home-page/Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="col Drawer position-relative">
        <p>Drawer</p>
        <div className='ulCont SecondDrop mx-4 p-3'>
          <p className='text-start fw-bold dropHeading '>Drawer</p>
          <div className='d-flex gap-3'>
            <div className='d-flex gap-1 scroll p-3'>
              <div>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Drawer 3 Tier 130</Link></p>
                <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Drawer 3 Tier 190</Link></p>
                <div className="drawerHover">
                  <p className="drawer250">Drawer 3 Tier 250</p>
                  <div className="innerUlCont">
                    <p className='text-start fw-bold dropHeading '>Inner Dropdown</p>
                    <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Option 1</Link></p>
                    <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Option 2</Link></p>
                    <p><Link onClickCapture={handleonClick} className="nav-link" href={`/ProductDetail/${name}`}>Option 3</Link></p>
                  </div>
                </div>
              </div>
            </div>
            <div className='barImgCont'>
              <img src="/Assets/images/Home-page/Blog-section-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="col">
        <p>Drawers & Racks</p>
      </div>
      <div className="col small">
        <p>Household Accesories</p>
      </div>
      <div className="col">
        <p>Planters</p>
      </div> */}
    </div>
  )
}

export default BottomBar
