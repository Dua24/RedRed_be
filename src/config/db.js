const mongoose = require("mongoose");
require("dotenv").config();
var dbState = [{
    value: 0,
    label: "disconnected"
},
{
    value: 1,
    label: "connected"
},
{
    value: 2,
    label: "connecting"
},
{
    value: 3,
    label: "disconnecting"
}];

const connection = async () => {
    const options = {
        user: 'root',
        pass: '80NM8mcoS4JjtbxU',
        dbName: 'RedRed'
    }
    await mongoose.connect('mongodb+srv://root:80NM8mcoS4JjtbxU@cluster0.hg7i2zv.mongodb.net/?retryWrites=true&w=majority', options);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find(f => f.value == state).label, "to db"); // connected to db
}

module.exports = connection