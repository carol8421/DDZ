/***
 * console.assert();对输入的表达式进行断言，只有表达式为false时，才输出相应的信息到控制台
 * console.assert(false,"输出！")
 * 
 * console.count(); 统计代码被执行的次数
 * console.count("次数:")//次数:1;
 * 
 * console.group和console.groupEnd 输出一组信息的开头和输出结束一组输出信息
 * 
 * console.time和console.timeEnd 计时开始和计时结束
 * 
 * console.profile和console.profileEnd 配合一起使用来查看CPU使用相关信息
 * 
 * console.timeLine和console.timeLineEnd  配合一起记录一段时间轴
 * 
 * console.trace() 堆栈跟踪相关的调试
 *  foo();
        function foo() {
        function bar() {
            console.trace();
        }
        bar();
    }
 * 
 * throw Error("打印的值为：undefined ,请检查!"); throw 抛出的异常 会终止程序运行!
 */
import starConfig from "./config";
/**
 * JS 7种数据类型：Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）{Array Function Set Map} 、Symbol唯一值
 * @param {any} obj 打印主体 任意类型 
 * @param {string} explain 辅助说明文字
 */
const log = function (obj, explain) {
    if (!starConfig.log) return;//配置开关
    let type = getType(obj);
    if (type == "undefined" || type == "null") {
        console.error(`%c类型：undefined OR null,请检查!`, "color:red;font-size:16px;font-weight:bold");
        return;
    }
    if (explain) {
        console.group(`%c${explain}`, "color:yellow;font-size:16px");
    } else {
        // console.group("%c Log Start ===>", "color:yellow;font-size:16px");
        console.group();
    }
    if (type == "number" || type == "string" || type == "boolean") {
        console.warn(`%c类型: ${type} 值为: ${obj}`, "color:red;font-size:16px;font-weight:bold");
    } else {
        console.info(`%c类型: ${type} ↓↓↓`, "color:red;font-size:16px;font-weight:bold");
        try {
            if (typeof obj == "function") {
                console.warn(`%o`, obj);
            } else {
                console.warn(JSON.stringify(obj));
            }
        } catch (error) {
            console.warn(`%o`, obj);
        }
    }
    console.groupEnd();
};
const getType = function (obj) {
    var type = Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1].toLowerCase();
    if (type === "string" && typeof obj === "object") return "object"; // Let "new String("")" return "object"
    if (obj === null) return "null"; // PhantomJS has type "DOMWindow" for null
    if (obj === undefined) return "undefined"; // PhantomJS has type "DOMWindow" for undefined
    return type;
};
export default log;

