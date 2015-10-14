var React = require('react/addons'),
    ButtonIn = require('../commons/buttonIn'),
    LoginActions = require('../../actions/loginActions'),
    utilities = require('../../commons/utilities'),
    ENTER_KEY_CODE = 13,
    EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
    REGISTER_MESSAGE = 'Completa el formulario y presiona continuar para ingresar.';

export default React.createClass({

    displayName: 'UserRegisterForm',

    getInitialState(){
        return {
            username: '',
            email: '',
            password: '',
            showRegister: false,
            showPassword: false,
            validUser: false,
            validEmail: false,
            validPassword: false,
            message: REGISTER_MESSAGE,
        }
    },

    changeUsername(e){
        var username = e.target.value.replace(/ /g, '');

        this.setState(React.addons.update(this.state, {
            username: {$set: username},
            validUser: {$set: !!username}
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
            password: {$set : e.target.value},
            validPassword: {$set: e.target.value.length > 5}
        }));
    },

    onKeyPressUser(e){
        if(e.which === ENTER_KEY_CODE){
            e.preventDefault();

            if(this.state.validUser){
                this.validateUsername();
            }
        }
    },

    onKeyPressPassword(e){
        if(e.which === ENTER_KEY_CODE){
            e.preventDefault();

            if(this.state.validPassword){
                this.validatePassword();
            }
        }
    },

    validateUsername(){
        this.props.loading(true);
        var self = this;

        LoginActions.search(this.state.username)
        .then((existUsername) => {

            if(existUsername){

                self.setState(React.addons.update(self.state, {
                    showPassword: {$set: true},
                }));

            } else {

                self.setState(React.addons.update(self.state, {
                    showRegister: {$set: true},
                }));
                self.props.showRegister(true);
            }
            self.props.loading(false);

        }, (msg) => {

            utilities.showAlert('error', msg || 'Something goes wrong! :/');
            self.cancelRegister();
        });
    },

    validatePassword(){
        this.props.loading(true);
        var self = this;

        if(this.state.showRegister){

            var partialUser = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password
            };

            LoginActions.search(this.state.username)
            .then((existUsername) => {

                if(existUsername){
                    utilities.showAlert('error', msg || 'Revise sus datos ingresados y reintente.');
                } else {

                    self.props.showDepartments(partialUser);
                }

                self.props.loading(false);

            }, (msg) => {

                utilities.showAlert('error', msg || 'Something goes wrong! :/');
                self.cancelRegister();
            });
        }else{

            LoginActions.login({
                user: this.state.username,
                password: this.state.password
            })
            .then((token) => {

                if(token){
                    window.location.href = '/token';
                }else{
                    self.props.loading(false);
                    utilities.showAlert('warning', msg || 'Usuario o contraseña incorrecto! :S');
                }

            }, (msg) => {

                utilities.showAlert('error', msg || 'Something goes wrong! :/');
                self.cancelRegister();
            });
        }
    },

    cancelRegister(){
        this.setState(this.getInitialState());
        this.props.cancelRegister();
    },

    render(){
        var message, inputEmail, inputPassowrd;

        if(this.state.showRegister){

            message =   <div className="row">
                            <div className="medium-6 medium-centered columns">
                                <span>{this.state.message}</span>
                                <span className="pull-right">
                                    <a onClick={this.cancelRegister}>Cancelar</a>
                                </span>
                            </div>
                        </div>;

            inputEmail = <div className="row">
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
                        </div>;
        }

        if(this.state.showRegister || this.state.showPassword){

            inputPassowrd = <div className="row">
                                <div className="medium-6 medium-centered columns">
                                    <div className="button-inner">
                                        <input type="password" className="input" placeholder="Contraseña min 6 caracteres"
                                        value={this.state.password}
                                        onKeyPress={this.onKeyPressPassword}
                                        onChange={this.changePassword}/>

                                        <ButtonIn
                                            label={ this.state.showPassword ? 'ingresar' : 'continuar'}
                                            valid={this.state.validPassword}
                                            model={this.state.password}
                                            onClick={this.validatePassword}/>
                                    </div>
                                </div>
                            </div>;
        }

        return(
            <div>
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

                { inputEmail }
                { inputPassowrd }
                { message }

            </div>
        );
    }
});
