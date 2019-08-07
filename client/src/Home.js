import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'
import Camera, { FACING_MODES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import Loading from './Loading'
import axios from 'axios'




class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
           city: this.props.city,
           toggle: true,
           sendTo:[],
        }
    }

    componentDidMount(){
       //this.props.getLocation()
       this.getFarmacies()
    }


    getFarmacies = () => {
        let yourCity = this.state.city || this.props.city2
        axios.get(`/user/${yourCity}`).then(res => { 
            let newArr = res.data.map(item =>  item = item.username) 
            this.setState({
                sendTo: newArr
            })
        })
    }
    
    
    sendEmail = (e) => {
        e.preventDefault()
        this.props.handleSubmit() 

        const newMail = {
            phone: this.props.phone,
            email: this.props.email,
            medication: this.props.medication,
            img: this.props.img || '',
            sendTo: this.state.sendTo
        }
        axios.post('/mail', newMail).then(res => {
           console.log(res.data)
        })
        .catch(err => alert(err))
    }
    
    
    toggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    //onCameraError = (error) => {
       // alert(error);
     // }

    


    render(){
            return(
                <div className = 'home'>
                    <div className='bookingContainer'>
                        <div className = "imgWrap">
                            <div className = 'img1'></div>
                            <h1 className = 'cauta'>Cautã produsul dorit:</h1>
                        </div>
                           
                         <form className = 'bookingForm' onSubmit={this.sendEmail}  >
                            
                            { !this.props.city.length && this.state.toggle && !this.props.loading ?
                                <select 
                                    required 
                                    className = 'input'
                                    aria-required="true" 
                                    name='city2'
                                    value={this.props.city2}
                                    onChange={this.props.handleChange2}>
                                <option value = ''>Alege orașul:</option>
                                {this.props.cities.map((city, index) => <option key={city} value={city} className = {index}>{city}</option>)}
                                </select>
                            :
                            
                            <h1 className = 'oras'>{this.state.city}</h1>// geolocation is off right now..
                            }
                           
                            { this.state.toggle ?
                            <div>
                                {!this.props.loading ?
                                <div>
                                    <input 
                                        type='email'
                                        name='email'
                                        placeholder='Email:'
                                        value={this.props.email}
                                        onChange={this.props.handleChange2}
                                        required
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
                                    <button className = 'photoButton' onClick = {() => this.toggle()}>{this.props.img.length ? "Reluați poza"  : "Poza - opțional"}</button>
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
                                <Camera
                                    sizeFactor = {0.5}
                                    isImageMirror = {false}
                                    idealFacingMode = {FACING_MODES.ENVIRONMENT}
                                    onTakePhoto = { (dataUri) => { this.props.onTakePhoto(dataUri)} }
                                  //  onCameraError = { (error) => { this.onCameraError(error); } }
                                    isDisplayStartCameraError = {false}
                                />
                                <button className = 'cameraButton' onClick = {() => this.toggle()}>înapoi</button>
                            </div>
                            }
                        </form>
                    </div>
                 </div>              
            )
    }
}

       
    export default withPharma(Home)