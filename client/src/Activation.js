import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import { Link } from 'react-router-dom'
import axios from 'axios'
import CheckAnimation from './UncontrolledLottie.jsx'



class Activation extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: '',
            message: ''
        }
     }


    activateUser = (id) => {
        axios.get(`/user/by/${id}`).then(res=> {
            console.log(res)
            if(res.data.confirmed === false){
                const newUser = {confirmed: true}
                axios.put(`/user/activate/${id}`, newUser).then(res => { 
                    this.setState({
                        message: "Mulțumim! Contul este activat."
                    }) 
                })
            
            if(res.data.confirmed === true){
                this.setState({message: "Cont activ!"})
            }
            
            if(!res.data){
                this.setState({message: "Cont inexistent!"})
            }
        }
        }).catch(err => this.setState({message: "Erroare! Încercați din nou."}))
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
                <h2 className = "activH1">{this.state.message}</h2>
                {this.state.message === "Mulțumim! Contul este activat." ? <CheckAnimation/> :  <div className = 'img1'></div>}
                <Link style = {{fontSize: '15pt', fontWeight: '900', marginTop: '15pt'}} to = "/pharma">Login</Link>
            </div>
        )
    }
}


export default withPharma(Activation)