import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import moment from 'moment'
import axios from 'axios'



class PharmaPortal extends Component {
    constructor(props){
        super(props)
        this.state = {
           messages: [],
           city3: '',
           cities: ["Oradea" , "Carei" , "Timisoara", "Bucuresti"]
        }
    }

    
    getMessages = (city) => {
        axios.get(`/message/2/${city}`).then(res => {  
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

   
    handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
       
        this.getMessages(e.target.value)
    }
    

    render(){
        const messages = this.state.messages.map(item =>{
            return(
                <div className = "messageContainer" key = {item._id}>
                    <p className = "p3"> {`Produs: ${item.medication}`}</p>
                    <p className = "p2"> {`Nume: ${item.name.toUpperCase()}`}</p>  
                    <p className = "p2"> {`Tel: ${item.phone}`}</p>   
                    <p className = "p2"> {`Oras: ${item.city}`}</p>
                    <p className = "p2"> {`Judet: ${item.county || 'necunoscut'}`}</p>
                    <p className = "p4"> {` ${moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}`}</p>
                </div>
            )
        })
        
        
        return(
            <div className = 'pharmaport'>
                <div className = 'messageWrap'>
                <div className = 'portalWrap'>
                     <div className= 'h1' style = {this.state.city3 ? {opacity: 1} : {opacity:0}}>{this.state.messages.length === 1 ? ' 1 mesaj' : this.state.messages.length + ' mesaje'}</div>
                    <select 
                        required 
                        className = 'input2'
                        aria-required="true" 
                        name='city3'
                        value = {this.state.city3}
                        onChange={this.handleChange}>
                    <option value = ''>Alege orasul:</option>
                    {this.state.cities.map((city, index) => <option key={city} value={city} className = {index}>{city}</option>)}
                    </select>
                    <button className = "logout" onClick = {this.props.logout}>Log out </button>

                    
                </div>
                    {messages}
                </div>
            </div>
        )
    }
}

export default  withPharma(PharmaPortal)