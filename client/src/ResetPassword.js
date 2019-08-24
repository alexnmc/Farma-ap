import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import { Link } from 'react-router-dom'

class Activation extends Component{
    constructor(props){
        super(props)
        this.state = {
            
        }
     }


    reset = () => {
        let arr = this.props.history.location.pathname.split('')
        arr.splice(0,15)
        let final = arr.join('')
        this.props.resetPassword(final)
    }

   
    render(){
        return(
            <div className = "contact">
                {this.props.alert2 === "Parola a fost schimbatã!" ?
                <div>
                    <h2 className = "activH1">Mulțumin! Parola a fost schimbatã.</h2>
                    <Link style = {{fontSize: '15pt', fontWeight: '900'}} to = "/pharma">Login</Link>
                </div>
                :
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
                }
            </div>
        )
    }
}


export default withPharma(Activation)