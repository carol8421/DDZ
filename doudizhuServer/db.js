const mysql = require("mysql");
let client = undefined;
const query = function (sql, cb) {
    client.getConnection((err, connection) => {
        if (err) {
            console.log("get connection = " + err);
            if (cb) {
                cb(err);
            }
        } else {
            connection.query(sql, (connErr, result) => {
                console.log("执行的sql 语句=========>", sql, "\n");

                if (connErr) {
                    if (cb) {
                        cb(connErr);
                    }
                } else {
                    if (cb) {
                        cb(null, result);
                    }
                }
                // connection.release();
            });
        }
    });
};
exports.getPlayerInfo = function (key, cb) {
    //数据库语句:查询一个表中 key值得数据
    let sql = `select * from t_account where account_id = "${key}";`;
    query(sql, cb);
};
/**
 * 根据uniqueID 获取用户信息
 * @param {*} key 
 * @param {*} cb 
 */
exports.getPlayerInfoWithUniqueID = function (key, cb) {
    //数据库语句:查询一个表中 key值得数据
    let sql = `select * from t_account where unique_id = "${key}";`;
    query(sql, cb);
};
/**
 * 
 * @param {string} unique_id 唯一id
 * @param {string} account_id 账户id
 * @param {string} nick_name 账户昵称
 * @param {number} gold_count 金币数
 * @param {string} avatar_url 头像url
 */
exports.createPlayerInfoWithAccountID = function (unique_id, account_id, nick_name, gold_count, avatar_url) {
    let sql = `insert into t_account(unique_id,account_id,nick_name,gold_count,avatar_url) values('${unique_id}','${account_id}','${nick_name}','${gold_count}','${avatar_url}');`;
    console.log("sql==============>", sql);
    query(sql, (err, data) => {
        if (err) {
            console.log("createPlayerIndo====err>", err);
        } else {
            console.log("createPlayer suc=================!");
        }
    });
};

exports.connect = function (config) {
    client = mysql.createPool(config);
};



/**
 * sql 基础语句;
 * SELECT * FROM t_account; //显示表格所有数据 
 * 
 * 
 */