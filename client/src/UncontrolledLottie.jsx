import React, { Component } from 'react'
import Lottie from 'react-lottie'
import animationData from './check.json'

class UncontrolledLottie extends Component {


  render(){

    const defaultOptions = {
      loop: false,
      autoplay: true, 
      animationData: animationData,
      rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
      }
    }

    return(
      <div>
        <Lottie options={defaultOptions}
                height={document.documentElement.clientWidth < 1000 ? 50 : 90}
                width={document.documentElement.clientWidth < 1000 ? 50 : 90}
        />
      </div>
    )
  }
}

export default UncontrolledLottie
