import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';

const SuccessPage = () => {
  const params = useParams()
  const id = params.id
  console.log(id)
  const navigate = useNavigate()
  const clickMe = () => {
    navigate(`/portfolio/${id}`)
  }

  return (
    <>
      <div className='mt-5 d-flex flex-column justify-content-center align-items-center'>
        <h1>click below to go to see your profile</h1>
        <button className='btn btn-primary' onClick={clickMe}>clik me</button>
      </div>
    </>
  )
}

export default SuccessPage;