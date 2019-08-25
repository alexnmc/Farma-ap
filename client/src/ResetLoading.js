import React from 'react'
import ReactLoading from "react-loading"


const ResetLoading = ({type, color}) => {
    
  return(
    <div style = {{marginTop:"10pt"}}>
      
        <ReactLoading  type={'spin'} color={' rgb(0, 97, 207)'} height={'23pt'} width={'23pt'}/>
        
    </div>
  )
}




export default ResetLoading