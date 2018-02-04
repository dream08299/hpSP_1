const Info = {};

function set(name,value){
    Info[name] = value;
    return Info;
}

function get(name){
    return Info[name] || null;
}

module.exports = {
    set : set,
    get : get
};
