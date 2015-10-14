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
           $.post('/students', user)
            .done((token) => {
                resolve(token);
            })
            .fail(() => {
                reject();
            });
        });
    },
    login(data){
        return new Promise((resolve, reject) => {
            $.post('/login', data)
            .done((data) => {
                resolve(data.success);
            })
            .fail(() => {
                reject();
            });
        });
    }
};
