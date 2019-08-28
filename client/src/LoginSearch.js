import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'




class LoginSearch extends Component {
  constructor(props){
    super(props)
    this.state = {
      
    }
  }
 
render() {
   
    return (
        <div className = "searchIn2">
            <input type = "text" className = 'login11' list="mylist" placeholder = 'Alege orasul:'  value = {this.props.city4} onChange={this.props.handleChange4} required/>
                <datalist id="mylist" className = 'mylist' style = {{color:'red'}}>
                {this.props.cities.map((city, index) => <option key={city} value={city} className = {index}>{city}</option>)}
                </datalist>
           <div className = 'searchLogo' style = {{backgroundColor:'rgba(125, 225, 255, 0)', border: "10pt solid rgba(125, 225, 255, 0)"}}></div>
        </div>
     
    )
  }
}

export default withPharma(LoginSearch)
 