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
            <h1 className = 'h3'>Gãsiți în cel mai scurt timp medicamentul sau produsul farmaceutic care cãutați!</h1>
            <h1 className = 'h3'>Cum functioneazã ? </h1>
            <h1 className = 'h3'>Completați formularul de pe pagina Cautã si o sã fiți contactat direct de farmaciile locale care oferã produsul.</h1>
            <h1 className = 'h3'>Farmaciile din rețeaua noastrã așteaptã mesajul dumneavoastrã !</h1>
            <h1 className = 'h3'>Pentru informații despre parteneriat conactați: <br/><br/>Cristian Lazar <br/> Telefon: 0773853041</h1>
        </div>
    )
}
}

export default Home