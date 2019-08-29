import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import Loading from './Loading'
import axios from 'axios'
import Search from './Search'
import camera from './Photos/camera.png'
import PhotoCamera from './Camera'





class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
           city: this.props.city,
           sendTo:[],
           enlargeToggle: false
        }
    }

    getFarmacies = (e) => {
        e.preventDefault()
        let yourCity = this.props.city || this.props.city2
        axios.get(`/user/${yourCity}`).then(res => { 
           let newArr = res.data.map(item =>  item = item.username) 
            this.setState({
                sendTo: newArr
            }, this.sendEmail)
        })
    }
    
    sendEmail = () => {
        this.props.handleSubmit() 
        const newMail = {
            phone: this.props.phone,
            email: this.props.email,
            medication: this.props.medication,
            img: this.props.img || '',
            sendTo: this.state.sendTo
        }
        axios.post('/mail', newMail).then(res => {
          console.log(res)
        }).catch(err => alert(err))
    }
    
    toggle = () => {
        this.props.reloadRender()
    }

    enlargePicture = () => {
        this.setState({
            enlargeToggle: !this.state.enlargeToggle
        })
    }

    deleteImg = () => {
        var answer = window.confirm("Ești sigur cã vrei sã ștergi poza?")
            if(answer){
                this.props.deletePhoto()
                this.setState({
                    enlargeToggle: false
                })
            }else{
                this.setState({
                    enlargeToggle: false
                })
            }
    }

    
    render(){
            return(
                <div className = 'home'>
                    <div className='bookingContainer'>
                        {this.props.toggleHome ? 
                            <div className = "imgWrap">
                               <h1 className = 'cauta'>Caută produsul dorit:</h1>
                            </div>
                            : 
                            <div className = "imgWrap">
                                <h1 className = 'cauta3'>{!this.state.enlargeToggle ? "Fotografiați rețeta sau produsul cãutat:" : "Poza salvatã:"}</h1>
                            </div>
                        }
                        <form className = 'bookingForm' onSubmit={this.getFarmacies}  >
                        { this.props.toggleHome ?
                            <div>
                                {!this.props.loading ?
                                <div>
                                    <Search/>
                                    <input 
                                        type='email'
                                        name='email'
                                        placeholder='Email-opțional'
                                        value={this.props.email}
                                        onChange={this.props.handleChange2}
                                    />
                                    <input 
                                        type='number'
                                        name='phone'
                                        placeholder='Telefon:'
                                        value={this.props.phone}
                                        onChange={this.props.handleChange2}
                                        required
                                    />
                                    <input 
                                        type='text'
                                        name='medication'
                                        placeholder='Produsul dorit:'
                                        value={this.props.medication}
                                        onChange={this.props.handleChange2}
                                        required
                                    />
                                    <button className = 'photoButton' onClick = {() => this.toggle()}>{this.props.img.length ? "Reluați poza" : "Poza - opțional"} <img className = 'cameraLogo' alt ='' src = {camera}></img></button>
                                    <button className = 'button2'>Trimite</button>
                                </div>
                                
                                :
                                
                                <div>
                                    <Loading/>
                                </div>
                                }
                            </div>
                           
                           :
                            
                            <div className = "cameraWrap"> 
                            { this.props.img ?  
                                <div className = "savedImgWrap">
                                    { !this.state.enlargeToggle && this.props.img.length && <h2 className = "savedImg">Pozã salvatã:</h2>}
                                        <div style = {{display: "block", margin:"auto"}}>
                                        <div style = {{display: 'flex', alignItems: "center" , justifyContent: 'space-between'}}>
                                        {this.state.enlargeToggle && <p style = {{ cursor: "pointer" , fontFamily: "arial", color:"white", fontSize: "9pt" , fontWeight: '200'}} onClick = {() => this.enlargePicture()}>înapoi</p>
                                        }
                                        {this.state.enlargeToggle && <button onClick = {()=> this.deleteImg()}className = 'deletePic'>șterge</button>}
                                        </div>
                                        <img className = 'savedPicture' alt = '' src = {this.props.img}  style = {this.state.enlargeToggle ? document.documentElement.clientWidth < 900 ? {width: '85vw' , height: '60vh'} : {width: '300pt' , height: '300pt'} : null} onClick = {() => this.enlargePicture()}/> 
                                      
                                      </div>
                                </div>
                                :
                                null
                            }
                               { !this.state.enlargeToggle ?
                                <div>
                                    <PhotoCamera/>
                                    <button className = 'cameraButton' onClick = {() => this.toggle()}>înapoi</button>
                                </div>
                                : 
                                null
                               }
                            </div>
                            }
                        </form>
                    </div>
                 </div>              
            )
    }
}

       
    export default withPharma(Home)