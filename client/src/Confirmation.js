import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'


class Confirmation extends Component{
       constructor(props){
           super(props)
           this.state = {
               id: ''
           }
        }


    consolog = () => {
        console.log(this.state.id)
    }

    componentDidMount(){
        this.setState({
            id: this.props.history.loaction
        }, this.consololog)
    }

render(){
     return(
        <div className = "contact">
            <button  onClick = {() => this.props.deleteMessage()} style = {{margin: 'auto'}}>Mesaj reazolvat?</button>
        </div>
     )
 }

}


export default withPharma(Confirmation)