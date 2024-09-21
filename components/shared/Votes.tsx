import React from 'react'

interface votesProps {
  type:string,
  currentUser:string,
  questionRef:string
}
const Votes = ({type,currentUser,questionRef}:votesProps) => {
  return (
    <div>Votes</div>
  )
}

export default Votes