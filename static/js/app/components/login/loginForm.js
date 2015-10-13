var React =  require('react/addons'),
    ButtonIn = require('../commons/buttonIn'),
    LoginActions = require('../../actions/loginActions'),
    utilities = require('../../commons/utilities'),
    UserRegisterForm = require('./userRegisterForm'),
    StudentRegisterForm = require('./studentRegisterForm'),
    LOGIN_MESSAGE = 'Si no tienes un nombre de usuario, escribe el que quieres tener y presiona continuar.';

var LoginForm = React.createClass({

    displayName: 'LoginForm',

    getInitialState(){
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

    showDepartments(){
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
                            cancelRegister={this.cancelRegister}/>

        }else{
            message =   <div className="row">
                            <div className="medium-6 medium-centered columns">
                                <span>{this.state.message}</span>
                            </div>
                        </div>
        }
        return(
            <form className="centered form-light">
                <fieldset disabled={this.state.loading}>

                    <div className="row">
                        <div className="medium-6 medium-centered columns">
                            <h1 className="mte"><a>{ title }</a></h1>
                        </div>
                    </div>

                    { registerForm }
                    { message }

                </fieldset>
            </form>
        );
    }
});

var $loginForm = document.getElementById('loginForm');
if($loginForm){
    React.render(<LoginForm/>, $loginForm);
}
