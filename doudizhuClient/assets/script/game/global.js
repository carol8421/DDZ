import socketControl from "./socketControl"
import playerData from "./playerData";
const global = {}

global.socket = socketControl();
global.playerData = playerData()
export default global;
