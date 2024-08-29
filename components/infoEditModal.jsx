"use client";

import {VStack, Image, Box, Card, CardBody, CardHeader, chakra, FormControl, SlideFade,  useDisclosure, CardFooter, HStack, Modal} from '@chakra-ui/react';
import {ModalHeader, ModalCloseButton, ModalBody, Text,ModalFooter,Link, ModalOverlay, ModalContent, Stack, Input, Button} from '@chakra-ui/react';
import { useEffect,  useState, useRef} from "react";
import {signIn, useSession} from "next-auth/react";
import {createLocalFileUrl, createUrlForMedia, editMedia, getMediaFromDb, postMediaToDb} from '../utils/mediaControl'; // Adjust the path if needed
import { useRouter } from "next/navigation";
import { editAccount, getAccountInfo } from '@/utils/accountControl';

export default function InfoEditModal({account, infoSetter, isOpen, onOpen, onClose}){
    // FIELDS/USERDATA
    const [username, setUsername] = useState();
    const [address, setAddress] = useState();
    const [birthdate, setBirthdate] = useState();
    const [profileImg, setProfileImg] = useState({});
    

    // FIELDS/IMAGE
    const [fileUrl, setFileUrl] = useState();
    const [file, setFile] = useState();

    // FLAGS

    // CALLBACKS
    const onFileChange = (e) => {
      const {file, url} = createLocalFileUrl(e)
      setFileUrl(url)
      setFile(file)
    }

    
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    var formattedDate = ""

    const onSubmit = async (e) => {
      e.preventDefault();
      const applyImage = async () => {
        var profileImg = null;
        if (account.profileImg){
          console.log("REPLACING IMAGE")
          await editMedia(account.profileImg, file, null, "image")
          profileImg = account.profileImg
        }else{
          console.log("NEW MIMAGE")
          profileImg = await postMediaToDb(file, null, "image")
        }  
        console.log("EDITING ACCOUNT")
        console.log(profileImg)
        await editAccount(account._id, username, address, birthdate, profileImg)
        console.log("EDITING DONE ACCOUNT")
      }
    applyImage()
    onClose(e)
   }

   useEffect(()=>{
    async function getProfileImage(){
        console.log("img:", account.profileImg)
        const mediaContent = await getMediaFromDb(account.profileImg)
        console.log("Media", mediaContent)
        const mediaSrc = createUrlForMedia(mediaContent)
        console.log("mediasrc: ", mediaSrc);
        setFileUrl(mediaSrc ? mediaSrc :"/p-default.png" )
    }
    console.log(account)

    account?.profileImg && getProfileImage() 

}, [account])

    
    const getDate=()=>{
      try{
        const date = new Date(account?.birthdate);
         formattedDate = date.toISOString().split('T')[0]; // Extract the date part only (YYYY-MM-DD)
         return formattedDate
        }catch(e){
          console.log(e)
        
    }}
    //<video src={fileUrl} autoplay={true} controls={true}/>

    return (
            
      <Modal 
      initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Account Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
        
          <VStack spacing="20px">
          
          <Image width="100px" height="100px" objectFit="cover" borderRadius="50%" borderWidth="5px" src={fileUrl ? fileUrl : "/p-default.png"}/>
            <form >
            <FormControl>
              <Text>Profile Image</Text>
              <Input onChange={(e) => {onFileChange(e)}} type="file"></Input>
              <Text>Username</Text>
              <Input onChange={(e)=>{setUsername(e.target.value)}} defaultValue={account?.username} />
              <Text>Address</Text>
              <Input onChange={(e)=>{setAddress(e.target.value)}}  defaultValue={account?.address} />
              <Text>Birthdate</Text>
              <Input onChange={(e)=>{setBirthdate(e.target.value)}} defaultValue={getDate()} type="date"/>
            </FormControl>
            </form>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onSubmit} type="submit" colorScheme='blue' mr={3}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  
    );
}