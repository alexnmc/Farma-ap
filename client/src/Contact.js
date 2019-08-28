import React, {Component} from 'react'
import Logo from './Logo'




class Contact extends Component {
    constructor(props){
        super(props)
        this.state = {
           style: {visibility: 'hidden'},
           style2: {visibility: 'hidden'}
            
        }
}

componentDidMount(){
      setTimeout(this.hide, 550)
      setTimeout(this.hide2, 1050)
}

hide = () => {
    this.setState({
        style: {visibility: 'visible'}
    })
}

hide2 = () => {
    this.setState({
        style2: {visibility: 'visible'}
    })
}


render(){
    return(
        <div className = "contact">
            <Logo/>
            <h1 className = 'h5' style = {this.state.style}>Pentru informații trimiteți email pe adresa:</h1>
            <a className = 'h3' href = {`mailto:farmacieup@gmail.com`} style = {this.state.style2}>farmacieup@gmail.com</a>
        </div>
    )
}
}

export default Contact