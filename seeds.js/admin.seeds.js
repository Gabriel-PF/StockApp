require('dotenv/config');
const mongoose = require('mongoose'); 
const User = require('../models/Users');
const bcrypt = require('bcryptjs'); 

const password = 'admin'; 
const securePass = bcrypt.hashSync(password);
const boss = 'admin'


const newAdmin = {
    username: boss,
    password: securePass,
    isAdmin: true, 
    following: [],
    role: 'ADMIN',
};

connection(); 

async function connection() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            userNewUrlParser: true,
            userCreateIndex: true,
            useUnifiedTopology: true,
        });

        await User.deleteMany({ role: 'ADMIN'});

        const admin = await User.create(newAdmin);
        console.log ('admin created: ', admin);
        mongoose.connection.close();
    }   catch (e) {
        console.error(e);
    }
}
