import React, {Component} from 'react'




class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            toggle: true,
            
        }
}


render(){
    return(
        <div className = "home">
            <h1 className = 'h2'>Cristian Lazar <br/>  Telefon: 0773853041</h1>
            
        </div>
    )
}
}

export default Home