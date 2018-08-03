import starConfig from './config';

const color = function (msg, name) {
    console.log('%c--------log开始--------', 'color:yellow;font-size:16px');
    if (name) {
        console.log(`%c名字: ${name}`, 'color:red;font-size:16px;font-weight:bold');
    }
    console.log(`%c${msg}`, 'color:red;font-size:16px;font-weight:bold');
};
/**
 * @param {打印的主体} obj 
 * @param {对象的字符串} explain 
 * 1 打印字符串
 * 2 打印对象
 * 3 判断类型
 */
const log = function (obj, explain) {
    if (!starConfig.log) return;//配置开关
    let msg;
    if (typeof obj === 'undefined') {
        msg = '打印的值为：undefined ,请检查!';
        return color(msg);
    }
    if (typeof obj === 'object') {
        if (Object.is(null, obj)) {
            msg = '打印的值为：null ,请检查!';
            return color(msg);
        }
        try {
            msg = JSON.stringify(obj);
        } catch (error) {
            console.log('%o', obj);
            msg = '数据不是JSON格式,已经单独打印!';
        }
        return color(msg, explain);
    }
    if (typeof obj === 'function') {
        return color(`函数：${obj}`, obj.name);
    }
    if (typeof obj === 'number') {
        msg = `打印的值为数字：${obj} !`;
        return color(msg);
    }
    if (typeof obj === 'string') {
        msg = `打印的值为字符串：${obj} !`;
        return color(msg);
    }
};
export default log;