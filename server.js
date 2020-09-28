const express = require('express');


const app = express();
const PORT = process.env.PORT || 3005;
const routes = require("./routes");
const monitorLanguage = require('./utils/monitorLanguage')

const server = require('http').Server(app)
const io = require('socket.io')(server)

app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))


app.use(routes)

let users =[];

io.on('connection',(socket)=>{
    console.log("Socket is connected");

    socket.on("join-room",({user,room})=>{
        console.log(user,room)

        users.push({id:socket.id,username:user,room})
        
        socket.join(room)

        socket.emit("message",{user:'admin',text:`${user}, welcome to ${room} room!`})
        socket.broadcast.to(room).emit("message",{user:"admin",text:`Hey everyone, ${user} has entered the room!`})
        io.to(room).emit('roomData',{room:room,users:users})
        
    })

    socket.on("send-message",message=>{
        let idx = users.findIndex(user=>user.id === socket.id);
        console.log(`Idx: ${idx} Message: ${message}`)
        let {_, error } = monitorLanguage(message)
        
        io.to(users[idx].room).emit("message",{user:users[idx].username,text:message})
        
        if(error){
            io.to(users[idx].room).emit("message",{user:'admin',text:error})

        }
      
    })

    socket.on('disconnect',()=>{
        let idx = users.findIndex(u=>u.id === socket.id);
        let disconnectedUser = users.splice(idx,1)[0];
        console.log(disconnectedUser)
        console.log('user has disconnected')
        if(disconnectedUser !== undefined){
        io.to(disconnectedUser.room).emit('message',{user:'admin',text:`${disconnectedUser.username} has left the chat.`})
        io.to(disconnectedUser.room).emit('roomData',{room:disconnectedUser.room,users:users})
        }
    })
})



app.use(urlError)
app.use(errorHandler)



function urlError(req,res,next){
    res.status(404);
    let error = new Error(`Error -- ${req.originalUrl} does not exist!`)
    next(error)
}

function errorHandler(err,req,res,next){
    res.status(500);
    res.json({
        message:err.message,
        stack:err.stack,
        custom:"Oops, you goofed!"
    })
}







server.listen(PORT,console.log(`Listening in on port ${PORT}`))