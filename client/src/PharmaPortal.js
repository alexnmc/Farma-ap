import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import moment from 'moment'
import { FaUser, FaPhone, FaEnvelope} from 'react-icons/fa'
import ReactLoading from "react-loading"




class PharmaPortal extends Component {
    constructor(props){
        super(props)
        this.state = {
           userCity: this.props.user.city,
           helpToggle: true,
           admin: "cristianlazar2000@yahoo.com",
        }
    }

    
    getData = () => this.props.user.username !== this.state.admin ? this.props.getMessages(this.state.userCity) : this.props.getAllMessage()
    
    componentDidMount(){
        this.getData()
        setTimeout(this.interval = setInterval(this.props.updateMessage() , 15000), 15000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }

    helpToggle = () => {
        this.setState({
            helpToggle: !this.state.helpToggle
        })
    }

    render(){
        let arr = this.props.messages

        arr.sort(function (a, b) {
            return new Date(b.time) - new Date(a.time)
        })  

        arr.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date)
        })  

        const admin = arr.map(item =>{
            return(
                item.toggle ?
                
                <div className = "messageContainer" key = {item._id} style = {{backgroundColor: item.rezolvat ? "rgb(38, 55, 82)" : null}}>
                    <p className = "p4"> {item.city}</p>
                    <p className = "p4"> {moment(item.date).format('ll, HH:mm:ss ')}</p>
                    {item.img ? <img onClick = {!item.rezolvat ? () => this.props.enlarge(item._id) : null} className = 'myImg' alt = '' src = {item.img} style = {item.rezolvat ? {cursor:'none'}: null}/> : <div style = {{width:'30pt', height: '20pt'}}></div>}
                    <p className = "p3" style = {item.rezolvat ?  {color: "black"} : null}><span>Cautã: </span>{item.medication}</p>
                    <p className = "p1"><FaEnvelope/>{item.rezolvat ? <p style = {{color:'black', marginLeft: "5pt"}}>{item.email}</p> : <a href = {`mailto:${item.email}`} style = {{color: "blue", marginLeft: "5pt"}}>{item.email}</a>}</p>
                    <p className = "p5"><FaPhone/>{item.rezolvat ? <p style = {{color:'black', marginLeft: "5pt"}}>{`0${item.phone}`}</p> : <a href = {`tel: ${item.phone}`} style = {{color: "blue", marginLeft: "5pt"}}>{`0${item.phone}`}</a>}</p>
                    <p className = 'rezolvat' onClick = {!item.rezolvat ? () => this.props.rezolvat(item._id) : () => this.props.deschide(item._id)} style = {item.rezolvat ? {color: "white"} : null}>{!item.rezolvat ? "închide" : "deschide "}</p>
                    <button className = 'sterge' onClick = {() => this.props.deleteMessage(item._id)}>șterge</button>
                </div>

                :
                 
                <div className = "messageContainer" key = {item._id} style = {{backgroundColor : 'lightgrey' , padding: "7pt"}}>
                    <p className = "p4">{item.city}</p>
                    {document.documentElement.clientWidth < 1000 ? <p className = "p3"><span>Cautã: </span>{item.medication}</p> : <p style = {{width: '300pt'}}></p>}
                    <img    style = {document.documentElement.clientWidth < 1100 ?  
                                        {width: '100%' , height: '50vh', marginTop: '1%'} 
                                        : 
                                        {position: 'absolute' , border: "2px solid white", marginTop: '20pt', marginLeft: '-20%' , width: '320pt' , height: '300pt'}}  
                            onClick = {() => this.props.enlarge(item._id)} 
                            className = 'myImg' 
                            alt = '' 
                            src = {item.img}/>
                    {document.documentElement.clientWidth < 1000 ? null : <p className = 'p33'></p>}
                    <p className = "p3" style = {{width: "85pt"}}></p>
                    <p className = "p1"><FaEnvelope/><a href = {`mailto:${item.email}`} style = {{color: "blue", marginLeft: "5pt"}}>{item.email}</a></p>
                    <p className = "p5"><FaPhone/><a href = {`tel: ${item.phone}`} style = {{color: "blue", marginLeft: "5pt"}}>{`0${item.phone}`}</a></p> 
                    <p className = 'rezolvat' onClick = {!item.rezolvat ? () => this.props.rezolvat(item._id) : () => this.props.deschide(item._id)} style = {item.rezolvat ? {color: "white"} : null}>{!item.rezolvat ? "închide" : "deschide "}</p>
                    <button className = 'sterge' onClick = {() => this.props.deleteMessage(item._id)}>șterge</button>
                </div>
            )})
        
        const messages = arr.map(item =>{
            return(
                item.toggle ?
                
                <div className = "messageContainer" key = {item._id} style = {{backgroundColor: item.rezolvat ? "rgb(38, 55, 82)" : null}}>
                    <p className = "p4"> {moment(item.date).format('ll, HH:mm:ss ')}</p>
                    {item.img ? <img onClick = {!item.rezolvat ? () => this.props.enlarge(item._id) : null} className = 'myImg' alt = '' src = {item.img} style = {item.rezolvat ? {cursor:'none'}: null}/> : <div style = {{width:'30pt', height: '20pt'}}></div>}
                    <p className = "p3" style = {item.rezolvat ?  {color: "black"} : null}><span>Cautã: </span>{item.medication}</p>
                    <p className = "p1"><FaEnvelope/>{item.rezolvat ? <p style = {{color:'black', marginLeft: "5pt"}}>{item.email}</p> : <a href = {`mailto:${item.email}`} style = {{color: "blue", marginLeft: "5pt"}}>{item.email}</a>}</p>
                    <p className = "p5"><FaPhone/>{item.rezolvat ? <p style = {{color:'black', marginLeft: "5pt"}}>{`0${item.phone}`}</p> : <a href = {`tel: ${item.phone}`} style = {{color: "blue", marginLeft: "5pt"}}>{`0${item.phone}`}</a>}</p>
                    <p className = 'rezolvat' onClick = {!item.rezolvat ? () => this.props.rezolvat(item._id, item.email) : null} style = {item.rezolvat ? {cursor:'none', color: "white"} : null}>{!item.rezolvat ? "închide" : "rezolvat"}</p>
                </div>

                :
                 
                <div className = "messageContainer" key = {item._id} style = {{backgroundColor : 'lightgrey', padding: "7pt"}}>
                    <p className = "p4"> {moment(item.date).format('ll, HH:mm:ss ')}</p>
                    {document.documentElement.clientWidth < 1000 ? <p className = "p3"><span>Cautã: </span>{item.medication}</p> : <p style = {{width: '300pt'}}></p>}
                    <img    style = {document.documentElement.clientWidth < 1100 ?  
                                        {width: '100%' , height: '50vh', marginTop: '1%'} 
                                        : 
                                        {position: 'absolute' , border: "2px solid white", marginTop: '20pt', marginLeft: '-20%' , width: '320pt' , height: '300pt'}}  
                            onClick = {() => this.props.enlarge(item._id)} 
                            className = 'myImg' 
                            alt = '' 
                            src = {item.img}/>
                    {document.documentElement.clientWidth < 1000 ? null : <p className = 'p33'></p>}
                    <p className = "p3" style = {{width: "85pt"}}></p>
                    <p className = "p1"><FaEnvelope/><a href = {`mailto:${item.email}`} style = {{color: "blue", marginLeft: "5pt"}}>{item.email}</a></p>
                    <p className = "p5"><FaPhone/><a href = {`tel: ${item.phone}`} style = {{color: "blue", marginLeft: "5pt"}}>{`0${item.phone}`}</a></p> 
                    <p className = 'rezolvat' onClick = {!item.rezolvat ? () => this.props.rezolvat(item._id) : () => this.props.deschide(item._id)} style = {item.rezolvat ? {color: "white"} : null}>{!item.rezolvat ? "închide" : "deschide "}</p>
                    <button className = 'sterge' onClick = {() => this.props.deleteMessage(item._id)}>șterge</button>
                </div>
            )
        })
    
        return(
            <>
            <div className = 'pharmaport'>
                <div className = 'messageWrap'>
                    <div style = {{margin: "auto" , width: "97%" , display:'flex', alignItems: 'center', justifyContent: 'space-evenly', marginBottom: '5pt'}}>
                        <p className = 'h1A' style = {{cursor: 'pointer' , color:"red"}}  onClick = {() => this.helpToggle()}>{this.state.helpToggle ? "utilizare" : "înapoi"}</p>
                        <div style = {{display: "flex"}}>
                            <FaUser/>
                            <p className = 'h1A' style = {{marginLeft:'3pt'}}>{this.props.user.username}</p>
                        </div>
                    </div>
                    <div className = 'portalWrap'>
                        {this.props.user.username === this.state.admin ?
                            <div className = 'h1'>{this.props.messages.length === 1 ? '1 mesaj' : `${this.props.messages.length + ' mesaje'}`}</div>
                            :
                            <>
                            <div className = 'h1' style = {this.props.currentCity ? {opacity: 1} : {opacity:0}}>{this.props.messages.length === 1 ? '1 mesaj' : `${this.props.messages.length + ' mesaje'}`}</div>
                            <input type = "text" className = 'input2' list="mylist" placeholder = 'Alege orașul:' value = {this.props.currentCity} onChange={this.props.handleChange} required/>
                            <datalist id="mylist" >
                            {this.props.cities.map((city, index) => <option key={city} value={city} className = {index}>{city}</option>)}
                            </datalist>
                            </>
                        }  
                        <button className = "logout" onClick = {this.props.logout}>ieșire</button>
                    </div>
                    {this.state.helpToggle ? 
                        <>
                            {this.props.messageLoading ? 
                                <div style = {{height: "50vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
                                    <ReactLoading  type={'balls'} color={'rgb(14, 25, 47)'} height={'40pt'} width={'40pt'} margin = {"auto"}/>
                                </div>
                            :
                                <> 
                                {this.props.messages.length ?
                                    <div className = "scrollDiv">
                                        {this.props.user.username === this.state.admin ? admin : messages}
                                        <div style = {{height: "20pt"}}></div>
                                    </div>
                                    :
                                    <div className = "wrapDiv">
                                        <p style = {{fontSize: "12.5pt", fontFamily: "arial"}}>nici un mesaj</p>
                                    </div>
                                }
                                </>
                            }
                        </>

                        :

                        <div className = "pharmaport" style = {{marginTop: '15vh'}}>
                            <ul>
                                <li className = "help">Alegeți orașul în care doriți sa citiți mesaje</li>
                                <li className = "help">După rezolvarea unui mesaj dați click pe <span style = {{color: "red"}}>închide</span></li>
                                <li className = "help">Mesajele închise nu se pot re-deschide</li>
                                <li className = "help">Pentru a mãri poza din mesaj dați click pe pozã</li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
            </>
        )
    }
}

export default  withPharma(PharmaPortal)