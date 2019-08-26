import React from 'react'
import { Link } from 'react-router-dom'
import {withPharma} from './PharmaProvider'


const Navbar = (props) => {
    return (
        <div className="navbar">
            <Link onClick = {() => props.reloadRender2()} to="/">Cautã</Link>
            <Link to="/about">Despre</Link>
            <div className = "img1"></div>
            <Link to="/contact">Contact</Link>
            <Link onClick = {() => props.reloadRender3()} to = "/pharma">Login</Link>
        </div>
    )
}

export default withPharma(Navbar)