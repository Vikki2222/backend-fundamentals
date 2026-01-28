const bcrypt = require('bcrypt');

const hashpassword = async(password) => {
    return await bcrypt.hash(password,10);
}

const comparepassword = async(password,hash) =>{
    return await bcrypt.compare(password,hash);
}

module.exports = {

    hashpassword,
    comparepassword
};