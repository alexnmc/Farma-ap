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
        <div className = "contact">
            <div className = "imgWrap2">
                <div  className = 'img2'></div>
                <h1 className = 'farmaup'>Farma - up</h1>
            </div>
            <h1 className = 'h3'> Gãsiti în cel mai scurt timp medicamentul sau produsul farmaceutic care cãutati !</h1>
            <h1 className = 'h3'>Cum functioneazã ? </h1>
            <h1 className = 'h3'> Completati formularul de pe pagina Cautã si o sã fiti contactat direct de farmaciile locale care oferã produsul.</h1>
            <h1 className = 'h3'> Farmaciile din reteaua noastrã asteaptã mesajul dumneavoastrã !</h1>
            <h1 className = 'h3'>Pentru informatii despre parteneriat conactati: <br/><br/>Cristian Lazar <br/> Telefon: 0773853041</h1>
        </div>
    )
}
}

export default Home