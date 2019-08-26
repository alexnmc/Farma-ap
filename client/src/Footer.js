import React from 'react'


const Footer = () => {
    return (
        <div className ="footer">
            {document.documentElement.clientWidth > 1000 ? 
             <p className = 'bottomP' style = {{margin:'auto', color: 'grey' , fontFamily: 'arial', fontSize: '12px', fontWeight: '100'}}>© 2019 Farma-up. All Rights Reserved.</p>
             :
             <p className = 'bottomP' style = {{margin:'auto', color: 'grey' , fontFamily: 'arial', fontSize: '8pt', fontWeight: '100'}}>© 2019 Farma-up. All Rights Reserved.</p>
            }
        </div>
    )
}

export default Footer
