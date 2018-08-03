const Observer = {
    evnetMap: new Map(),
    //注册事件
    selfon(msgType, callback, target) {
        if (target === 'undefined') {
            console.log(`注册事件：${msgType}没有指定this`);
        }
        let eventControl = { callback, target };
        //添加进事件列表
        if (!this.evnetMap.has(msgType)) {
            let arr = new Set();
            arr.add(eventControl);
            this.evnetMap.set(msgType, arr);
            return;
        }
        //重复注册会覆盖之前的注册事件
        let events = this.evnetMap.get(msgType);
        for (const iterator of events) {
            if (Object.is(iterator.target, target)) {
                events.delete(iterator);
            }
        }
        events.add(eventControl);
        console.log('events', events);
    },
    //发送消息
    selfemit(msgType, data) {
        /**
         * 寻找已注册的事件
         * 存在 取出set 对象 
         * 通知所有的 观察此事件对象
         */
        if (!this.evnetMap.has(msgType)) return (() => { throw Error(`发送了一个事件列表中没有的事件，事件名是： ${msgType}`); })();
        let events = this.evnetMap.get(msgType);
        for (let item of events) {
            item.callback.call(item.target, data);
        }
        return 1;
    },
    /**
     * 判断是否已有注册
     */
    selfison(msgType, target) {
        if (!this.evnetMap.has(msgType)) return 0;
        let events = this.evnetMap.get(msgType);
        let state;
        for (const iterator of events) {
            if (Object.is(iterator.target, target)) {
                state = true;
            }
        }
        if (state) return 1;
        return 0;
    },
    //移除事件
    selfoff(msgType, target) {
        /**
         * 判断map 中存不存在这个事件
         * 存在 取出 存储的set 对象
         * 找到 存储的target 删除
         */
        if (this.evnetMap.has(msgType)) {
            let events = this.evnetMap.get(msgType);
            for (const iterator of events) {
                if (Object.is(iterator.target, target)) {
                    events.delete(iterator);
                }
            }
            if (events.size == 0) {
                console.log(msgType, '====0');
                this.evnetMap.delete(msgType);
            }
        } else {
            throw Error(`错误的删除事件: ${msgType}`);
        }
    },
    //清除全部
    selfdelete(msgType) {
        if (this.evnetMap.has(msgType)) {
            this.evnetMap.delete(msgType);
        } else {
            throw Error(`错误的删除事件,事件列表不存在此事件： ${msgType}`);
        }
    },

};
export default Observer;