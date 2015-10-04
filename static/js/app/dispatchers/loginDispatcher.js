export default {
    search(text){
        return new Promise((resolve, reject) => {
            window.setTimeout(function(){
                resolve(text === 'test');
            }, 1000);
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
