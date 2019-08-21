import React from 'react'


const Footer = () => {
    return (
        <div className="footer" style = {{width:'100vw' , display:'flex', alignItems: 'center', justifyContent: 'center' , marginTop:'-18pt', position: 'absolute'}}>
            <p className = 'bottomP' style = {{margin:'auto', color: 'grey' , fontFamily: 'arial', fontSize: '10.5pt', fontWeight: '100'}}>© 2019 Farma-up. All Rights Reserved.</p>
        </div>
    )
}

export default Footer
