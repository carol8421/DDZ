const createRoomstr = function (count) {
    let str = ""
    for (let i = 0; i < count; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str
}
/**
 * 
 * @param {any} data 
 * @param {object} socket 
 * @param {number} cbindex 
 */
module.exports = function (spea, player) {
    let that = {}
    that.roomID = createRoomstr(6)
    let _hoseManager = player
    return that
}