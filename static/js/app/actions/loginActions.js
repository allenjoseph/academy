var LoginDispatcher = require('../dispatchers/loginDispatcher');

export default {
    search(text){
        return LoginDispatcher.search(text);
    },
    login(obj){
        return LoginDispatcher.login(obj);
    }
};
