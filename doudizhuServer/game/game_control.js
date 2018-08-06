const Player = require("./player")
const Room = require("./room")
const _playerList = []
const _roomList = []
// class gameControl {
//     constructor(params) {
//         let that = {};
//         this.createPlayer = function (data, socket, callBackIndex) {
//             let player = player(data, socket, callBackIndex)
//             _playerList.push(player)
//         };
//         return that;
//     }
// }
// export default gameControl

exports.createPlayer = function (data, socket, callBackIndex) {
    let player = Player(data, socket, callBackIndex, this);
    _playerList.push(player);
};

exports.createRoom = function (data, player, cb) {
    let room = Room(data, player)
    console.log(JSON.stringify(room));

    _roomList.push(room)
    if (cb) {
        cb(null, { roomID: room.roomID })
    }
};