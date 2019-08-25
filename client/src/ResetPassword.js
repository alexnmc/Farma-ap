import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import { Link } from 'react-router-dom'
import axios from 'axios'

class Activation extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:'',
            toggle: true,
            toggle2: this.props.alert2
        }
     }


    componentDidMount(){
        let arr = this.props.history.location.pathname.split('')
        arr.splice(0,15)
        let final = arr.join('')
        axios.get(`/link/${final}`).then(res =>{
            console.log(res.data)
            if(!res.data.length){
                this.setState({
                    toggle: false
                })
            }
        }).catch(err => console.log(err))
    }
    
    

    resetAndDelete = () => {
        let arr = this.props.history.location.pathname.split('')
        arr.splice(0,15)
        let final = arr.join('')
        axios.get(`/link/${final}`).then(res =>{
            console.log("ID for reset", res)
            this.props.resetPassword(res.data[0].userID)
            axios.delete(`/link/${res.data.linkID}`).then(res => {
                console.log(res.data)
                this.setState({toggle2: this.props.alert2})
            })
        }).catch(err => console.log(err))
    }

   
    render(){
        return(
            this.state.toggle2 === "Parola a fost schimbatã!" ?
                
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
                        <button className = 'loginButton' onClick={() => this.resetAndDelete()}>Trimite</button>
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