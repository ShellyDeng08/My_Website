import { NavLink as Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import LanguageStore from '../../stores/languageStore'
import { ROUTE_PATH } from '../../config/router'

import "./index.scss"

const BASE_CLA = "navbar"
const Navbar = () => {
    return (
        <nav className={BASE_CLA}>
            <section>
                <span></span>
                <span></span>
            </section>
            <ul className={`${BASE_CLA}-list`}>
                <li className={`${BASE_CLA}-item`}>
                    <Link to={ROUTE_PATH.resume} className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}>Resume</Link>
                </li>
                <li className={`${BASE_CLA}-item`}>
                    <Link to={ROUTE_PATH.portfolio} className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}>Portfolio</Link>
                </li>
                <li className={`${BASE_CLA}-item`}>
                    <Link to={ROUTE_PATH.blog} className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}>Blog</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar