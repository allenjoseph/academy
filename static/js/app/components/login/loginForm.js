import {Row, Column} from '../commons/grid';
var React =  require('react/addons'),
    ButtonIn = require('../commons/buttonIn'),
    LoginActions = require('../../actions/loginActions'),
    utilities = require('../../commons/utilities'),
    UserRegisterForm = require('./userRegisterForm'),
    StudentRegisterForm = require('./studentRegisterForm'),
    LOGIN_MESSAGE = 'Si no tienes un nombre de usuario, escribe el que quieres tener y presiona continuar.';

var LoginForm = React.createClass({

    displayName: 'LoginForm',

    user: {},

    getInitialState(){
        this.user = {};
        return {
            message: LOGIN_MESSAGE,
            showDepartments: false,
            showRegister: false,
            loading: false
        }
    },

    showRegister(state){
        this.setState(React.addons.update(this.state, {
            showRegister: {$set : state}
        }));
    },

    showDepartments(partialUser){
        this.user = partialUser;
        this.setState(React.addons.update(this.state, {
            showDepartments: {$set : true},
            showRegister: {$set: false}
        }));
    },

    loading(state){
        this.setState(React.addons.update(this.state, {
            loading: {$set : state}
        }));
    },

    cancelRegister(){
        this.setState(this.getInitialState());
    },

    registerUser(partialUser){
        window.Object.assign(this.user, partialUser);

        LoginActions.register(this.user)
        .then((token)=>{

            window.location.href = '/' + token;

        }, (msg) => {

            utilities.showAlert('error', msg || 'Something goes wrong! :/');
            self.cancelRegister();
        });
    },

    render(){
        var message,
            title =  'Academy',
            registerForm = <UserRegisterForm
                            showRegister={this.showRegister}
                            showDepartments={this.showDepartments}
                            loading={this.loading}
                            cancelRegister={this.cancelRegister}/>;


        if(this.state.showRegister){
            title = 'Academy - Registro de usuario';

        }else if (this.state.showDepartments){

            title = 'Academy - Registro de estudiante';
            registerForm = <StudentRegisterForm
                            cancelRegister={this.cancelRegister}
                            registerUser={this.registerUser}/>

        }else{
            message =   <Row>
                            <Column styles="medium-6 medium-centered">
                                    <span>{this.state.message}</span>
                            </Column>
                        </Row>;
        }
        return(
            <div className="centered form-light">
                <fieldset disabled={this.state.loading}>

                    <Row>
                        <Column styles="medium-6 medium-centered">
                            <h1 className="mte"><a>{ title }</a></h1>
                        </Column>
                    </Row>

                    { registerForm }
                    { message }

                </fieldset>
            </div>
        );
    }
});

var $loginForm = document.getElementById('loginForm');
if($loginForm){
    React.render(<LoginForm/>, $loginForm);
}
