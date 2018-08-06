cc.Class({
    extends: cc.Component,

    properties: {

    },
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    start() {

    },
    onButtonclick(event, res) {
        if (res.indexOf("rate") !== -1) {
            cc.s.log(res)
            cc.s.g.socket.r_create_room({ rate: res }, (err, data) => {
                if (err) {
                    cc.s.log(err, "createRoom r_create_room")
                } else {
                    cc.s.log(data, "createRoom r_create_room")
                }
            })
        }
        cc.s.UILoader.destroy(this.node)
    },
    // update (dt) {},
});
