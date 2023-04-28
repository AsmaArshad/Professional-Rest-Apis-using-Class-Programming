const bcrypt = require('bcrypt');

async function generateHashPswd(Password, saltRound) {
    try{       
        //use bcrypt here for hashing the password
        //saltRound here i.e. 10 means that it generate a random string.
        //and added it to our hash key
        const hash = await bcrypt.hash(Password, saltRound);
        return hash;
    }
    catch(err){
        console.log(err.message);
        return; 
    }
}

module.exports = {generateHashPswd}