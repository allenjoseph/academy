var $ = require('jquery');

export default {
    search(text){
        return new Promise((resolve, reject) => {
            $.post('/login/username', {username: text})
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
            .done((data) => {
                resolve(data.token);
            })
            .fail(() => {
                reject();
            });
        });
    },
    login(data){
        return new Promise((resolve, reject) => {
            $.post('/login/validate', data)
            .done((data) => {
                resolve(data);
            })
            .fail(() => {
                reject();
            });
        });
    }
};
