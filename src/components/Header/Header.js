/* eslint-disable jsx-a11y/alt-text */
import './Header.css'
import tmdb from './tmdb.svg'

const Header = () => {
    return (
        <span onClick={() => window.scroll(0, 0)} className="logo">
            <img src={tmdb} width="200" />
        </span>
    )
}

export default Header
