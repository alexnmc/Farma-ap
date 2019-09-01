import React from 'react'




const Logo = (props)=> {
    return (
        
        <div className = {props.className}>
          

            <div style  = {{
                            width: "17px",
                            height: "40px",
                            backgroundColor: "rgb(57, 189, 33)",
                            position:"absolute",
                            borderRadius:"20pt"
                            }}>
            </div>
            
            <div  style ={{
                            width: "40px",
                            height: "17px",
                            backgroundColor: "rgb(57, 189, 33)",
                            position: "relative",
                            marginLeft:"-12px",
                            marginTop:"12px",
                            borderRadius: "20pt"
                        }}
            >
            </div>

        </div>
    )
}

export default Logo