const Utils = function () {
    let that = {};
    /**
     * 检测当前处于哪个环境
     */
    that.isnative = function () {
        let cvs = cc.sys.isNative;
        if (cvs) {
            if (cc.sys.platform === cc.sys.IPHONE) {
                return "iphone";
            }
            if (cc.sys.platform === cc.sys.IPAD) {
                return "ipad";
            }
            if (cc.sys.platform === cc.sys.ANDROID) {
                return "android";
            }
            return "native";
        }
        let web = cc.sys.isBrowser;
        if (web) return "browser";
        let mob = cc.sys.isMobile;
        if (mob) return "mobile";
    };
    that.fit = function () {
        let cvs = cc.find("Canvas");
        let ratio = that.toFixed(cvs.width / cvs.height, 2);
        if (ratio === 2.17 || ratio === 0.46) {
            cvs.fitHeight = true;
            cvs.fitWidth = true;
            return "showAll";
        }
    };

    /**
     * 返回小数点后几位数字
     * @param {number} num  数字 
     * @param {number} langth 返回小数点后几位
     */
    that.toFixed = function toFixed(num, langth) {
        if (typeof num != "number") {
            throw Error(`传入的不是数字类型!`);
        }
        return (num.toFixed(langth) - 0);
    };
    /**
     * 返回参数类型
     * @param {any} obj 任意类型数据 
     */
    that.getType = function (obj) {
        var type = Object.prototype.toString.call(obj).match(/^\[object (.*)\]$/)[1].toLowerCase();
        if (type === "string" && typeof obj === "object") return "object"; // Let "new String("")" return "object"
        if (obj === null) return "null"; // PhantomJS has type "DOMWindow" for null
        if (obj === undefined) return "undefined"; // PhantomJS has type "DOMWindow" for undefined
        return type;
    };
    return that;
};
export default Utils;