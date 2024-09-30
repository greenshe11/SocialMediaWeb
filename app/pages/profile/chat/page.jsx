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
import ChatBox from "@/components/chat/chatBox";
import io from 'socket.io-client';
import AddMessageModal from "@/components/chat/addMessageModal";
import { getFriends } from "@/utils/friendsControl";

export default function Home() {
  const sessionObj = useSession();
  const account = useSession();
  const {data: session} = useSession();

  const colorTheme = "#2E2F37";
  const { isOpen: isOpenChat, onOpen: onOpenChat, onClose:onCloseChat } = useDisclosure();
  const [infoHead, setInfoHead] = useState()
  const [selectedRoom, setSelectedRoom] = useState();
  const [rooms, setRooms] = useState()

  const getFriendsFunc = async () => {
    // get all friends
    const friendsAll = await getFriends(session?.id, 'confirmed' )
    const tempRes = []
    for (let i=0; i<friendsAll.content.length; i++){
      const user = friendsAll.content[i]
      const userImage = await getMediaUrlFromMediaId(user.profileImg)
      //tempRes.push({targetUserImage: })
    }
    return []
    //return  [{targetUserImage:null; targetUsername:null; userId:null; targetUserId: null}, ...]
  }

  const addRoomFunc = () => {
    console.log("add room function")
  }

  const onSelectRoom = () => {
    // get all rooms
  }
  /**
   * opens
   * get rooms that the user is in
   * shows all friends
   * exists = if room exists
   * if exists
   *    show all messages in room
   * if chats:
   *    if ! exists
   *      add chat to room
   *      add message to room
   *    else:
   *       add chat to room
   *  
   */
    
  

  useEffect(()=>{
    const fetchInfo = async () => {
      const account = await getAccountInfo(sessionObj.data?.id)
      const allPosts = await getPostsFromDb(sessionObj.data?.id)
    }

    if (sessionObj.status == "authenticated") {
        console.log("AUTHENITICATED!")
        fetchInfo()
        setInfoHead(<InfoCard sessionObj={sessionObj} infoId={sessionObj.data.id} colorTheme={colorTheme} mode="chat"/>)
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
        
        <HStack h={"50px"} w={{base:"90%", md:"50%"}} ml = "20px" textAlign='left'>
        <Button px="10px" textColor="white" backgroundColor="rgb(100,190,100)" sx={{_hover: {backgroundColor:"rgba(50,180,50)"}}} onClick={(e)=>{onOpenChat(e)}}>Add New Message</Button>
          </HStack>
        <ChatBox colorTheme={colorTheme}/>
      </VStack>
      </Box>
    </Flex>
    <AddMessageModal addRoomFunc={addRoomFunc} getFriendsFunc={getFriendsFunc} isOpen={isOpenChat} onClose={onCloseChat} onOpen={onOpenChat}></AddMessageModal>
  </ChakraProvider>
     
  );
}

/*   */