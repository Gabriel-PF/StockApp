require('dotenv/config');
const mongoose = require('mongoose'); 
const User = require('../models/User.model');
const bcrypt = require('bcryptjs'); 

const password = 'Adm1nAdm1n'; 
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
        await mongoose.connect(process.env.MONGODB_URI);

        await User.deleteMany({ role: 'ADMIN'});

        const admin = await User.create(newAdmin);
        console.log ('admin created: ', admin);
        mongoose.connection.close();
    }   catch (e) {
        console.error(e);
    }
}
