var $ = require('jquery');

export default {
    search(text){
        return new Promise((resolve, reject) => {
            $.post('/ExistUsername', {username: text})
            .done((exist) => {
                debugger;
                resolve(exist);
            })
            .fail(() => {
                debugger;
                reject();
            });
        });
    },
    login(data){
        return new Promise((resolve, reject) => {
           window.setTimeout(function(){
                resolve(data.password === 'test');
            }, 1000);
        });
    }
};
