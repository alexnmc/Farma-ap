import React, { Component } from 'react'
import axios from 'axios'
import ring from './Sound/Sound.mp3'
import cities from './cities'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
const uuidv1 = require('uuid/v1')

const secureAxios = axios.create();

secureAxios.interceptors.request.use((config)=>{
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})


const PharmaContext = React.createContext()
const sound = new Audio(ring)

class PharmaProvider extends Component {
    constructor(){
        super()
        this.state = {
            toggleHome: true,
            toggle3: '',
            user: JSON.parse(localStorage.getItem("user")) || {},
            token: localStorage.getItem("token") || "",
            toggle: true,
            toggle2: true,
            username: '',
            password: '',
            password2: '',
            pharmaCode: '',
            city2: '',
            city4:'',
            email: '',
            forgotEmail: '',
            newPassword: '',
            newPassword2:'',
            phone: '',
            time:'',
            medication: '',
            img:'',
            cities: cities,
            messages: [],
            currentCity: '',
            confirmed: '',
            loading: false,
            alert: '',
            alert2:'',
            messageLoading: false
        }
    }

    leavePage = () => {
        this.setState({
            user:'',   
            token: '',
            toggle: true
        })
        localStorage.removeItem("user")
        localStorage.removeItem("token")
    }

    logout = () => {
        var answer = window.confirm("Ești sigur cã vrei sã ieși din cont?")
            if(answer){
                this.setState({
                    user:'',   
                    token: '',
                    toggle: true
                })
            localStorage.removeItem("user")
            localStorage.removeItem("token")
        }
    }

    signup = userInfo => {
        axios.post('/user/signup', userInfo).then(res => {
           if(res.data.success === 'success'){
            this.setState({
               toggle3: res.data.success,
            })
           this.sendActivationEmail(res.data.user._id, res.data.user.username)
            }else{
               alert("Eroare! Vã rugãm sã încercați din nou.")
            }
        }).catch(err => this.setState({alert: err.response.data.errMsg}))
    }

    login = userInfo => {
        axios.post('/user/login', userInfo).then(res => {
            if(res.data.user.confirmed){
                const { token, user } = res.data          // when the token and user comes back from the database we store it in local storage
                localStorage.setItem("user", JSON.stringify(user))
                localStorage.setItem("token", token)
                this.setState({user: user, token })
                this.setState({loading:false})
            }else{
                this.setState({alert: "Vã rugãm sã activati contul!" , loading:false})
                this.sendActivationEmail(res.data.user._id, res.data.user.username)

            }
        }).catch(err => this.setState({alert: err.response.data.errMsg, loading:false}))
    }

    editToggler = () => {
        this.setState(prevState => {
            return {
                toggle: !prevState.toggle, //toggle from login to signup
                username: '',
                password: '',
                password2: '',
                pharmaCode: '',
                forgotEmail: '',
                confirmed:'',
                toggle2: true,
                toggle3: '',
                alert:'',
                alert2:'',
                city4:''     
            }
        })
    }

    editToggler2 = () => { //toggle from login to reset password
        this.setState(prevState => {
            return {
                toggle2: !prevState.toggle2,
                forgotEmail: '',
                confirmed:'',
                alert: '',
                alert2:'',
            }
        })
    }

    handleLogin = (e) => {    
        e.preventDefault()
        this.setState({loading:true})
        const newUser = {
            username: this.state.username,
            password: this.state.password,
        }
        this.login(newUser) 
        this.setState({
           alert2:'',
        })
    }

    pharmaSignup = () => {
        if(this.state.password.length < 6){
            this.setState({
                alert: 'Parola 6 - 8 caractere'
            })
        }else{
            const newUser = {
                username: this.state.username,
                password: this.state.password,
                city: this.state.city4
            }
            this.signup(newUser)
            this.setState({
                username: '',
                password: '',
                password2:'',
                pharmaCode:'',
                city4: '',
            })
        }
    }
    
    handleSignup = (e) => {
        e.preventDefault()
        this.state.password === this.state.password2 ?    
            this.state.pharmaCode === process.env.REACT_APP_CODE ?
                this.pharmaSignup()
                :
                this.state.pharmaCode === "" ? 
                     this.setState({alert: "Vã rugãm sa introduceți codul secret!"})
                    :
                     this.setState({alert: "Cod greșit!"})
        :
            this.setState({alert:'Parolele nu sunt identice!'})
    }

    handleReset = () => {
        axios.get(`/user/reset/${this.state.forgotEmail}`).then(res => { 
            if(res.data.confirmed !== 'Confirmed'){
                this.setState({alert: res.data.confirmed})
            } else {
                this.setState({alert: '', confirmed: res.data.confirmed})
                this.sendResetEmail(this.state.forgotEmail, res.data.id)
            }
        })
    }

    resetPassword = (id) => {
        if(this.state.newPassword.length < 6){
            this.setState({
                alert: 'Parola minim 6 caractere'
            })
        }else{
            if(this.state.newPassword === this.state.newPassword2){
                const newUser = {
                    password: this.state.newPassword,
                }
                axios.put(`/user/reset/${id}`, newUser).then(res => {
                        this.setState({alert2: res.data})
                    if(res.data === "Parola a fost schimbatã!" ){
                        this.setState({
                            confirmed: '',
                            newPassword: '',
                            newPassword2:'',
                           
                        })
                    }
                })
            }else{
                this.setState({
                    alert:  "Parolele nu sunt identice!"
                })
            }
        }
    }

    alertCallBack = (data, email, med, phone) => {
       // alert(data +' Email: ' + email +'  medicament: '+ med)
       confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className='customAlert'>
              <h1 className = "alertH1">{data}</h1>
              <p className = "spc">Telefon:</p>
              <p className = "alertP">{phone}</p>
              {email.length > 0 &&
                <div className='customAlert'>
                    <p className = "spc">Email:</p>
                    <p className = "alertP">{email}</p>
                </div>
              }
              <p className = "spc">Produs cãutat:</p>
              <p className = "alertP">{med}</p>
              <button style = {{marginBottom: "30pt"}} className = 'photoButton' onClick={onClose}>închide</button>
              <p className = "alertP2">Veți fi contactat direct de farmaciile care oferă produsul!</p>
            </div>
          )
        }
      })
    }
    
    handleSubmit = () => {  // on submit we are sending a new message object to the database
            this.setState({loading: true})
            const { email, phone, medication, img, county} = this.state
            const city = this.state.city2
            const date = new Date()
            axios.post('/messages', {date, email, phone, medication, img, city, county}).then(res => {
                this.setState(
                {loading: false},
                this.alertCallBack(res.data, email, medication, phone)
                )
            })
            
            this.setState({
                email: '',
                phone: '',
                medication: '',
                img: '',
                city2: ''
            })
    }
    
    handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value,
            currentCity: e.target.value
        }, this.getMessages(e.target.value))
    }  

    handleChange2 = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value,
            alert:'',
            alert2:''
        })
    }  

    handleChange3 = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value,
            city2: e.target.value
        })
    }  

    handleChange4 = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        this.setState({
            [name]: value,
            city4: e.target.value
        })
    }  
    
    getMessages = (city) => {
        if(city.length){
            this.setState({currentCity:city}, this.getMessage2)
        }   
    }

    getMessage2 = () => {
        this.setState({messageLoading: true})
        secureAxios.get(`api/message/2/${this.state.currentCity}`).then(res => {  
            this.setState({
                messages: res.data,
                messageLoading: false
            })
        })
    }

    getAllMessage = () => {
        this.setState({messageLoading: true})
        secureAxios.get(`api/message`).then(res => {  
            console.log(res.data)
            this.setState({
                messages: res.data,
                messageLoading: false
            })
        })
    }

    updateMessage = () => {
        secureAxios.get(`api/message/2/${this.state.currentCity}`).then(res => {  
            if(res.data.length > this.state.messages.length){
                sound.play()
            }
            this.setState({
                messages: res.data 
            })
        })
    }

    deleteMessage = (id) => {
        var answer = window.confirm("Ești sigur cã vrei sã ștergi mesajul?")
        if(answer){
            secureAxios.delete(`api/message/${id}`).then(res => {
                this.setState(prevState=>({   //I use prevState so the requested note gets deleted without refreshing
                    messages: prevState.messages.filter(item => item._id !== id)
                }))
            })
        }
    }

    onTakePhoto = (dataUri) => {
        this.setState({
           img: dataUri
        })
    }

    enlarge = (id) => {
        let newArr = this.state.messages // not mutating state
        newArr.map(item => item._id === id ? item.toggle = !item.toggle : item.toggle = true) 
        this.setState({
            messages: newArr
        })
    }

    deletePhoto = () => {
        this.setState({
            img: '',
        })
    }

    rezolvat = (id, email) => {
        var answer = window.confirm("Ești sigur cã vrei sã inchizi mesajul?")
        if(answer){
            const updates = {rezolvat: true}
            secureAxios.put(`api/message/${id}`, updates).then(response => {
                const updatedMessage = response.data
                this.setState(prevState => {
                    return {
                        messages: prevState.messages.map(item => item._id === id ? updatedMessage : item ),
                        
                        }
                    })
            })
        }
    }

    sendResetEmail = (email, id) => {
        let linkID = uuidv1()
        
        const newLink = {
            linkID: linkID,
            userID: id,
        }
        secureAxios.post('api/link', newLink).then(res => {
        }).catch(err => console.log(err))
    
        const newMail = {
            sendTo: email,
            linkID: linkID,
        }
        secureAxios.post('api/mail/reset', newMail).then(res => {
        }).catch(err => console.log(err))
    }

    sendActivationEmail = (id, email) => {
        const newMail = {
            sendTo: email,
            id: id
        }
        secureAxios.post('api/mail/activate', newMail).then(res => {
          
        }).catch(err => console.log(err))
    }

    reloadRender = () => {
        this.setState({
            toggleHome: !this.state.toggleHome
        })
    }

    reloadRender2 = () => {
        this.setState({
            toggleHome: true
        })
    }

    reloadRender3 = () => {
        this.setState({
            toggle: true,
            toggle2: true
        })
    }

    render() {
        return (
            <PharmaContext.Provider
                value={{
                    ...this.state,
                    handleToggle: this.handleToggle,
                    handleEdit:this.handleEdit,
                    logout: this.logout,
                    leavePage: this.leavePage,
                    showMessages: this.showMessages,
                    handleDelete: this.handleDelete,
                    signup: this.signup,
                    login: this.login,
                    handleReset: this.handleReset,
                    resetPassword: this.resetPassword,
                    editToggler: this.editToggler,
                    editToggler2: this.editToggler2,
                    handleLogin: this.handleLogin,
                    pharmaSignup: this.pharmaSignup,
                    handleSignup: this.handleSignup,
                    handleChange: this.handleChange,
                    handleChange2: this.handleChange2,
                    getLocation: this.getLocation,
                    handleSubmit: this.handleSubmit,
                    getMessages: this.getMessages,
                    getAllMessage: this.getAllMessage,
                    updateMessage: this.updateMessage,
                    deleteMessage: this.deleteMessage,
                    onTakePhoto: this.onTakePhoto,
                    enlarge: this.enlarge,
                    rezolvat: this.rezolvat,
                    handleChange3: this.handleChange3,
                    handleChange4: this.handleChange4,
                    deletePhoto: this.deletePhoto,
                    reloadRender: this.reloadRender,
                    reloadRender2: this.reloadRender2,
                    reloadRender3: this.reloadRender3
                }}>
                {this.props.children}
            </PharmaContext.Provider>
        )
    }
}

export default PharmaProvider

export const withPharma = C => props => (
    <PharmaContext.Consumer>
        {value => <C {...props} {...value}/> }
    </PharmaContext.Consumer>
)

