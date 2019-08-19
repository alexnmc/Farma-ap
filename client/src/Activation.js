import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import { Link } from 'react-router-dom'


class Activation extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: '',
        }
     }


    activate = () => {
        let arr = this.state.id.split('')
        arr.splice(0,14)
        let final = arr.join('')
        this.props.activateUser(final)
        
    }

   
    componentDidMount(){
        this.setState({
           id: this.props.history.location.pathname,
        })
    }

    render(){
        return(
            <div className = "contact">
                <h1 className = "cauta2">Mulțumin! Puteți sã inchideți fereastra.</h1>
                <Link to = "/pharma">Login</Link>
            </div>
        )
    }
}


export default withPharma(Activation)