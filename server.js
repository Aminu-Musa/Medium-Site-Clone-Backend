const express = require("express")
const dotenv = require("dotenv").config()
const colors = require("colors")
const helmet = require("helmet")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 4000
const userRoutes = require("./Routes/users.Routes")
const storyRoutes = require("./Routes/story.Routes")
const DBconnection = require("./DB Config/Database.connection")
const commentRoutes = require("./Routes/comment.Routes")


// MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(helmet())
app.use(morgan("common"))

DBconnection()


// ROUTERS - MIDDLEWARE
 app.use("/api/users", userRoutes)
 app.use("/api/story", storyRoutes)
 app.use("/api/comment", commentRoutes)




app.listen(PORT, ()=> {

    
    console.log(`Backend Server Started on http://localhost:${PORT}`.underline);
})
