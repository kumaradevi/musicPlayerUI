import React from 'react'

const Modal = ({setOpen}) => {
  return (
    <div className='bg-gray-700 fixed top-0 left-0 w-full h-full z-[99999]'>
     <div className='w-[300px] h-[200px] p-6 rounded-xl bg-white text-gray-900'>
        <h1>Welcome to the Rythmix 👋</h1>
        <p>Stay tuned to enjoy music!!! </p>
        <button onClick={()=>setOpen(false)}>click</button>
     </div>
    </div>
  )
}

export default Modal