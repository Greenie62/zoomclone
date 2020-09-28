console.log("hey asshole!")

let socket = io.connect("http://localhost:8080");
let userDOM=document.querySelector(".usersDOM")
let USER = document.querySelector(".user").innerHTML
let ROOM = document.querySelector(".room").innerHTML

socket.emit("join-room",{user:USER,room:ROOM})


socket.on("message",message=>{
    printMessage(message)
})

socket.on('roomData',data=>{
    console.log(data)
    console.log(data.users.length)
    userDOM.innerHTML=data.users.length
})


var messageBtn=document.querySelector(".messagebtn");



messageBtn.onclick=sendMessage;



function sendMessage(){

    let message=document.querySelector("#messagefield").value;
    console.log("Message: " + message)
    socket.emit('send-message',message)
}



function printMessage(message){
    // let parentDiv =document.createElement("div");
    let messageDiv =document.createElement("div");
    // parentDiv.className="message-div"
    messageDiv.className="message-div";
    if(message.user === "admin"){
        messageDiv.className += " admin"
    }
    messageDiv.innerHTML=`<h4>${message.text}</h4><br><h5>${message.user}</h5>`

    document.querySelector(".chat-text-area").appendChild(messageDiv)
}






async function main(){
let stream = await navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
})

}

