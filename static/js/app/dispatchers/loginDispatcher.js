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
    register(user){
        return new Promise((resolve, reject) => {
           $.post('/user', user)
            .done((data) => {
                if(data.success){
                    resolve(data);
                }else {
                    reject(data.message);
                }
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
