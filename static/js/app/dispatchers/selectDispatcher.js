var $ = require('jquery');

export default {
    universities(){
        return new Promise((resolve, reject) => {
            $.get('/universities')
            .done((data) => {
                resolve(data || []);
            })
            .fail(() => {
                reject();
            });
        });
    },
    faculties(university){
        return new Promise((resolve, reject) => {
            $.get('/faculties/'+university)
            .done((data) => {
                resolve(data || []);
            })
            .fail(() => {
                reject();
            });
        });
    },
    departments(faculty){
        return new Promise((resolve, reject) => {
            $.get('/departments/'+faculty)
            .done((data) => {
                resolve(data || []);
            })
            .fail(() => {
                reject();
            });
        });
    }
};
