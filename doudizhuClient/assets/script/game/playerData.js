const getRandomStr = function (count) {
    let str = ``
    for (let i = 0; i < count; i++) {
        str += Math.floor(Math.random() * 10)
    }
    return str
}

const playerData = function () {
    let that = {}
    that.uniqueID = "u" + getRandomStr(8)
    that.accountID = "a" + getRandomStr(8)
    that.nickName = "伽蓝" + getRandomStr(2)
    that.avataUrl = "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1665110666,1033370706&fm=27&gp=0.jpg"
    return that
}
export default playerData