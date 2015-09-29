var React = require('react/addons'),
    ButtonIn = require('../commons/buttonIn'),
    isValid = false;

var LoginForm = React.createClass({

    displayName: 'LoginForm',

    getInitialState(){
        return {
            username: '',
            email: '',
            password: '',
            message: 'Si no tienes un nombre de usuario, escribe el que quisieras tener y presiona continuar.',
            showRegister: false,
            validUser: true,
            validEmail: false,
            validPassword: true,
        }
    },

    changeUsername(e){
        this.setState(React.addons.update(this.state, {
            username: {$set : e.target.value.replace(/ /g, '')}
        }));
    },

    changeEmail(e){
        var email = e.target.value.replace(/ /g, '');

        this.setState(React.addons.update(this.state, {
            email: {$set: email},
            validEmail: {$set: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)}
        }));
    },

    changePassword(e){
        this.setState(React.addons.update(this.state, {
            password: {$set : e.target.value}
        }));
    },

    validateUsername(){
        if(isValid){
            window.location.href = "/";
        }else{
            this.setState(React.addons.update(this.state, {
                showRegister: {$set: true},
                message: {$set: 'Completa el formulario y presiona continuar para ingresar.'}
            }));
        }
    },

    render(){
        var buttonUser, buttonEmail, buttonPassword;
        if(this.state.showRegister){
            buttonUser = <button type="button" className="button tiny in text" disabled={!this.state.username}>OK</button>
        }
        return(
            <form className="centered">
                <div className="row">
                    <div className="medium-6 medium-centered columns">
                        <h1 className="mte"><a>Academy</a></h1>
                    </div>
                </div>
                <div className="row">
                    <div className="medium-6 medium-centered columns">
                        <div className="button-inner">
                            <input type="text" className="input" placeholder="Usuario"
                            value={this.state.username}
                            onChange={this.changeUsername}/>

                            <ButtonIn
                                type={this.state.showRegister ? 'text' : ''}
                                label='continuar'
                                valid={this.state.validUser}
                                model={this.state.username}
                                onClick={this.validateUsername}/>
                        </div>
                    </div>
                </div>
                { !this.state.showRegister ? '' :
                    <div className="row">
                        <div className="medium-6 medium-centered columns">
                            <div className="button-inner">
                                <input type="email" className="input" placeholder="Email"
                                value={this.state.email}
                                onChange={this.changeEmail}/>
                                <ButtonIn
                                    type={'text'}
                                    valid={this.state.validEmail}
                                    model={this.state.email}/>
                            </div>
                        </div>
                    </div>
                }
                { !this.state.showRegister ? '' :
                    <div className="row">
                        <div className="medium-6 medium-centered columns">
                            <div className="button-inner">
                                <input type="password" className="input" placeholder="Contraseña"
                                value={this.state.password}
                                onChange={this.changePassword}/>
                                <ButtonIn
                                    label='continuar'
                                    valid={this.state.validPassword}
                                    model={this.state.password}/>
                            </div>
                        </div>
                    </div>
                }
                <div className="row">
                    <div className="medium-6 medium-centered columns">
                        <small>{this.state.message}</small>
                    </div>
                </div>
            </form>
        );
    }
});

React.render(<LoginForm/>, document.getElementById('loginForm'));
