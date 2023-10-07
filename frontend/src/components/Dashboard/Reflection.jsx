import React, { useContext } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import folder from './img/folder.png'
import date from './img/date.png'
import file from './img/file.png'
import './Reflection.css'
import { TextContext } from '../../util/TextContext'






// value={value} onChange={setValue}
function Reflection() {
  const { text } = useContext(TextContext)
  console.log(text)
  return (
    <div className='note'>
      {!text ?
      <>
        <div className='empty'>
          <img src={file} alt=''/>
          <h1>Select a note to view</h1>
          <p>Choose a note from the list on the left to view its contents, or create a new note to add to your collection.</p>
        </div>
       </> :
        <>
        <div className='reflection'>
          <p>title</p>
          <div>
             <div className='reflection-date'>
              <img src={date} alt=''/>
              <span>Date</span>
              <p>21/06/2022</p>
             </div>
             <div className='reflection-folder'>
              <img src={folder} alt=''/>
              <span>Folder</span>
              <p>Personal</p>
             </div>
          </div>
          <ReactQuill theme='snow' placeholder={"Write your Note here"} className='texteditor'/> 
          </div>
          <div className='button'>
            <button type='submit'>Submit</button>
            <button type='submit'>Update</button>
            <button type='submit'>Delete</button>
          </div>
          </>
          }
      </div>
    )
}

export default Reflection
