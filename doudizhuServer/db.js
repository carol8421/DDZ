const mysql = require("mysql");
let client = undefined;
// const query = function (sql, cb) {
//     client.getConnection((err, connection) => {
//         if (err) {
//             console.log("err=====>", err);
//             if (cb) {
//                 cb(err);
//             }
//         } else {
//             console.log("connection====>", connection);
//             connection.query(sql, (connErr, result) => {
//                 if (connErr) {
//                     console.log("sql=====>", sql, connErr);
//                     if (cb) {
//                         cb(connErr);
//                     }
//                 } else {
//                     if (cb) {
//                         cb(null, result);
//                     }
//                 }
//             });
//         }
//     });
// };
const query = function (sql, cb) {
    client.getConnection((err, connection) => {
        if (err) {
            console.log("get connection = " + err);
            if (cb) {
                cb(err);
            }
        } else {
            connection.query(sql, (connErr, result) => {
                if (connErr) {
                    console.log(sql + connErr);
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
    let sql = `select * from t_account where account_id = ${key};`;
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
exports.createPlayerInfoWithAccountID = function (unuque_id, account_id, nick_name, gold_count, avatar_url) {
    let sql = `insert into t_account(unuque_id,account_id,nick_name,gold_count,avatar_url) values('${unuque_id}','${account_id}','${nick_name}','${gold_count}','${avatar_url}');`;
    console.log("sql==============>", sql);
    query(sql, (err, data) => {
        if (err) {
            console.log("createPlayerIndo====err>", err);
        } else {
            console.log("data", data);
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