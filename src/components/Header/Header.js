import './Header.css';

import logo from '../../assets/Ellipse 1.png'

function Header( {activeNavItem, headerText} ){
    return(
        <div className="header w-100 d-flex align-items-center">
            <img src={logo} alt="Logo"></img>
            <h2 className="text-white justify-content-start">{headerText}</h2>
            <nav className="d-flex w-100 justify-content-end text-white gap-4">
                <a className={`text-white ${activeNavItem === 'search' ? 'active' : 'inactive'}`} href="/">Search</a>
                <a className={`text-white ${activeNavItem === 'myRecipes' ? 'active' : 'inactive'}`} href="/myRecipes">My Recipes</a>
                <a className={`text-white ${activeNavItem === 'popular' ? 'active' : 'inactive'}`} href="/popular">Popular</a>
            </nav>
        </div>
    )
}

export default Header;
