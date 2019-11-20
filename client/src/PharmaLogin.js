import React from 'react'
import { withPharma } from './PharmaProvider'
import CheckAnimation from './Animations/UncontrolledLottie.jsx'
import ReactLoading from "react-loading"
import LoginSearch from './LoginSearch'



const PharmaLogin = props =>  {
    
        return(
            <div className="admin">
                <div className = "loginContainer">
                    {props.toggle ?
                            <div  className='loginForm'>
                                <div className = "loginWrap">
                                    <div className = "loginLogo"></div>
                                    <p className = 'cont'>Alãturați-vã rețelei noastre! <span className = 'link' onClick={props.editToggler}>Înregistrare</span></p>
                                </div>
                                {props.toggle2 ?
                                <div className = "loginForm">
                                    <h4>Intrare în cont:</h4>
                                    <input
                                        className = "login1"
                                        type='text'
                                        name='username'
                                        placeholder='Email'
                                        value={props.username}
                                        onChange={props.handleChange2}
                                    />

                                    <input
                                        className = "login1"   
                                        type="password"
                                        name='password'
                                        maxLength="8"
                                        placeholder='Parola'
                                        value={props.password}
                                        onChange={props.handleChange2}
                                    />
                                    {!props.loading ?
                                    <p className = "alert" style = {props.alert2 ? {color:'blue'} : null}>{props.alert || props.alert2}</p>
                                    :
                                    <div className = "resetLoading" style = {{marginTop: "10pt"}}>
                                      <ReactLoading  type={'spin'} color={'rgb(0, 121, 151)'} height={'20pt'} width={'20pt'}/>
                                    </div>
                                    }
                                    <button className = 'loginButton' onClick={props.handleLogin}>Autentificare</button>
                                </div>
                                
                                :
                                
                                <div>
                                {props.confirmed !== 'Confirmed' ?
                                    <div className = "loginForm">
                                        <h4 className = 'h4'>Introduceți adresa de email cu care ați creat contul:</h4>
                                        <input
                                            className = "login33"
                                            type='text'
                                            name='forgotEmail'
                                            placeholder='Email'
                                            value={props.forgotEmail}
                                            onChange={props.handleChange2}
                                        />
                                        <p className = "alert" style = {props.alert2 ? {color:'blue'} : null}>{props.alert || props.alert2}</p>
                                        <button className = 'loginButton' onClick={props.handleReset}>Continuați</button>
                                    </div>
                                
                                :
                                    <div style = {{height: '20rem'}} className = "loginForm">
                                        <h4 className = "resetH4">Vã rugãm sã resetați parola prin link-ul primit în email.</h4>
                                        <h4>Mulțumim!</h4>
                                    </div>
                                }
                                </div>
                                }
                                {props.toggle2?
                                 <p className = 'cont'>Ai uitat parola? <span className = 'link' onClick={props.editToggler2}>Reseteazã</span></p>
                                :
                                 <p className = 'cont'>Ți-ai amintit parola? <span className = 'link' onClick={props.editToggler2}>Login</span></p>
                                }
                            </div>
                   
                            :     

                            <div className='loginForm'>
                                    <div className = "loginWrap">
                                        <div className = "loginLogo"></div>
                                        <p className = 'cont'>Aveți deja cont? <span className = 'link' onClick={props.editToggler}>Login</span></p>
                                    </div>
                                {props.toggle3 === 'success' ?

                                <div style = {{height: '300pt'}}>
                                    <h4>Contul dumneavoastrã a fost creat!</h4>
                                    <CheckAnimation/>
                                    <h4>Vã rugãm sã activați contul prin link-ul primit în email.</h4>
                                    <h4>Mulțumim!</h4>
                                </div>
                                :
                                <div className = "loginForm">
                                    <h4> Creeazã cont nou:</h4>
                                    
                                    <LoginSearch/>
                                    
                                    <input
                                        className = "login1"
                                        type='text'
                                        name='pharmaCode'
                                        placeholder='cod'
                                        value={props.pharmaCode}
                                        onChange={props.handleChange2}
                                    />

                                    <input
                                        className = "login1"
                                        type='text'
                                        name='username'
                                        placeholder='Adresa e-mail'
                                        value={props.username}
                                        onChange={props.handleChange2}
                                    />

                                    <input
                                        className = "login1"
                                        type="password"
                                        name='password'
                                        placeholder='alege parola'
                                        maxLength="8"
                                        value={props.password}
                                        onChange={props.handleChange2}
                                    />
                                
                                    <input
                                        className = "login1"
                                        type="password"
                                        name='password2'
                                        placeholder='repetã parola'
                                        maxLength="8"
                                        value={props.password2}
                                        onChange={props.handleChange2}
                                    />
                                    <p className = "alert" style = {props.alert2 ? {color:'blue'} : null}>{props.alert || props.alert2}</p>
                                    <button className = 'loginButton'  onClick={props.handleSignup}>Înregistrare</button>
                                </div>
                            }
                            </div>
                    }
                </div>
            </div>
                
           
        )
    
}

export default withPharma(PharmaLogin)
