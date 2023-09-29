import React from 'react'
import {file} from "./img"
import {BsFileEarmarkText} from "react-icons/bs"

function EmptyNoteState() {
  return (
    <div className="grid h-full w-full place-items-center">
    <div className='w-[460px] grid gap-3 place-items-center'>
    <BsFileEarmarkText className='w-20 h-20 text-white/50'/>
    <h1 className='text-white font-bold text-xl'>Select a note to view</h1>
    <p className='text-center text-white/60'>
      Choose a note from the list on the left to view its contents, or
      create a new note to add to your collection.
    </p>
    </div>
  </div>
  )
}

export default EmptyNoteState