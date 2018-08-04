import main from "./ToolBox/main";
cc.Class({
    extends: cc.Component,

    properties: {

    },
    start() {
        let socket = io("http://localhost:3000");
        socket.on("welcome", (data) => {
            main.log(data, "welcome");
        });
    },
});
