"use client";

import {VStack, Image, Box, Card, CardBody, CardHeader, chakra, FormControl, SlideFade, Text, useDisclosure, CardFooter, HStack, Divider, Spacer} from '@chakra-ui/react';
import {Link, Stack, Input, Button} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import {useSession} from "next-auth/react";
import { useRouter } from "next/navigation";

import {signOut} from "next-auth/react";
// components
import InfoEditModal from './infoEditModal';

// utils
import { getAccountInfo } from '@/utils/accountControl';
import { createUrlForMedia, getMediaFromDb } from '@/utils/mediaControl';
import CreatePostModal from './createPostModal';
import AddFriendModal from './addFriendModal';

export default function InfoCard({sessionObj, infoId, colorTheme, mode, reloader}){
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: postIsOpen, onOpen: postOnOpen, onClose: postOnClose} = useDisclosure();
    const {isOpen: addFriendIsOpen, onOpen: addFriendOnOpen, onClose: addFriendOnClose} = useDisclosure();
    const {status, data: session} = useSession();
    
    
    // account defined
    const [account, setAccount]= useState(); // session user data
    const [username, setUsername] = useState(); //string
    const [email, setEmail] = useState(); //string
    const [address, setAddress] = useState(); //string
    const [birthdate, setBirthdate] = useState(); //date
    const [profileImg, setProfileImg] = useState(); //string id
    
    // processed
    const [displayImage, setDisplayImage] = useState(); // string (url)

    const [buttonsByMode, setButtonsByMode] = useState();

    // ------------------------------
    useEffect(()=>{
        async function fetchInfo() {
           
            console.log("profileId",infoId)
            const accountInfo = await getAccountInfo(infoId)
            setAccount(accountInfo.account)
        }

        if (status == "authenticated") {
            fetchInfo()
        }
    }, [status]);

    // ---------------------------
    function makeButtonsByMode(){
        if (mode == "friendsList"){
            setButtonsByMode(<Button px="10px" textColor="white" backgroundColor="rgb(100,190,100)" sx={{_hover: {backgroundColor:"rgba(50,180,50)"}}} onClick={(e)=>{addFriendOnOpen(e)}}>Add Friend</Button>)
        }else if (mode=="post"){
            setButtonsByMode(<Button px="10px" textColor="white" backgroundColor="rgb(100,190,100)" sx={{_hover: {backgroundColor:"rgba(50,180,50)"}}} onClick={(e)=>{postOnOpen(e)}}>Post Something</Button>)
        }else if (mode=="visit"){
            setButtonsByMode(<></>)
        }else if (mode='chat'){
            setButtonsByMode(<></>)
        }
    }

    useEffect(()=>{
       
        async function createInitialData() {
            setUsername(account.username)
            setEmail(account.email)
            setAddress(account.address)
            setBirthdate(account.birthdate)
            setProfileImg(account.profileImg)
        }
  
        

    
        if (!account) {return}
        createInitialData() // get data first
        makeButtonsByMode()
        
    }, [account]);

    useEffect(()=>{
        async function getProfileImage(){
            const mediaContent = await getMediaFromDb(profileImg)
            const mediaSrc = createUrlForMedia(mediaContent)
            setDisplayImage(mediaSrc)
        }

        profileImg ? getProfileImage() : setDisplayImage( "/p-default.png")
    }, [profileImg])

  

    // ---------------------------------
    return (
        <>
            <Card
            w={{base:"90%", md:"50%"}}
            >
                <HStack>
                <Image width="100px" height="100px" objectFit="cover" mx="10px" borderWidth="10px" borderStyle="solid" borderRadius="50%" src={displayImage}></Image>
                <CardBody textAlign="center">
                    <Text fontWeight="bold">
                        {username}
                    </Text>
                    <Text>
                        {email}
                    </Text>
                    <Text>
                        {address}
                    </Text>
                </CardBody>
                </HStack>
                <CardFooter justifyContent="right" width="100%" borderTopWidth="3px" borderTopStyle="solid">
                    <Text fontSize="10px" color={colorTheme} fontWeight={mode=="friendsList"?"bold":""}>
                        <Link onClick={(e)=>{router.push('/pages/profile/friends')}}>Friends</Link>
                    </Text>
                    <Text mx="20px" fontSize="10px">|</Text>
                    <Text fontSize="10px" color={colorTheme} fontWeight={mode=="post"? "bold":""}>
                        <Link onClick={(e)=>{router.push('/pages/profile')}}>Posts</Link>
                    </Text>
                    {mode!='visit'?
                    <>
                        <Text mx="20px" fontSize="10px">|</Text>
                            <Text fontSize="10px" color={colorTheme}>
                                <Link onClick={(e)=>{router.push('/pages/profile/chat')}}>Chat</Link>
                        </Text>

                        <Text mx="20px" fontSize="10px">|</Text>
                        <Text fontSize="10px" color={colorTheme}>
                            <Link onClick={(e)=>{onOpen(e)}}>Edit Profile</Link>
                        </Text>

                        


                    </>:null}
                   
                    <Text mx="20px" fontSize="10px">|</Text>
                    <Text fontSize="10px" color="red">
                    {mode!='visit'?
                        <Link textAlign="start" onClick={(e)=>{signOut()}}>Logout</Link>:
                        <Link textAlign="start" onClick={(e)=>{router.back()}}>Return</Link>}
                    </Text>
                </CardFooter>
            </Card>
            <HStack h={mode!='chat'?"50px":"10px"} w={{base:"90%", md:"50%"}} ml = "20px" textAlign={mode!='visit'?'left':'center'}>
                {mode!='visit'?buttonsByMode:<Text color='white'>You are visiting someone's profile</Text>}
            </HStack>
            <InfoEditModal account={account} isOpen={isOpen} onOpen={onOpen} onClose={onClose}></InfoEditModal>
            <CreatePostModal account={account} isOpen={postIsOpen} onOpen={postOnOpen} onClose={postOnClose}></CreatePostModal>
            <AddFriendModal account={account} isOpen={addFriendIsOpen} onOpen={addFriendOnOpen} onClose={addFriendOnClose} reloader={reloader}></AddFriendModal>
            </>
    );
}