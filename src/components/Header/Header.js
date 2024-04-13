import './Header.css';

import logo from '../../assets/Ellipse 1.png'

function Header( {activeNavItem} ){
    return(
        <div className="header w-100 d-flex align-items-center">
            <img src={logo} alt="Logo" width="134" height="134"></img>
            <h2 className="text-white justify-content-start">Search For Recipes</h2>
            <nav className="d-flex w-100 justify-content-end text-white gap-4">
                <a className={`text-white ${activeNavItem === 'search' ? 'active' : 'inactive'}`} href="/">Search</a>
                <a className={`text-white ${activeNavItem === 'myRecipes' ? 'active' : 'inactive'}`} href="/">My Recipes</a>
                <a className={`text-white ${activeNavItem === 'popular' ? 'active' : 'inactive'}`} href="/">Popular</a>
            </nav>
        </div>
    )
}

export default Header;
