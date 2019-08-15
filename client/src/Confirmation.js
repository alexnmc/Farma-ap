import React, {Component} from 'react'
//import Axios from 'axios'

class Confirmation extends Component{
       constructor(props){
           super(props)
           this.state = {
               
           }
        }




render(){
     return(
        <div className = "contact">
            <button  onClick = {() => this.props.deleteMessage()}style = {{margin: 'auto'}}>Mesaj reazolvat?</button>
        </div>
     )
 }

}


export default Confirmation