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


    confirm = () => {
        let arr = this.state.id.split('')
        arr.splice(0,14)
        let final = arr.join('')
        this.props.deleteMessage(final)
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
                        <h1 className = "activH1">Mulțumin! Puteți sã inchideți fereastra.</h1>
                    </div>
                    
                    :
                    
                    <div>
                        <h1 className = 'activH1'>Dacã cererea dumneavoastrã a fost rezolvatã vã rugãm sã confirmați aici:</h1>
                        <button style = {{marginBottom: '350pt'}} onClick = {() => this.confirm()}>Confirmare</button>
                    </div>
                }
            </div>
        )
    }
}


export default withPharma(Confirmation)