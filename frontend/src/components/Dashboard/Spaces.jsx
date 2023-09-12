import React from 'react'
import folder from "./img/folder.png"
import closedfolder from "./img/closedfolder.png";
import openfolder from "./img/openfolder.png";
import trash from "./img/trash.png"
import archive from "./img/archive.png"
import star from "./img/star.png"
import "./Spaces.css"

function Spaces() {
  return (
    <div className="spaces">
      <section className="h-screen grid grid-cols-[300px_350px_1fr] bg-[#181818]">
        <div className='folder'>
        <div className='folder-top'>
            <p>Folders</p>
            <img src={folder} alt=''/>
        </div>
        <div className='folder-down'>
            <div className='personal'>
            <img src={openfolder} alt='' className='open'/>
            <img src={closedfolder} alt='' className='close'/>
            <p>Personal</p>
            </div>
            <div className='work'>
            <img src={openfolder} alt='' className='open'/>
            <img src={closedfolder} alt='' className='close'/>
            <p>Work</p>
            </div>
            <div className='travel'>
            <img src={openfolder} alt='' className='open'/>
            <img src={closedfolder} alt='' className='close'/>
            <p>Travel</p>
            </div>
            <div className='events'>
            <img src={openfolder} alt='' className='open'/>
            <img src={closedfolder} alt='' className='close'/>
            <p>Events</p>
            </div>
            <div className='finances'>
            <img src={openfolder} alt='' className='open'/>
            <img src={closedfolder} alt='' className='close'/>
            <p>Finances</p>
            </div>
        </div>
      </div>
      <div className='more'>
        <p>More</p>
        <div className='favorite'>
            <img src={star} alt=''/>
            <p>Favorites</p>
        </div>
        <div className='trash'>
            <img src={trash} alt=''/>
            <p>Trash</p>
        </div>
        <div className='archive'>
            <img src={archive} alt=''/>
            <p>Archived Notes</p>
        </div>
      </div>
    </section>
    </div>
  )
}

export default Spaces
