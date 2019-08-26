import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ResetLoading from './ResetLoading'
import CheckAnimation from './UncontrolledLottie.jsx'


class Activation extends Component{
    constructor(props){
        super(props)
        this.state = {
            id:'',
            toggle: true,
            loading: 'off'
        }
     }


    componentDidMount(){
        let arr = this.props.history.location.pathname.split('')
        arr.splice(0,15)
        let final = arr.join('')
        axios.get(`/link/${final}`).then(res =>{
            if(!res.data.length){
                this.setState({
                    toggle: false
                })
            }
        }).catch(err => console.log(err))
    }
    
    

    resetAndDelete = () => {
        this.setState({loading: 'on'})
        let arr = this.props.history.location.pathname.split('')
        arr.splice(0,15)
        let final = arr.join('')
        axios.get(`/link/${final}`).then(res =>{
           this.props.resetPassword(res.data[0].userID)
            axios.delete(`/link/${res.data[0].linkID}`).then(res => {
               this.setState({loading: 'off', toggle2: this.props.alert2})
            })
        }).catch(err => console.log(err))
    }

   
    render(){
        return(
            this.props.alert2 === "Parola a fost schimbatã!" ?
                
                <div className = "contact">
                    <div className = "loginForm2">
                        <h2 className = "activH1">Mulțumim! Parola a fost schimbatã.</h2>
                        <CheckAnimation/>
                        <Link style = {{fontSize: '15pt', fontWeight: '900', marginTop: '15pt'}} to = "/pharma">Login</Link>
                    </div>
                </div>
                
                :
                
                <div className = "contact">
                {this.state.toggle ?
                    <div className = "loginForm2">
                        <h4 className = "h4">Vã rugãm sã introduceți parola nouã:</h4>
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
                        {this.state.loading === 'off' ?
                        <p className = "alert" style = {this.props.alert2 ? {color:'blue'} : null}>{this.props.alert || this.props.alert2}</p>
                        :
                        <ResetLoading/>
                        }
                        <button className = 'loginButton' onClick={() => this.resetAndDelete()}>Trimite</button>
                    </div>

                    :

                    <div className = "loginForm2">
                        <h1 className = "activH1">Link de resetare invalid!</h1>
                        <Link style = {{fontSize: '15pt', fontWeight: '900'}} to = "/pharma">Login</Link>
                    </div>
                }
                </div>
        )
    }
}


export default withPharma(Activation)