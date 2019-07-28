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

    
    componentDidMount(){
            axios.get(`/message//${this.props.city}`).then(res => {  // get request to the database to display all the bookings on the AdminPortal page
                this.setState({
                    messages: res.data 
                })
            })
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
                <h1 className= 'h1'>{this.state.messages.length === 1 ? '1 mesaj' : this.state.messages.length + ' mesaje în ' + this.props.city}</h1>
                    {messages}
                </div>
                <button onClick = {this.props.logout}>Log out </button>
            </div>
        )
    }
}

export default  withPharma(PharmaPortal)