cc.Class({
    extends: cc.Component,

    properties: {
        roomID: cc.Node,
    },
    start() {
        this.roomNumbers = this.roomID.children
        this.removeStr()
    },
    onButtonclick(event, res) {
        switch (res) {
            case "close":
                cc.s.UILoader.destroy(this.node)
                break;
            case "back":
                this.inputStr = this.inputStr.substr(0, this.inputStr.length - 1);
                this.addStr(this.inputStr)
                break;
            case "remove":
                this.removeStr()
                break;
            default:
                if (this.inputStr.length >= 6) {
                    cc.s.log("房间iD输入已满!")
                    return
                }
                this.inputStr += res
                this.addStr(this.inputStr)
                break;
        }
    },

    addStr(str) {
        for (let i = 0; i < this.roomNumbers.length; i++) {
            this.roomNumbers[i].getComponent(cc.Label).string = str.slice(i, i + 1)
        }
    },
    removeStr() {
        this.inputStr = ""
        for (let i = 0; i < this.roomNumbers.length; i++) {
            this.roomNumbers[i].getComponent(cc.Label).string = ""
        }
    }
    // update (dt) {},
});
