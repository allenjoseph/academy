var selectDispatcher = require('../dispatchers/selectDispatcher');

export default {
    universities(){
        return selectDispatcher.universities();
    },
    faculties(university){
        return selectDispatcher.faculties(university);
    },
    departments(faculty){
        return selectDispatcher.departments(faculty);
    }
};
