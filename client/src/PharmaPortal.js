import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import moment from 'moment'
import axios from 'axios'
import ring from './Sound/Sound.mp3'

var sound = new Audio(ring)



class PharmaPortal extends Component {
    constructor(props){
        super(props)
        
        this.state = {
           messages: [],
           city3: this.props.user.city,
           cities: ['Oradea','Salonta','Marghita','Sacueni','Beius','Valea lui Mihai','Alesd','Stei','Vascau','Nucet']
        }
    }

    
    
    getMessages = (city) => {
        axios.get(`/message/2/${city}`).then(res => {  
            this.setState({
                messages: res.data 
            })
        })
    }




    updateMessage = () => {
        if(this.mounted){
        axios.get(`/message/2/${this.props.user.city}`).then(res => {  
            console.log(res.data.length, this.state.messages.length)
            if(res.data.length > this.state.messages.length){
                sound.play()
            }
            this.setState({
                messages: res.data 
            })
        })
        }
    }
    
    componentDidMount(){
        this.mounted = true;
        this.getMessages(this.state.city3)
        setInterval(this.updateMessage, 15000);
    }
    
      
      componentWillUnmount() {
         this.mounted = false;
      }

   
    handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
        
        if(e.target.value.length){
          this.getMessages(e.target.value)
        }
    }
    

    render(){
        
        let arr = this.state.messages

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
                     <div className= 'h1' style = {this.state.city3 ? {opacity: 1} : {opacity:0}}>{this.state.messages.length === 1 ?  this.state.city3 + ': 1 mesaj' : `${this.state.city3 +': '+ this.state.messages.length + ' mesaje'}`}</div>
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