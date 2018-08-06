
/**
 * 
 * @param {any} data 
 * @param {object} socket 
 * @param {number} cbindex 
 */
module.exports = function (notifydata, socket, cbindex, gameControl) {
    let that = {}
    console.log("player=======================>", cbindex, "\n")
    // {"unique_id":"u95620011","account_id":"a44269576","nick_name":"伽蓝51","gold_count":99999,"avatar_url":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1665110666,1033370706&fm=27&gp=0.jpg"}
    //登录之后 创建或查询表中的数据 取出之后返回登录成功数据
    let _socket = socket
    that.nickName = notifydata.nick_name
    that.accountID = notifydata.account_id
    that.avatarUrl = notifydata.avatar_url
    that.gold = notifydata.gold_count

    const notify = function (type, data, callBackIndex) {
        _socket.emit("notify", { type, data, callBackIndex })
        console.log(`${type}=========>`, JSON.stringify({ type, data, callBackIndex }, "================>\n"));
    }
    notify("wx_login", { goldCount: that.gold }, cbindex)
    _socket.on("notify", (notifyData) => {
        let _type = notifyData.type
        let _callBackIndex = notifyData.callBackIndex
        switch (_type) {
            case "r_create_room":
                gameControl.createRoom("data", that, (err, suc) => {
                    console.log("err===============>", err, "suc=================>", suc);
                    if (err) {
                        notify("r_create_room", { err: err }, _callBackIndex)
                    } else {
                        notify("r_create_room", suc, _callBackIndex)
                    }
                })
                break;
            case "wx_login":
                break;
            default:
                break;
        }
    })
    return that
}