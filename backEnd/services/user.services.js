const User = require("../models/user.models");

const userExists = async (data) => {
    const ifExists = await User.findOne({
        "$or": [
            { username: data.username },
            { email: data.email }
        ]
    });
    return ifExists !== null;
};

module.exports = { userExists };