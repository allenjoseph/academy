var moment = require('moment');

module.exports = {
    timeFromNow: function(date){
        if(date){
            return moment(date).fromNow();
        }
        return '';
    },
    largeDate: function(date){
        if(date){
            return moment(date).format('LL');
        }
        return '';
    },
    day: function(date){
        if(date){
            return moment(date).format('DD');
        }
        return '';
    },
    largeMonth: function(date){
        if(date){
            return moment(date).format('MMM');
        }
        return '';
    }
};
