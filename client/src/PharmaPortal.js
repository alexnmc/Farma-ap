import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import moment from 'moment'


class PharmaPortal extends Component {
    constructor(props){
        super(props)
        
        this.state = {
           userCity: this.props.user.city,
           messages: this.props.messages,
        }
    }

    
    componentDidMount(){
        this.props.getMessages(this.state.userCity)
        setInterval(this.props.updateMessage, 100000)
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
                
                <div className = "messageContainer" key = {item._id} style = {{backgroundColor: item.rezolvat ? "rgb(54, 125, 187, 0.900)" : null}}>
                    <p className = "p1" style = {item.rezolvat ? {color: 'rgb(0, 74, 160)'} : null}>Email: <a href = {`mailto:${item.email}`} style = {{fontWeight: "500"}}>{item.email}</a></p>
                    <p className = "p5" style = {item.rezolvat ? {color: 'rgb(0, 74, 160)'} : null}>Tel: <a href = {`tel: ${item.phone}`}>{`0${item.phone}`}</a></p> 
                    {item.img ? <img  onClick = {!item.rezolvat ? () => this.props.enlarge(item._id) : null} className = 'myImg' alt = '' src = {item.img}/> : <div style = {{width:'30pt', height: '20pt'}}></div>}
                    <p className = "p3" style = {item.rezolvat ? {color: 'rgb(0, 74, 160)'} : null}><span style = {item.rezolvat ? {color: 'rgb(0, 74, 160)'} : null}>Cautã: </span>{item.medication}</p>
                    <p className = "p4"> {moment(item.date).format('MMMM Do YYYY, HH:mm:ss ')}</p>
                    <p className = 'rezolvat' onClick = {!item.rezolvat ? () => this.props.rezolvat(item._id, item.email) : null}>{!item.rezolvat ? "Rezolvat?" : "Închis"}</p>
                </div>

                :
                 
                <div className = "messageContainer" key = {item._id} style = {{position: 'relative' , backgroundColor : ' rgba(62, 142, 212, 0.570)', color: 'white'}}>
                    <p className = "p1"> {`Email: ${item.email}`}</p>
                    <p className = "p5"> {`Tel: ${item.phone}`}</p> 
                    <img    style = {document.documentElement.clientWidth < 1100 ?  
                                        {width: '100%' , height: '60vh'} 
                                        : 
                                        {position: 'absolute' , border: "2px solid white", marginTop: '20pt', marginLeft: '40pt' , width: '320pt' , height: '300pt'}}  
                            onClick = {() => this.props.enlarge(item._id)} 
                            className = 'myImg' 
                            alt = '' 
                            src = {item.img}/>
                    <p className = "p33"></p>
                    {document.documentElement.clientWidth < 1000 ? <p className = "p3"><span>Cautã: </span>{item.medication}</p> : <p style = {{width: '300pt'}}></p>}
                    <p className = "p4" style = {{color: 'white'}}> {moment(item.date).format('MMMM Do YYYY, HH:mm:ss')}</p>
                    <p style = {{width:'50pt'}}></p>
                </div>
            )
        })

       
        return(
            <div className = 'pharmaport'>
                <div className = 'messageWrap'>
                <div className = 'portalWrap'>
                    <div className= 'h1' style = {this.props.currentCity ? {opacity: 1} : {opacity:0}}>{this.props.messages.length === 1 ? '1 mesaj' : `${this.props.messages.length + ' mesaje'}`}</div>
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