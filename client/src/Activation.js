import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import { Link } from 'react-router-dom'
import axios from 'axios'


class Activation extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: '',
        }
     }


    activateUser = (id) => {
        const newUser = {confirmed: true}
        axios.put(`/user/activate/${id}`, newUser).then(res => {  
               console.log(res.data)
        })
    }
  
    activate = () => {
        let arr = this.state.id.split('')
        arr.splice(0,12)
        let final = arr.join('')
        this.activateUser(final)
    }

    componentDidMount(){
        this.setState({
           id: this.props.history.location.pathname,
        }, this.activate)
    }

    render(){
        return(
            <div className = "contact">
                <h2 className = "activH1">Mulțumin! Contul este activat.</h2>
                <Link style = {{fontSize: '15pt', fontWeight: '900'}} to = "/pharma">Login</Link>
            </div>
        )
    }
}


export default withPharma(Activation)