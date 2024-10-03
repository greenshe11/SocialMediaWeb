import { io } from "socket.io-client";
import { Chat } from "./roomControl";
export const socket = io("http://localhost:5000");

export const receiveAddedMessages = function() {
    return new Promise(function(resolve, reject){
        socket.once("addMessage", (data)=>{
            console.log("MESSAGE RETURNED", data)
            resolve(data)
        })
    })
}

export const addMessage = function (roomId, userId, message) {
    return new Promise(function(resolve, reject){
        socket.emit("send", roomId, [userId, message])
    })
}

export const getMessagesFromServer = function(roomId) {
    console.log("GETTING MESSAGES FROM SERVER")
    return new Promise(function(resolve, reject) {
        console.log("GETTING PROMISE FROM SERVER")
        socket.emit("getMessages", roomId)
        socket.once ("getMessagesResponse", (data) => {
        console.log("GETTING MESSAGE", data)
        resolve(data);
      })
    });
}

export const setRoomServer = function(roomId, userId) {
    console.log("GETTING MESSAGES FROM SERVER")
    return new Promise(function(resolve, reject) {
        console.log("GETTING PROMISE FROM SERVER")
        socket.emit('isRoomOpen', roomId ,userId)
        
        socket.once('isOpenResponse', (result)=>{
            const isRoomOpen = result.result
            const userId = result.userId
            const roomId = result.roomId
        
            if (!isRoomOpen){
            const initializeRoom = async () =>{
        
                const roomContent = await Chat.getAll(roomId)
                const messages = []
        
                for (let i=0; i<roomContent.length; i++){
                const userId = roomContent[i].userId
                const message = roomContent[i].message  
                messages.push([userId, message])
                }
        
                socket.emit('initRoom', roomId, messages, userId)
                console.log("Initialize Room")
                socket.once('initRoomResponse', (content)=>{
                    console.log('roomContentSet', content)
                    resolve(content)
                })
    
                
            }
        
            initializeRoom()
            
            } else{
        
            socket.emit('joinRoom', roomId, userId)
            console.log("Joining Room")
            }
                        
           

            socket.once('joinRoomResponse', (content)=>{
                console.log('joinContentSet', content)
                resolve(content)
            })
            
        })
    });
}

