import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import Camera, { FACING_MODES, IMAGE_TYPES} from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import Loading from './Loading'
import axios from 'axios'
import Search from './Search'




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

    onCameraError = (error) =>{
        alert('Vã rugãm sã activați camera foto!')
        //window.location.reload()
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
                                <div className = 'img1'></div>
                                <h1 className = 'cauta'>Caută produsul dorit:</h1>
                            </div>
                            : 
                            <div className = "imgWrap">
                                <h1 className = 'cauta3'>{!this.state.enlargeToggle ? "Luați poza rețetei sau a produsului:" : "Poza salvatã:"}</h1>
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
                                    <button className = 'photoButton' onClick = {() => this.toggle()}>{this.props.img.length ? "Reluați poza" : "Poza - opțional"}</button>
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
                                        {!this.state.enlargeToggle ? <p style = {{ cursor: "pointer" , fontFamily: "arial", color:"rgb(24, 80, 170)", fontSize: "9pt" , fontWeight: '200'}} onClick = {() => this.enlargePicture()}>click</p> 
                                                                     : 
                                                                     <p style = {{ cursor: "pointer" , fontFamily: "arial", color:"rgb(24, 80, 170)", fontSize: "9pt" , fontWeight: '200'}} onClick = {() => this.enlargePicture()}>înapoi</p>
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
                                <Camera
                                    sizeFactor = {0.4}
                                    isImageMirror = {false}
                                    idealFacingMode = {FACING_MODES.ENVIRONMENT}
                                    onTakePhoto = { (dataUri) => { this.props.onTakePhoto(dataUri)} }
                                    onCameraError = { (error) => { this.onCameraError(error) } }
                                    isDisplayStartCameraError = {false}
                                    imageType = {IMAGE_TYPES.JPG}
                                    imageCompression = {1}
                                />
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