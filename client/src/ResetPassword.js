import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Activation extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:'',
            final:'',
            toggle: true
        }
     }


    
    componentDidMount(){
        let arr = this.props.history.location.pathname.split('')
        arr.splice(0,15)
        let final = arr.join('')
        this.setState({final: final},this.getID)
       
    }

    getID = () => {
        axios.get(`/link/${this.state.final}`).then(res =>{
            console.log(res)
            if(!res.data.length){
                this.setState({
                    toggle: false
                })
            }
        }).catch(err => console.log(err))
    }
    
    reset = () => {
        let arr = this.props.history.location.pathname.split('')
        arr.splice(0,15)
        let final = arr.join('')
        this.setState({final: final})
        this.getLinkID(final)
    }

    getLinkID = (id) => {
        axios.get(`/link/${id}`).then(res =>{
            this.props.resetPassword(res.data.userID)
            axios.delete(`/link/${id}`).then(res => {
                console.log(res)
            })
        }).catch(err => console.log(err))
    }

   
    render(){
        return(
            this.props.alert2 === "Parola a fost schimbatã!" ?
                
                <div className = "contact">
                    <div className = "loginForm2">
                        <h2 className = "activH1">Mulțumim! Parola a fost schimbatã.</h2>
                        <Link style = {{fontSize: '15pt', fontWeight: '900'}} to = "/pharma">Login</Link>
                    </div>
                </div>
                
                :
                
                <div className = "contact">
                {this.state.toggle ?
                    <div className = "loginForm2">
                        <h4 className = "h4">Introduceți parola nouã:</h4>
                        <input
                            className = "login33"
                            type="password"
                            name='newPassword'
                            maxLength="8"
                            placeholder='Parola nouã'
                            value={this.props.newPassword}
                            onChange={this.props.handleChange2}
                        />
                        <input
                            className = "login34"
                            type="password"
                            name='newPassword2'
                            maxLength="8"
                            placeholder='Repetã parola'
                            value={this.props.newPassword2}
                            onChange={this.props.handleChange2}
                        />
                        <p className = "alert" style = {this.props.alert2 ? {color:'blue'} : null}>{this.props.alert || this.props.alert2}</p>
                        <button className = 'loginButton' onClick={this.reset}>Trimite</button>
                    </div>

                    :

                    <div className = "loginForm2">
                        <h1 className = "activH1">Link expirat!</h1>
                        <Link style = {{fontSize: '15pt', fontWeight: '900'}} to = "/pharma">Login</Link>
                    </div>
                }
                </div>
        )
    }
}


export default withPharma(Activation)