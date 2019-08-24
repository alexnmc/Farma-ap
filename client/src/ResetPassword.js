import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'

class Activation extends Component{
    constructor(props){
        super(props)
        this.state = {
            id: '',
        }
     }


    activate = () => {
        let arr = this.state.id.split('')
        arr.splice(0,13)
        let final = arr.join('')
        this.props.resetPassword(final)
    }

    componentDidMount(){
        this.setState({
           id: this.props.history.location.pathname,
        }, this.activate)
    }

    render(){
        return(
            <div className = "contact">
                <div className = "loginForm">
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
                        className = "login33"
                        type="password"
                        name='newPassword2'
                        maxLength="8"
                        placeholder='Repetã parola'
                        value={this.props.newPassword2}
                        onChange={this.props.handleChange2}
                    />
                    <p className = "alert" style = {this.props.alert2 ? {color:'blue'} : null}>{this.props.alert ||this. props.alert2}</p>
                    <button className = 'loginButton' onClick={this.props.resetPassword}>Trimite</button>
                </div>
            </div>
        )
    }
}


export default withPharma(Activation)