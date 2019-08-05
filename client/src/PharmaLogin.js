import React from 'react'
import { withPharma } from './PharmaProvider'



const PharmaLogin = props=>  {
    
        return(
            <div className="admin">
                
                <div className = "loginContainer">
                    { props.toggle ?
                            <div  className='loginForm'>
                                <div className = "loginWrap">
                                    <div className = "loginLogo"></div>
                                    <p className = 'cont'>Alãturati-vã retelei noastre - <span className = 'link' onClick={props.editToggler}>Înregistrare</span></p>
                                </div>
                                { props.toggle2 ?
                                <div className = "loginForm">
                                    <h4>Intrare in cont:</h4>
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
                                        placeholder='Parola'
                                        value={props.password}
                                        onChange={props.handleChange2}
                                    />
                                    <button className = 'loginButton' onClick={props.handleLogin}>Autentificare</button>
                                </div>
                                
                                :
                                
                                <div>
                                {props.confirmed !== 'Confirmed' ?
                                    <div className = "loginForm">
                                        <h4 className = 'h4'>Introduceti adresa de email cu care ati creat contul:</h4>
                                        <input
                                            className = "login33"
                                            type='text'
                                            name='forgotEmail'
                                            placeholder='Email'
                                            value={props.forgotEmail}
                                            onChange={props.handleChange2}
                                        />
                                        <button className = 'loginButton' onClick={props.handleReset}>Continuati</button>
                                    </div>
                                
                                :

                                    <div className = "loginForm">
                                        <h4 className = "h4">Introduceți parola nouã:</h4>
                                        <input
                                            className = "login33"
                                            type="password"
                                            name='newPassword'
                                            placeholder='Parola nouã'
                                            value={props.newPassword}
                                            onChange={props.handleChange2}
                                        />
                                        <button className = 'loginButton' onClick={props.resetPassword}>Trimite</button>
                                    </div>
                                }
                                </div>
                                }
                                { props.toggle2?
                                 <p className = 'cont2'>Ai uitat parola? <span className = 'link' onClick={props.editToggler2}>Reseteazã</span></p>
                                :
                                 <p className = 'cont2'>Ți-ai amintit parola? <span className = 'link' onClick={props.editToggler2}>Login</span></p>
                                }
                            </div>
                   
                            :     

                            <div className='loginForm'>
                                    <div className = "loginWrap">
                                        <div className = "loginLogo"></div>
                                        <p className = 'cont'>Aveți deja cont? <span className = 'link' onClick={props.editToggler}>Login</span></p>
                                    </div>
                            <h4> Creeazã cont nou:</h4>
                        
                                <input
                                    className = "login1"
                                    type='text'
                                    name='pharmaCode'
                                    placeholder='cod'
                                    value={props.pharmaCode}
                                    onChange={props.handleChange2}
                                />

                                <select 
                                    required 
                                    className = 'login11'
                                    aria-required="true" 
                                    name='city4'
                                    value={props.city4}
                                    onChange={props.handleChange2}>
                                <option value = ''>oraș:</option>
                                {props.cities.map((city, index) => <option key={city} value={city} className = {index}>{city}</option>)}
                                </select>

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
                                    value={props.password}
                                    onChange={props.handleChange2}
                                />

                                <input
                                    className = "login1"
                                    type="password"
                                    name='password2'
                                    placeholder='repeta parola'
                                    value={props.password2}
                                    onChange={props.handleChange2}
                                />
                                <button className = 'loginButton'  onClick={props.handleSignup} >înregistare</button>
                            </div>
                            
                    }
                </div>
            </div>
                
           
        )
    
}

export default withPharma(PharmaLogin)
