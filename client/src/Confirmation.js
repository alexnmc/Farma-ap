import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'


class Confirmation extends Component{
       constructor(props){
           super(props)
           this.state = {
               id: '',
               toggle: false
           }
        }


    sliceIt = () => {
        let arr = this.state.id.split('')
        arr.splice(0,14)
        let final = arr.join('')
        this.setState({
            id: final,
        }, this.props.deleteMessage(this.state.id))
        this.setState({
            toggle: true
        })
    }

   
    componentDidMount(){
        this.setState({
           id: this.props.history.location.pathname,
           toggle: false
        })
    }

render(){
     return(
        <div className = "contact">
            {this.state.toggle ?
            
                <div>
                    <h1 className = "cauta">Mulțumin! Puteți sa inchideți fereastra. </h1>
                </div>
                
                :
                
                <div>
                    <h1 className = 'cauta'>Dacã cererea dumneavoastrã a fost rezolvatã vã rugãm sã confirmați aici:</h1>
                    <button style = {{marginBottom: '350pt'}} onClick = {() => this.sliceIt()}>Confirmare</button>
                </div>
            }
        </div>
     )
 }

}


export default withPharma(Confirmation)