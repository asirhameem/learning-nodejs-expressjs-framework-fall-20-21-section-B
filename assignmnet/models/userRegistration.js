const db = require('./db');

module.exports = {


    insert: function(user, callback) {
        var sql = "insert into user VALUES ('', '" + user.name + "' ,'" + user.email + "', '" + user.password + "' ,'" + user.gender + "', '" + user.type + "')";

        //console.log(sql);

        db.execute(sql, function(status) {
            callback(status);
        });
    }

}