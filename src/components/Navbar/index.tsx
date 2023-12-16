import { useState } from 'react'
import { NavLink as Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { BASE_PATH, ROUTE_PATH } from '../../config/router'
import { useRootStore } from '../../hooks/useStore'
import { Menu, MenuItem, Button } from '@mui/material'
import LanguageIcon from '@mui/icons-material/Language';
import { BLOG_URL } from '../../utils/const'
import "./index.scss"


const BASE_CLA = "navbar"
const Navbar = observer(() => {
    const [anchorEl, setAnchorEl] = useState<null|HTMLElement>(null)
    const { languageStore, userInfoStore } = useRootStore()
    const { languageConfig, selectedLanguage, getTranslation } = languageStore
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const goToContact = () => {

    }
    const languageOpen = Boolean(anchorEl)
    
    return (
        <nav className={"navbar"}>
            <section className='navbar-left'>
                <img className='navbar-avatar' src={`${BASE_PATH}/image/logo.png`} />
                <span className='navbar-user-name'>{userInfoStore.userInfo.userName}</span>
            </section>
            <ul className={`${BASE_CLA}-list`}>
                <li className={`${BASE_CLA}-item`}>
                    <Link to={ROUTE_PATH.resume} className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}>{languageStore.getTranslation("nav_resume")}</Link>
                </li>
                <li className={`${BASE_CLA}-item`}>
                    <Link to={ROUTE_PATH.portfolio} className={({ isActive }) => "navbar-link" + (isActive ? " active" : "")}>{languageStore.getTranslation("nav_portfolio")}</Link>
                </li>
                <li className={`${BASE_CLA}-item`}>
                    <a href={BLOG_URL} className="navbar-link" target="_blank">{languageStore.getTranslation("nav_blog")}</a>
                </li>
                <li>
                    <Button variant="outlined" onClick={goToContact}>{getTranslation("nav_contact")}</Button>
                </li>
            </ul>
            <section className='navbar-right'>
                <Button
                    id="basic-button"
                    aria-controls={languageOpen ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={languageOpen ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <LanguageIcon />
                    <span>{selectedLanguage.name}</span>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={languageOpen}
                    onClose={handleClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    {Object.keys(languageConfig).map(key => (
                        <MenuItem key={key} onClick={() => languageStore.toggleLanguage(languageConfig[key].code)}>{languageConfig[key].name}</MenuItem>
                    ))}
                </Menu>
            </section>
        </nav>
    )
})

export default Navbar