import React from 'react'
import ReactLoading from "react-loading"


const Loading = ({type, color}) => {
    
  return(
    <div className = "loading">
      {document.documentElement.clientWidth > 1100 ?
        <ReactLoading  type={'spin'} color={' rgb(0, 97, 207)'} height={'45pt'} width={'45pt'}/>
        :
        <ReactLoading  type={'spin'} color={' rgb(0, 97, 207)'} height={'35pt'} width={'35pt'}/>
      }
    </div>
  )
}




export default Loading