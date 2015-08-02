module.exports = {
    namespace: function(route){
        if( typeof route !== 'string'  || !route.length) return;

        var parts = route.split('.'),
            parent = window.ACADEMY;
        if (parts[0] === 'ACADEMY'){
            parts = parts.slice(1);
        }
        for (var i = 0, len = parts.length; i < len; i++) {
            if (typeof parent[parts[i]] === 'undefined'){
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    },
    timeFromNow: function(date){
        if(window.moment){
            return moment(date).fromNow();
        }
        return date;
    },
    largeDate: function(date){
        if(window.moment){
            return moment(date).format('LL');
        }
        return date;
    }

};
