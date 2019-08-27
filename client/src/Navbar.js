import React from 'react'
import { Link } from 'react-router-dom'
import {withPharma} from './PharmaProvider'


const Navbar = (props) => {
    return (
        <div className="navbar">
            <Link onClick = {() => props.reloadRender2()} to="/">Cautã</Link>
            <Link to="/about">Despre</Link>
            <Link to="/contact">Contact</Link>
            <Link className = 'b' onClick = {() => props.reloadRender3()} to = "/pharma">Cont</Link>
        </div>
    )
}

export default withPharma(Navbar)