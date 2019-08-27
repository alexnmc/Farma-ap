import React from 'react'
import ReactLoading from "react-loading"


const ResetLoading = ({type, color}) => {
    
  return(
    <div style = {{marginBottom:"-8.5pt"}}>
      <ReactLoading  type={'spin'} color={' rgb(0, 97, 207)'} height={'20pt'} width={'20pt'}/>
    </div>
  )
}




export default ResetLoading