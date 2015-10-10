var $ = require('jquery');

export default {
    search(text){
        return new Promise((resolve, reject) => {
            $.post('/username', {username: text})
            .done((data) => {
                resolve(data.exist);
            })
            .fail(() => {
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
