import React, {Component} from 'react'
import {withPharma} from './PharmaProvider'





class Search extends Component {
  constructor(props){
    super(props)
    this.state = {
       cities: ['Oradea','Salonta','Marghita','Sacueni','Beius','Valea lui Mihai','Alesd','Stei','Vascau','Nucet'],
    }
  }
 
render() {
   
    return (
        <div className = "searchIn">
            <select 
              required 
              className = 'inputS'
              aria-required="true" 
              name='city2'
              value={this.props.city2}
              onChange={this.props.handleChange2}>
              <option value = ''>Alege orașul:</option>
              {this.state.cities.map((city, index) => <option key={city} value={city} className = {index}>{city}</option>)}
            </select>
        <div className = 'searchLogo'></div>
        </div>
     
    )
  }
}

export default withPharma(Search)
 