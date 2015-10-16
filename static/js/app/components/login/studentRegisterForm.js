var React = require('react/addons'),
    $ = require('jquery'),
    SelectActions = require('../../actions/selectActions'),
    utilities = require('../../commons/utilities'),
    mixins = require('../commons/mixins'),
    ButtonIn = require('../commons/buttonIn'),
    DEPARTMENT_MESSAGE = 'Sólo hace falta tus datos de estudiante para ingresar.';

export default React.createClass({

    displayName: 'StudentRegisterForm',

    mixins:[mixins.focusMixin],

    elementToFocus: 'nameInput',

    getInitialState(){
        return {
            name: '',
            lastname: '',
            department: '',
            faculty: '',
            university: '',
            message: DEPARTMENT_MESSAGE,
            universities: [],
            faculties: [],
            departments: []
        }
    },

    componentDidMount(){

        SelectActions.universities()
        .then((data) => {

            if(data.length && this.isMounted()){
                this.setState(React.addons.update(this.state, {
                    universities: {$set: data}
                }));
            }

        }.bind(this),

        (msg) => {
            utilities.showAlert('error', msg || 'Something goes wrong! :/');
        });
    },

    changeName(e){
        var name = e.target.value.replace(/ /g, '');

        this.setState(React.addons.update(this.state, {
            name: {$set: name}
        }));
    },

    changeLastname(e){
        var lastname = e.target.value.replace(/ /g, '');

        this.setState(React.addons.update(this.state, {
            lastname: {$set: lastname}
        }));
    },

    cancelRegister(){
        this.setState(this.getInitialState());
        this.props.cancelRegister();
    },

    loadSelect(type){
        return this.state[type].map((elem) => {
            return (
                <option key={elem.id} value={elem.id}>{elem.description}</option>
            );
        });
    },

    changeUniversity(e){
        var university = e.target.value;

        if(university){
            SelectActions.faculties(university)
            .then((data) => {

                this.setState(React.addons.update(this.state, {
                    university: {$set: university},
                    faculty: {$set: ''},
                    faculties: {$set: data},
                    department: {$set: ''},
                    departments: {$set: []}
                }));

            }.bind(this),

            (msg) => {
                utilities.showAlert('error', msg || 'Something goes wrong! :/');
            });
        }else{
            this.setState(React.addons.update(this.state, {
                university: {$set: university},
                faculty: {$set: ''},
                faculties: {$set: []},
                department: {$set: ''},
                departments: {$set: []}
            }));
        }
    },

    changeFaculty(e){
        var faculty = e.target.value;

        if(faculty){
            SelectActions.departments(faculty)
            .then((data) => {

                this.setState(React.addons.update(this.state, {
                    faculty: {$set: faculty},
                    department: {$set: ''},
                    departments: {$set: data}
                }));

            }.bind(this),

            (msg) => {
                utilities.showAlert('error', msg || 'Something goes wrong! :/');
            });
        }else{
            this.setState(React.addons.update(this.state, {
                faculty: {$set: faculty},
                department: {$set: ''},
                departments: {$set: []}
            }));
        }
    },

    changeDepartment(e){
        this.setState(React.addons.update(this.state, {
            department: {$set : e.target.value}
        }));
    },

    registerUser(){
        var partialUser = {
            name: this.state.name,
            lastname: this.state.lastname,
            department: this.state.department,
            faculty: this.state.faculty,
            university: this.state.university
        }
        this.props.registerUser(partialUser);
    },

    render(){

        var selectFaculty, selectDepartment, buttonLogin, message;

        if(this.state.faculties.length){

            selectFaculty = <div className="row">
                                <div className="medium-6 medium-centered columns">
                                    <div className="button-inner">
                                        <select className="select"
                                        onChange={this.changeFaculty}>
                                            <option value="">Selecciona tu Facultad</option>
                                            { this.loadSelect('faculties') }
                                        </select>
                                    </div>
                                </div>
                            </div>;

        }

        if(this.state.departments.length){

            selectDepartment =  <div className="row">
                                    <div className="medium-6 medium-centered columns">
                                        <div className="button-inner">
                                            <select className="select"
                                            onChange={this.changeDepartment}>
                                                <option value="">Selecciona tu Especialidad</option>
                                                { this.loadSelect('departments') }
                                            </select>
                                        </div>
                                    </div>
                                </div>;

        }

        if((this.state.faculty && !this.state.departments.length) || this.state.department){

            buttonLogin = <button type="button"
                            className="button expand tiny"
                            onClick={this.registerUser}>Ingresar</button>;
        }else{

            message = <span>{this.state.message}</span>
        }

        return(
            <div>
                <div className="row">
                    <div className="medium-6 medium-centered columns">
                        <div className="button-inner">
                            <input type="text" className="input" placeholder="Name" ref="nameInput"
                            value={this.state.name}
                            onChange={this.changeName}/>

                            <ButtonIn
                                type={'text'}
                                valid={this.state.name}
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
                                valid={this.state.lastname}
                                model={this.state.lastname}/>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="medium-6 medium-centered columns">
                        <div className="button-inner">
                            <select className="select" onChange={this.changeUniversity}>
                                <option value="">Selecciona tu Universidad</option>
                                { this.loadSelect('universities') }
                            </select>
                        </div>
                    </div>
                </div>

                { selectFaculty }
                { selectDepartment}

                <div className="row">
                    <div className="medium-6 medium-centered columns">
                        { message }
                        { buttonLogin }
                        <span className="pull-right">
                            <a onClick={this.cancelRegister}>Cancelar</a>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});
