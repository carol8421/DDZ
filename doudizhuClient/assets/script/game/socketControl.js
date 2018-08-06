import defines from "./defines";
const socketControl = function () {
    let that = {}
    let _callBackMap = new Map()
    let _callBackIndex = 0
    //==========================>
    let _socket = io(defines.serverUrl)
    _socket.on("notify", (resultData) => {
        cc.s.log(JSON.stringify(resultData), "<==========服务器返回的参数信息！")
        let cbIndex = resultData.callBackIndex
        let cb = _callBackMap.get(cbIndex)
        cc.s.log(cb, "<==========对应的回调函数")
        if (cb) {
            cb(null, resultData.data)
        }
    })
    that.init = function () {
    }
    let _selfEmit = function (mesType, data, callBackIndex) {
        _socket.emit("notify", { type: mesType, data, callBackIndex })
    }
    let _requset = function (mesType, data, cb) {
        _callBackMap.set(_callBackIndex, cb)
        _selfEmit(mesType, data, _callBackIndex)
        _callBackIndex++
    }

    //==========================>
    that.r_wxLogin = function (data, cb) {
        _requset("wx_login", data, cb)
    }
    that.r_create_room = function (data, cb) {
        _requset("r_create_room", data, cb)
    }
    return that;
}
export default socketControl