import React from 'react';

let Icon = React.createClass({
    
    displayName: 'Icon',
    
    render(){
        return(
            <i className={"fa fa-" + this.props.name}></i>
        );
    }
});

let SideMenu = React.createClass({
    
    displayName: 'SideMenu',
    
    render(){
        return(
            <ul>
                <li className="menu-item-header">
                    <a>
                        <span className="menu-item-icon"><Icon name="graduation-cap"/></span>
                        <span className="menu-item-text">Academy</span>
                    </a>
                </li>
                <li>
                    <a>
                        <span className="menu-item-icon"><Icon name="graduation-cap"/></span>
                        <span className="menu-item-text">Perfil</span>
                    </a>
                </li>
                <li>
                    <a>
                        <span className="menu-item-icon"><Icon name="graduation-cap"/></span>
                        <span className="menu-item-text">Contacto</span>
                    </a>
                </li>
            </ul>
        );
    }
});

let $sideMenu = document.getElementById('sideMenu');
if($sideMenu){
    React.render(<SideMenu/>, $sideMenu);
}