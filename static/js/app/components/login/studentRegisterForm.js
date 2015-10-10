var React = require('react/addons'),
    ButtonIn = require('../commons/buttonIn'),
    DEPARTMENT_MESSAGE = 'Sólo hace falta tus datos de estudiante para ingresar.';

export default React.createClass({

    displayName: 'StudentRegisterForm',

    getInitialState(){
        return {
            name: '',
            lastname: '',
            department: '',
            message: DEPARTMENT_MESSAGE,
        }
    },

    changeName(e){
        var name = e.target.value.replace(/ /g, '');

        this.setState(React.addons.update(this.state, {
            name: {$set : name}
        }));
    },

    changeLastname(e){
        var lastname = e.target.value.replace(/ /g, '');

        this.setState(React.addons.update(this.state, {
            lastname: {$set: lastname}
        }));
    },

    changeDepartment(e){
        this.setState(React.addons.update(this.state, {
            department: {$set : e.target.value}
        }));
    },

    cancelRegister(){
        this.setState(this.getInitialState());
        this.props.cancelRegister();
    },

    render(){
        return(
            <div>
                <div className="row">
                    <div className="medium-6 medium-centered columns">
                        <div className="button-inner">
                            <input type="text" className="input" placeholder="Name"
                            value={this.state.name}
                            onChange={this.changeName}/>

                            <ButtonIn
                                type='text'
                                model={this.state.name} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="medium-6 medium-centered columns">
                        <div className="button-inner">
                            <input type="text" className="input" placeholder="Lastname"
                            value={this.state.lastname}
                            onChange={this.changeLastname}/>

                            <ButtonIn
                                type={'text'}
                                model={this.state.lastname}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="medium-6 medium-centered columns">
                        <div className="button-inner">
                            <input type="text" className="input" placeholder="Department"
                            value={this.state.department}
                            onChange={this.changeDepartment}/>

                            <ButtonIn
                                type={'text'}
                                model={this.state.department}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="medium-6 medium-centered columns">
                        <span>{this.state.message}</span>
                        <span className="pull-right">
                            <a onClick={this.cancelRegister}>Cancelar</a>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});
