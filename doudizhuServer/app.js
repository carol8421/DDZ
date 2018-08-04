const socket = require("socket.io");
const app = socket(3000);
const myDB = require("./db");
//数据库配置
myDB.connect({
    "host": "127.0.0.1",
    "port": 3306,
    "user": "root",
    "password": "star1314",
    "database": "DDZ"
});
/**
 * 创建一个玩家列表                                                     
 */
myDB.createPlayerInfo("10000", "1000", "伽蓝", 500, "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1533403871612&di=5d3f18e0304651ea5f994c1e978662a7&imgtype=0&src=http%3A%2F%2Fuploads.oh100.com%2Fallimg%2F1707%2F125-1FH6102522.png");


/**
 * 获取玩家信息
 */
myDB.createPlayerInfoWithAccountID("100", (err, data) => {
    if (err) {
        console.log("err=====>", err);
    } else {
        console.log("data====>", data);

    }
});
app.on("connection", (socket) => {
    console.log("a user connection");
    socket.emit("connection", "connection success");
    socket.on("notify", (notifyData) => {
        console.log("notify" + JSON.stringify(notifyData));

    });
});