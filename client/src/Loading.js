import React from 'react'
import ReactLoading from "react-loading"


const Loading = ({type, color}) => {
    
  return(
    <div className = "loading">
      {document.documentElement.clientWidth > 1100 ?
        <ReactLoading  type={'spin'} color={' rgb(0, 97, 207)'} height={'53pt'} width={'53pt'}/>
        :
        <ReactLoading  type={'spin'} color={' rgb(0, 97, 207)'} height={'44pt'} width={'44pt'}/>
      }
    </div>
  )
}




export default Loading