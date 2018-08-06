import global from "../game/global"
cc.Class({
    extends: cc.Component,

    properties: {
        accountID: cc.Label,
        nickName: cc.Label,
        goldCount: cc.Label,
        headImg: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.nickName.string = cc.s.g.playerData.nickName
        this.accountID.string = cc.s.g.playerData.accountID
        this.goldCount.string = cc.s.g.playerData.gold
        cc.loader.load("https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1665110666,1033370706&fm=27&gp=0.jpg", (err, data) => {
            if (err) {
                cc.log(err)
            } else {
                cc.log("ssssssssssssssssssssssssssssssssssssssssss", data instanceof cc.Texture2D)
                this.picSize(this.headImg, data)
            }
        })
    },
    picSize(targe, res) {
        let oldWidth = targe.node.width;
        let oldHeight = targe.node.height;
        targe.spriteFrame = new cc.SpriteFrame(res)
        targe.node.scale = {
            x: oldWidth / targe.node.width,
            y: oldHeight / targe.node.height
        };
    },
    start() {

    },
    // cc.s.g.socket.r_create_room("", (err, data) => {
    //     if (err) {
    //         cc.s.log(err, "r_create_room err")
    //     } else {
    //         cc.s.log(JSON.stringify(data), "r_create_room suc")
    //     }
    // })
    onButtonClick(event, res) {
        switch (res) {
            case "create_room":
                cc.s.log("create_room")
                cc.s.UILoader.loadRes("prefab/createRoom", cc.Prefab, (data) => {
                    cc.s.UILoader.instantiate(data, this.node, () => {
                    });
                })
                break;
            case "join_room":
                cc.s.log("join_room")
                cc.s.UILoader.loadRes("prefab/joinRoom", cc.Prefab, (data) => {
                    cc.s.UILoader.instantiate(data, this.node, () => {
                    });
                })
                break;
            default:
                break;
        }
    },


    // update (dt) {},
});
