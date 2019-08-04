import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import moment from 'moment'


class PharmaPortal extends Component {
    constructor(props){
        super(props)
        
        this.state = {
           userCity: this.props.user.city,
           messages: this.props.messages
          
           
        }
    }

    
    componentDidMount(){
        this.props.getMessages(this.state.userCity)
        setInterval(this.props.updateMessage, 70000)
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
                item.toggle ?
                
                <div className = "messageContainer" key = {item._id}>
                    <p className = "p2"> {`Nume: ${item.name.toUpperCase() || ''}`}</p>  
                    <p className = "p5"> {`Tel: ${item.phone}`}</p> 
                    <img  onClick = {() => this.props.enlarge(item._id)} className = 'myImg' alt = '' src = {item.img}/> 
                    <p className = "p3"><span>Cautã: </span>{item.medication}</p>
                    <p className = "p1"> {`Email: ${item.email}`}</p>
                    <p className = "p4"> {`${moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}`}</p>
                </div>

                :
                 
                <div className = "messageContainer" key = {item._id}>
                    <p className = "p2"> {`Nume: ${item.name.toUpperCase() || ''}`}</p>  
                    <p className = "p5"> {`Tel: ${item.phone}`}</p> 
                    <img  style = {document.documentElement.clientWidth < 1100 ? {width: '100%' , height: '60vh'} : {position: 'fixed' , border: "2px solid white", marginTop: '20pt', width: '320pt' , height: '300pt'}}  onClick = {() => this.props.enlarge(item._id)} className = 'myImg' alt = '' src = {item.img}/>
                    <p className = "p33"></p>
                    <p className = "p3"><span>Cautã: </span>{item.medication}</p>
                    <p className = "p1"> {`Email: ${item.email}`}</p>
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