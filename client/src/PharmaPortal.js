import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import moment from 'moment'


class PharmaPortal extends Component {
    constructor(props){
        super(props)
        
        this.state = {
           
        }
    }

    
    componentDidMount(){
        this.props.getMessages(this.props.user.city)
        setInterval(this.props.updateMessage, 30000)
    }
    
      
    
    render(){
        
        let arr = this.props.messages

        arr.sort(function (a, b) {
            return new Date(b.time) - new Date(a.time)
        })  

        arr.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date)
        })  
        
        const messages = arr.map(item =>{
            return(
                <div className = "messageContainer" key = {item._id}>
                    <p className = "p2"> {`Nume: ${item.name.toUpperCase()}`}</p>  
                    <p className = "p3"><span>Cautã: </span>{item.medication}</p>
                    <p className = "p2"> {`Tel: ${item.phone}`}</p>   
                    <p className = "p2"> {`Email: ${item.email}`}</p>
                    <p className = "p4"> {`${moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}`}</p>
                </div>
            )
        })

       
        return(
            <div className = 'pharmaport'>
                <div className = 'messageWrap'>
                <div className = 'portalWrap'>
                     <div className= 'h1' style = {this.props.currentCity ? {opacity: 1} : {opacity:0}}>{this.props.messages.length === 1 ?  this.props.currentCity + ': 1 mesaj' : `${this.props.currentCity +': '+ this.props.messages.length + ' mesaje'}`}</div>
                    <select 
                        required 
                        className = 'input2'
                        aria-required="true" 
                        name='city3'
                        value = {this.props.currentCity}
                        onChange={this.props.handleChange}>
                    <option value = ''>Alege orasul:</option>
                    {this.props.cities.map((city, index) => <option key={city} value={city} className = {index}>{city}</option>)}
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