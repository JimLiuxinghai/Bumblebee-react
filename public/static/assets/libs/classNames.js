export  function classNames(style = {}, config = {}, ...otherClass) {
    let arr = [];
    
    for (let k in config) {
        if (config[k]) {
            arr.push(style[k]);
        }
    }
    let other = setClass(style, ...otherClass);
    return `${arr.join(' ')} ${other}` ;
}

export function setClass(style = {}, ...otherClass) {
    let arr = [];
    otherClass = otherClass || [];
    otherClass.forEach(k => {
        if (style[k]) {
            arr.push(style[k]);
        }
    })
    return arr.join(' ');
}