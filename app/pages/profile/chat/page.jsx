"use client";

import InfoCard from "@/components/infoCard";
import { Flex,Text, Box, CardHeader, CardFooter, Card, Image, CardBody, VStack, HStack, useDisclosure, Button} from '@chakra-ui/react';
import InfoEditModal from "@/components/infoEditModal";
import { ChakraProvider } from '@chakra-ui/react'
import FileUpload from "@/components/fileUpload";
import { signOut, useSession } from "next-auth/react"
import PostCard from "@/components/postCard";
import { useEffect, useState } from "react";
import { getPostsFromDb } from "@/utils/postsControl";
import { getMediaFromDb, getMediaFromDbUsingPost, getMediaUrlFromMediaId } from "@/utils/mediaControl";
import { getAccountInfo } from "@/utils/accountControl";
import { render } from "react-dom";
import { UserScroll } from "@/components/chat/userScroll";
import { MessageUser } from "@/components/chat/messageUser";
import ChatBox from "@/components/chat/chatUsersBox";
import io from 'socket.io-client';
import AddMessageModal from "@/components/chat/addMessageModal";
import { getFriends } from "@/utils/friendsControl";
import { Chat, findRooms, getRooms} from "@/utils/roomControl";
import { MessageBox } from "@/components/chat/messageBox";
import ChatUsersBox from "@/components/chat/chatUsersBox";
import { addMessage, getMessagesFromServer, receiveAddedMessages, setRoomServer, socket } from "@/utils/socketControl";

export default function Home() {
  const sessionObj = useSession();
  const account = useSession();
  const {data: session} = useSession();

  const colorTheme = "#2E2F37";
  const { isOpen: isOpenChat, onOpen: onOpenChat, onClose:onCloseChat } = useDisclosure();
  const [infoHead, setInfoHead] = useState()
  const [selectedRoom, setSelectedRoom] = useState();
  const [rooms, setRooms] = useState()
  const [socket, setSocket] = useState()
  const [chats, setChats] = useState()
  const [onUser, setOnUser] = useState()
  const [chatContent, setChatContent] = useState([])
  const [ sendState, setSendState ] = useState()
  const [ sessionUserId, setSessionUserId ]=useState()
  const [ selectedState, setSelectedState ] = useState()
  const [ usersDataCopy, setUsersDataCopy ] = useState()
  const [evaluateMessage, setEvaluateMessage ] =useState()
 
  const getChatUsers = async (id) => {
    // get all friends
    // get rooms by user
    console.log("PREUSERROOM", id)
    const userRooms = await findRooms({userId: id})
    console.log('userroom',userRooms)
  

    // iterate rooms and get target user for each room
    const tempRes = []
    for (let i=0; i<userRooms.length; i++){
      console.log("ID SESSION", id)
  
      const targetRooms = await findRooms({roomId: userRooms[i].roomId, userId: {$nin: id}}) 
      if (!targetRooms){continue}
      console.log("OWN ID", userRooms[i].userId)
     
      console.log('targetRooms', targetRooms)

      const userData = await getAccountInfo(targetRooms[0].userId) 
      console.log('userData', userData)
      if (!userData){continue}
      const userImage = await getMediaUrlFromMediaId(userData.account.profileImg)
      console.log('userImage', userImage)
      tempRes.push({targetUserImage: userImage, targetUserName: userData.account.username, userId: userRooms[i].userId, targetUserId: userData.account._id, roomId: userRooms[i].roomId})
    }
    return tempRes
  }
  

  const onClickUser = async (roomId, userId) => {
    //socket.emit('isRoomOpen', roomId ,userId)
    const content = await setRoomServer(roomId, userId)
    const messages = await getMessagesFromServer(roomId)
    
    // [[userId: message],[userId:message]]
    const messagesDisplay = [] // make own id as "you" and other's id as "other"
    if (!messages){
      setChatContent([])
      return
    }
    for (let i=0; i<messages.length; i++){
      // index 0: userId
      // index 1: message
      console.log(messages[i])
      if (messages[i][0] == userId){
        messagesDisplay.push(['you', messages[i][1]])
      }else{
        messagesDisplay.push(['other', messages[i][1]])
      }
    }
    console.log("SETTING MESSSAGE DISPLAY", messagesDisplay)
    setChatContent(messagesDisplay)
    //setChats(<ChatUsersBox getUsersFunc={getChatUsers} onClickUserState={setOnUser} userId={session?.id} conversation={messagesDisplay} onClickSendState={setSendState}/>)

  }


  useEffect(()=>{
    
    if (onUser){
    
      const roomId = onUser[0]
      const userId = onUser[1]
      onClickUser(roomId, userId)
    }
  }, [onUser])

  useEffect(()=>{
    const onSend = async (roomId, userId, message) => {
      Chat.send(roomId, userId, message)
      addMessage(roomId, userId, message)
      
    
    }
    console.log("A MESSAGE SENT AS NEW STATE")
    if (sendState){
      console.log("TRUE")
      const roomId = sendState[0]
      const userId = sendState[1]
      const message = sendState[2]
      onSend(roomId, userId, message)
    }
  }, [sendState])


  useEffect(() => {
      
    setSocket(socket) 

  }, []);

  useEffect(()=>{
    
    if (socket){
      socket.on("connect", () => {
        console.log("Connected to the server");
      });
  
      socket.on("isOpenResponse", (boolean) => {
        console.log("IS OPEN", boolean);
      });
  
      
      return () => {
        socket.disconnect(session?.id)
        socket.disconnect(); // Clean up on unmount
      };
    }
  
  }, [socket])


  useEffect(()=>{
    console.log("EVALUATING", evaluateMessage, selectedState)
    if (!evaluateMessage ){return}
    const content = evaluateMessage
    if (selectedState[0]!=content.roomId){return}
    const message = content.message
    console.log("RECEIEVED FORM SERVER",content)
    console.log(selectedState)
  
    setChatContent((prevChatContent) => {
      // Create a new array based on the previous state
      const updatedContent = [...prevChatContent];

      // Check if the userId matches and add the new message accordingly
      if (session?.id == message[0]) {
        updatedContent.push(['you', message[1]]); // Add your own message
      } else {
        updatedContent.push(['other', message[1]]); // Add others' messages
      }

      return updatedContent; // Return the updated state
    });

  }, [evaluateMessage])

  useEffect(()=>{
    const fetchInfo = async () => {
      const account = await getAccountInfo(sessionObj.data?.id)
      const allPosts = await getPostsFromDb(sessionObj.data?.id)
    }
    const newMessageCallback = async (userId)=>{
      while (true){
        console.log("MESSAGE CALLBACK")
        const content =  await receiveAddedMessages()
        setEvaluateMessage(content)
        
      }
    }

    if (sessionObj.status == "authenticated") {
  
        console.log("AUTHENITICATED!")
        fetchInfo()
        setInfoHead(<InfoCard sessionObj={sessionObj} infoId={sessionObj.data.id} colorTheme={colorTheme} mode="chat"/>)
        setSessionUserId(session?.id)
        console.log("SETTING SESSION ID TO:", session?.id)
            
        newMessageCallback(session?.id)
        //setChats(<ChatUsersBox getUsersFunc={getChatUsers} onClickUserState={setOnUser} userId={sessionUserId} conversation={chatContent} onClickSendState={setSendState} />)
    }
  
}, [sessionObj.status]);

  return (
  <ChakraProvider>
    <Flex>
      <Box
      bg={colorTheme}
      height="100%"
      w="100vw">
      <VStack>
        {infoHead}
        
       
        
          <ChatUsersBox getUsersFunc={getChatUsers} 
          onClickUserState={setOnUser}
           userId={sessionUserId} 
           conversation={chatContent} 
           onClickSendState={setSendState}
           selectedState={selectedState}
           setSelectedState={setSelectedState}
           setUsersDataCopy={setUsersDataCopy}
           usersDataCopy={usersDataCopy} />
      </VStack>
      </Box>
    </Flex>
    
  </ChakraProvider>
     
  );
}

/*   */