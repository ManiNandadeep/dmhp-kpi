// Users for JWT authentication purposes

module.exports = {
    users : function getUsers(){
    var USERS = [
        { id: 1, username: "dmhp" },
        { id: 2, username: "testuser" },
    ];

    return USERS;
    }
};