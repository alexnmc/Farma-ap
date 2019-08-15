import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'


class Confirmation extends Component{
       constructor(props){
           super(props)
           this.state = {
               id: ''
           }
        }


    sliceIt = () => {
        
        let arr = this.state.id.split('')
        arr.splice(0,14)
        let final = arr.join('')
        
        this.setState({
            id: final
        })
    }

    componentDidMount(){
        this.setState({
            id: this.props.history.location.pathname
        }, this.sliceIt)
    }

render(){
     return(
        <div className = "contact">
            <button  onClick = {() => this.props.deleteMessage(this.state.id)} style = {{margin: 'auto'}}>Mesaj reazolvat?</button>
        </div>
     )
 }

}


export default withPharma(Confirmation)