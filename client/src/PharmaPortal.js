import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import moment from 'moment'
import axios from 'axios'



class PharmaPortal extends Component {
    constructor(props){
        super(props)
        this.state = {
           messages: []
        }
    }

    
    getMessages = () => {
        axios.get(`/message//${this.props.city}`).then(res => {  
            this.setState({
                 messages: res.data 
            })
        })
    }


    componentDidMount(){
        this.getMessages()
        setInterval(this.getMessages, 60000);
        this.props.getLocation()
    }
    

    render(){
        const messages = this.state.messages.map(item =>{
            return(
                <div className = "messageContainer" key = {item._id}>
                    <p className = "p2"> {`Nume: ${item.name.toUpperCase()}`}</p>  
                    <p className = "p2"> {`Telefon: ${item.phone}`}</p>   
                    <p className = "p2"> {`Data: ${moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}`}</p>
                    <p className = "p2"> {`Oras: ${item.city}`}</p>
                    <p className = "p2"> {`Judet: ${item.county}`}</p>
                    <p className = "p2"> {`Produs: ${item.medication}`}</p>
                </div>
            )
        })
        
        
        return(
            <div className = 'pharmaport'>
                <div className = 'messageWrap'>
                <div className = 'portalWrap'>
                    <h1 className= 'h1'>{this.state.messages.length + ' mesaje ' + (this.props.city.length ? 'în ' + this.props.city : '')}</h1>
                    <button className = "logout" onClick = {this.props.logout}>Log out </button>
                </div>
                    {messages}
                </div>
            </div>
        )
    }
}

export default  withPharma(PharmaPortal)