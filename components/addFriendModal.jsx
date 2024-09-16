"use client";

import {VStack, Image, Box, Card, CardBody, CardHeader, chakra, FormControl, SlideFade,  useDisclosure, CardFooter, HStack, Modal, Spacer} from '@chakra-ui/react';
import {ModalHeader, ModalCloseButton, ModalBody, Text,ModalFooter,Link, ModalOverlay, ModalContent, Stack, Input, Button} from '@chakra-ui/react';
import { useEffect,  useState, useRef} from "react";
import {signIn, useSession} from "next-auth/react";
import {createLocalFileUrl, createUrlForMedia, editMedia, getMediaFromDb, getMediaUrlFromMediaId, postMediaToDb} from '../utils/mediaControl'; // Adjust the path if needed
import { useRouter } from "next/navigation";
import { editAccount, getAccountInfo, getAllAccounts } from '@/utils/accountControl';
import { addFriend, cancelFriendRequest, confirmFriendRequest, getFriendRequests, getFriends, getTakenFriendRequest } from '@/utils/friendsControl';

export default function AddFriendModal({account, isOpen, onOpen, onClose, reloader}){
    const router = useRouter();
    // FIELDS/USERDATA
    const [suggestedFriends, setSuggestedFriends] = useState();
    // FIELDS/IMAGE
    const initialRef = useRef(null)
    const finalRef = useRef(null)

   const onClickCancelFriendRequest = async (e, sourceUserId, targetUserId) => {
      const res = await cancelFriendRequest({sourceUserId, targetUserId, state: "pending"})
      const requestComponent = document.getElementById(`${targetUserId}-request`)
      requestComponent.style.display = "block"
      console.log("Friend Request Cancelled")
      reloader()
   }

   const requestFriend = async (e, sourceUserId) => {
      e.preventDefault();
      const targetUserId = e.target.getAttribute('data-userid');
      const res = await addFriend(sourceUserId, targetUserId)
      const cancelComponent = document.getElementById(`${targetUserId}-cancel`)
      cancelComponent.style.display = "block"
      console.log("Friend Request Sent")
      reloader()
   }

   const onClickConfirmRequest = async (e, targetUserId, sourceUserId) => {
      e.preventDefault();
      await confirmFriendRequest(sourceUserId, targetUserId, {state: "confirmed"})
      console.log("FRIEND REQUEST CONFIRMED")
      reloader()
   }
   

   useEffect(()=>{
    async function getSuggestedFriends(){
      const allAccount = await getAllAccounts()
      let tempSuggestions = [];
      const allFriends = await getFriends(account._id)
      const allTakenRequests = await getTakenFriendRequest(account._id)
      for (let i=0; i<allTakenRequests.content.length; i++){
      
        console.log("DD", allTakenRequests)
        let targetAccount = await getAccountInfo(allTakenRequests?.content[0].sourceUserId)
        console.log(targetAccount)
        let profileImg = await getMediaUrlFromMediaId(targetAccount?.account.profileImg, '/p-default.png')

        tempSuggestions.push(<Card p="10px" w="100%"><HStack>
          <Image width="50px" height="50px" objectFit="cover" mx="10px" borderWidth="5px" borderStyle="solid" borderRadius="50%" src={profileImg}></Image>
          <Text fontSize="15px" fontWeight="bold"><Link onClick={(e)=>{router.push(`/pages/profile/friends/${targetAccount?.account._id}`)}}>{targetAccount?.account.username}</Link></Text>
          <Spacer/>
          <Button px="10px" textColor="white" backgroundColor="rgb(100, 190,100)" onClick={(e)=>{onClickConfirmRequest(e, account._id, targetAccount.account._id); hideButton(e)}} sx={{_hover: {backgroundColor:"rgb(50,180,50)", color: "white"}}}>Confirm</Button>
        </HStack></Card>)
      }
      
      for (let i=0; i<allAccount.content.length; i++){
        if (allFriends.content.find(obj => (obj.sourceUserId == account._id && obj.targetUserId == allAccount.content[i]._id)|| 
        (obj.targetUserId == account._id && obj.sourceUserId == allAccount.content[i]._id))){continue}
        if (account._id != allAccount.content[i]._id){
        let profileImg = await getMediaUrlFromMediaId(allAccount.content[i].profileImg, '/p-default.png')
        
        tempSuggestions.push(<Card p="10px" w="100%"><HStack>
                  <Image width="50px" height="50px" objectFit="cover" mx="10px" borderWidth="5px" borderStyle="solid" borderRadius="50%" src={profileImg}></Image>
                  <Text fontSize="15px" fontWeight="bold"><Link onClick={(e)=>{router.push(`/pages/profile/friends/${allAccount.content[i]._id}`)}}>{allAccount.content[i].username}</Link></Text>
                  <Spacer/>
                  <Button id={`${allAccount.content[i]._id}-cancel`} px="10px" display="none" textColor="white" backgroundColor="rgb(190,100, 100)" onClick={(e)=>{onClickCancelFriendRequest(e, account._id, allAccount.content[i]._id); hideButton(e)}} sx={{_hover: {backgroundColor:"rgb(180,50,50)", color: "white"}}}>Cancel Request</Button>
                  <Button id={`${allAccount.content[i]._id}-request`} data-userid={allAccount.content[i]._id} px="10px" textColor="white" backgroundColor="rgb(100, 190,100)" onClick={(e)=>{requestFriend(e, account._id); hideButton(e)}} sx={{_hover: {backgroundColor:"rgb(50,180,50)", color: "white"}}}>Add Friend</Button>
                </HStack></Card>)
        }
      }
      console.log("FRIEND SUGGESTIONS", tempSuggestions)
      setSuggestedFriends(tempSuggestions)
    }
    if (!account){return}
    setSuggestedFriends([<Text>Loading...</Text>])
    console.log("OPENING ADD FRIEND BUTTON")
    getSuggestedFriends()
  }, [account, onOpen, isOpen, onClose])

    
    const hideButton = (e) => {
        // Set display to none to hide the button
        e.target.style.display = 'none';
    };
    
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