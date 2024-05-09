const mongoose = require("mongoose")


const connectDB = async ()=>{
    try {
        const db_connect = await mongoose.connect(process.env.DB_URI)
        console.log(`MongoDB Connection Established: ${db_connect.connection.host}`.cyan.underline);

    } catch (err) {
        console.log(err);
        process.exit(1)
    }
}

module.exports = connectDB