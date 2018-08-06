import global from "./game/global"
import log from "./ToolBox/log"
import MemoryDetector from "./ToolBox/MemoryDetector"
import UILoader from "./ToolBox/UILoader"
import Config from "./ToolBox/config"
import Utils from "./ToolBox/Utils"
import Observer from "./ToolBox/Observer"

cc.Class({
    extends: cc.Component,
    properties: {
    },
    start() {
        cc.s = {}
        cc.s.log = log
        cc.s.Ob = Observer
        cc.s.MemoryDetector = MemoryDetector
        cc.s.UILoader = UILoader
        cc.s.Config = Config
        cc.s.Utils = Utils
        cc.s.g = global
        cc.s.MemoryDetector.showMemoryStatus();
        cc.s.UILoader.retainScene(this.node);
    },
    onButtonclick(event, res) {
        switch (res) {
            case "wx_login":
                cc.s.g.socket.r_wxLogin({
                    uniqueID: global.playerData.uniqueID,
                    accountID: global.playerData.accountID,
                    nickName: global.playerData.nickName,
                    avataUrl: global.playerData.avataUrl
                }, (err, data) => {
                    if (err) {
                        return
                    }
                    cc.s.g.playerData.gold = data.goldCount
                    cc.director.loadScene("home")
                })

                break

            default:
                break
        }
    },
})
