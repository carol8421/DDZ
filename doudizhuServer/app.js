const socket = require("socket.io");
const app = socket(3000);
const myDB = require("./db");
const defines = require("./defines");
const gameController = require("./game/game_control")
//数据库配置
myDB.connect({
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "star1314",
    "database": "DDZ"
});
app.on("connection", (socket) => {
    socket.emit("connection", "connection success");
    socket.on("notify", (notifydata) => {
        console.log("notify==================>", JSON.stringify(notifydata), "==================>\n");
        let _n_data = notifydata.data
        let _callBackIndex = notifydata.callBackIndex
        switch (notifydata.type) {
            case "wx_login":
                myDB.getPlayerInfoWithUniqueID(notifydata.data.uniqueID, (err, data) => {
                    if (err) {
                        console.log(err);
                        return
                    }
                    if (data.length == 0) {
                        myDB.createPlayerInfoWithAccountID(_n_data.uniqueID, _n_data.accountID, _n_data.nickName, defines.default.goldCount, _n_data.avataUrl)
                        gameController.createPlayer(
                            { "unique_id": _n_data.uniqueID, "account_id": _n_data.accountID, "nick_name": _n_data.nickName, "gold_count": defines.default.goldCount, "avatar_url": _n_data.avataUrl }, socket, _callBackIndex
                        )
                    } else {
                        gameController.createPlayer(data[0], socket, _callBackIndex)
                    }
                })
                break;

            default:
                break;
        }
    });
});