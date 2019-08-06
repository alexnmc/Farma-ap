import React from 'react'
import ReactLoading from "react-loading"


const Loading = ({type, color}) => {
    
  return(
    <div className = "loading">
      {document.documentElement.clientWidth > 1100 ?
        <ReactLoading  type={'spin'} color={' rgb(0, 97, 207)'} height={'15%'} width={'15%'}/>
        :
        <ReactLoading  type={'spin'} color={' rgb(0, 97, 207)'} height={'25%'} width={'25%'}/>
      }
    </div>
  )
}




export default Loading