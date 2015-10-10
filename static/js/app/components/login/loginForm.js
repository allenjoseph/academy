var React = require('react/addons'),
    ButtonIn = require('../commons/buttonIn'),
    LoginActions = require('../../actions/loginActions'),
    utilities = require('../../commons/utilities'),
    ENTER_KEY_CODE = 13,
    EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    LOGIN_MESSAGE = 'Si no tienes un nombre de usuario, escribe el que quieres tener y presiona continuar.',
    REGISTER_MESSAGE = 'Completa el formulario y presiona continuar para ingresar.';

var LoginForm = React.createClass({

    displayName: 'LoginForm',

    getInitialState(){
        return {
            username: '',
            email: '',
            password: '',
            message: LOGIN_MESSAGE,
            showRegister: false,
            showPassword: false,
            validUser: true,
            validEmail: false,
            validPassword: true,
            loading: false
        }
    },

    changeUsername(e){
        var username = e.target.value.replace(/ /g, '');

        this.setState(React.addons.update(this.state, {
            username: {$set : username}
        }));
    },

    changeEmail(e){
        var email = e.target.value.replace(/ /g, '');

        this.setState(React.addons.update(this.state, {
            email: {$set: email},
            validEmail: {$set: EMAIL_REGEX.test(email)}
        }));
    },

    changePassword(e){
        this.setState(React.addons.update(this.state, {
            password: {$set : e.target.value}
        }));
    },

    onKeyPressUser(e){
        if(e.which === ENTER_KEY_CODE){
            e.preventDefault();
            this.validateUsername();
        }
    },

    validateUsername(){
        this.setState(React.addons.update(this.state, {
            loading: {$set: true}
        }));
        var self = this;
        LoginActions.search(this.state.username)
        .then((existUsername) => {
            if(existUsername){
                self.setState(React.addons.update(self.state, {
                    showPassword: {$set: true},
                    loading: {$set: false}
                }));
            } else {
                self.setState(React.addons.update(self.state, {
                    showRegister: {$set: true},
                    message: {$set: REGISTER_MESSAGE},
                    loading: {$set: false}
                }));
            }
        }, () => {
            utilities.showAlert('error', 'Something goes wrong! :/');
            this.cancelRegister();
        });
    },

    validatePassword(){
        this.setState(React.addons.update(this.state, {
            loading: {$set: true}
        }));
        LoginActions.login({
            user: this.state.username,
            password: this.state.password
        })
        .then((userValid) => {
            if(userValid){
                window.location.href = '/';
            }else{
                this.setState(React.addons.update(this.state, {
                    loading: {$set: false}
                }));
            }
        });
    },

    cancelRegister(){
        this.setState(this.getInitialState());
    },

    render(){
        var buttonUser, buttonEmail, buttonPassword;
        if(this.state.showRegister){
            buttonUser = <button type="button" className="button tiny in text" disabled={!this.state.username}>OK</button>
        }
        return(
            <form className="centered">
                <fieldset disabled={this.state.loading}>
                <div className="row">
                    <div className="medium-6 medium-centered columns">
                        <h1 className="mte"><a>{ !this.state.showRegister ? 'Academy' : 'Academy Register' }</a></h1>
                    </div>
                </div>
                <div className="row">
                    <div className="medium-6 medium-centered columns">
                        <div className="button-inner">
                            <input type="text" className="input" placeholder="Usuario"
                            value={this.state.username}
                            onKeyPress={this.onKeyPressUser}
                            onChange={this.changeUsername}/>

                            <ButtonIn
                                type={this.state.showRegister || this.state.showPassword ? 'text' : ''}
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
                { !this.state.showRegister && !this.state.showPassword ? '' :
                    <div className="row">
                        <div className="medium-6 medium-centered columns">
                            <div className="button-inner">
                                <input type="password" className="input" placeholder="Contraseña"
                                value={this.state.password}
                                onChange={this.changePassword}/>
                                <ButtonIn
                                    label={ this.state.showPassword ? 'ingresar' : 'continuar'}
                                    valid={this.state.validPassword}
                                    model={this.state.password}
                                    onClick={this.validatePassword}/>
                            </div>
                        </div>
                    </div>
                }
                <div className="row">
                    <div className="medium-6 medium-centered columns">
                        <span>{this.state.message}</span>
                        { this.state.showRegister ? <span className="pull-right"><a onClick={this.cancelRegister}>Cancelar</a></span> : '' }
                    </div>
                </div>
                </fieldset>
            </form>
        );
    }
});

var $loginForm = document.getElementById('loginForm');
if($loginForm){
    React.render(<LoginForm/>, $loginForm);
}
