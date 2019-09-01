import React from 'react'
import ReactLoading from "react-loading"


const ResetLoading = ({type, color}) => {
    
  return(
    <div className = "resetLoading" style = {{marginTop: "10pt"}}>
      <ReactLoading  type={'spin'} color={'rgba(65, 139, 42, 0.966)'} height={'20pt'} width={'20pt'}/>
    </div>
  )
}

export default ResetLoading