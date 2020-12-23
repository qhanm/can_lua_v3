const GetDateCurrent = () => {
    let date = new Date();

    let day = date.getDate();
    if(day < 10){
        day = '0' + day;
    }

    let month = date.getMonth();
    if(month < 10){
        month = '0' + month;
    }

    return date.getFullYear() + '-' + month + '-' + day;
}

const GetFullDateCurrent = () => {
    let date = new Date();

    let day = date.getDate();
    if(day < 10){
        day = '0' + day;
    }

    let month = date.getMonth();
    if(month < 10){
        month = '0' + month;
    }

    let minute = date.getMinutes();
    if(minute < 10){
        minute = '0' + minute;
    }

    return date.getHours() + 'h:' + minute + "' " + day + '-' + month + '-' + date.getFullYear();
}

const formatCurrency = (n, currency) => {
    return currency + n.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
}


const Guid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    }) + '-' + (new Date()).getTime();
}

const Guid1 = (prefix) => {
    return prefix + '_' + (new Date().getTime());
}

const ConvertStringToInt = (value) => {
    let result = 0;
    if(isNaN(value) || value === '' || value === undefined || value === null || value === false){
        result = 0;
    }else {
        result = value;
    }

    if(isNaN(parseInt(result))){
        result = 0
    }

    return result;
}


const Helpers = {
    GetDateCurrent: GetDateCurrent,
    Guid: Guid,
    Guid1: Guid1,
    GetFullDateCurrent: GetFullDateCurrent,
    ConvertStringToInt: ConvertStringToInt,
    formatCurrency: formatCurrency,
}

export default Helpers;
