var LoginDispatcher = require('../dispatchers/loginDispatcher');

export default {
    search(text){
        return LoginDispatcher.search(text);
    },
    register(obj){
        return LoginDispatcher.register(obj);
    },
    login(obj){
        return LoginDispatcher.login(obj);
    }
};
