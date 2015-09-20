window.ACADEMY = window.ACADEMY || {};
window.ACADEMY.models = window.ACADEMY.models || {};
window.ACADEMY.collections = window.ACADEMY.collections || {};

/* Objects prototype extensions */
if(!String.prototype.trim){
    (function(){
        String.prototype.trim = function(){
            return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,'');
        };
    })();
}

/* Dependencies configurations */
var moment = require('moment');
require('moment/locale/es');
