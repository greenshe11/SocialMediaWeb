"use client";

import {VStack, Image, Box, Card, CardBody, CardHeader, chakra, FormControl, SlideFade,  useDisclosure, CardFooter, HStack, Modal, Spacer} from '@chakra-ui/react';
import {ModalHeader, ModalCloseButton, ModalBody, Text,ModalFooter,Link, ModalOverlay, ModalContent, Stack, Input, Button} from '@chakra-ui/react';
import { useEffect,  useState, useRef} from "react";
import {signIn, useSession} from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddMessageModal({getFriendsFunc, addRoomFunc, isOpen, onOpen, onClose}){
    const router = useRouter();
    // FIELDS/USERDATA
    const [suggestedFriends, setSuggestedFriends] = useState();
    // FIELDS/IMAGE
    const initialRef = useRef(null)
    const finalRef = useRef(null)

   useEffect(()=>{
        const friends = getFriendsFunc() //  [{targetUserImage:null; targetUsername:null; userId:null; targetUserId: null}, ...]
        const tempFriends = []
        for (let i=0; i<friends.length; i++){
          const user = friends[i]
          const image = user.targetUserImage
          const userId = user.userId
          const targetUsername = user.targetUserName
          const targetUserId = user.targetUserId
          tempFriends.push(<Card p="10px" w="100%"><HStack>
            <Image width="50px" height="50px" objectFit="cover" mx="10px" borderWidth="5px" borderStyle="solid" borderRadius="50%" src={image}></Image>
            <Text fontSize="15px" fontWeight="bold"><Link onClick={(e)=>{router.push(`/pages/profile/friends/${targetUserId}`)}}>{targetUsername}</Link></Text>
            <Spacer/>
            <Button px="10px" textColor="white" backgroundColor="rgb(100, 190,100)" onClick={(e)=>{addRoomFunc(userId, targetUserId); onClose()}} sx={{_hover: {backgroundColor:"rgb(50,180,50)", color: "white"}}}>Message</Button>
          </HStack></Card>)
        }
        setSuggestedFriends(tempFriends)
        console.log("OPPENED")
    }, [onOpen, isOpen, onClose])


    return (
            
      <Modal 
      initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Friend Suggestions</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
        
          <VStack spacing="20px">
                {suggestedFriends}
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  
    );
}