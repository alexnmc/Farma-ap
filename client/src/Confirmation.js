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
        }, this.props.deleteMessage(this.state.id))
    }

   
    componentDidMount(){
        this.setState({
           id: this.props.history.location.pathname
        }, this.sliceIt)
    }

render(){
     return(
        <div className = "contact">
            <h1 className = 'cauta'>Dacã cererea dumneavoastrã a fost rezolvatã vã rugãm sã confirmați aici:</h1>
            <button style = {{marginBottom: '350pt'}} onClick = {() => this.sliceIt()}>Confirmare</button>
        </div>
     )
 }

}


export default withPharma(Confirmation)