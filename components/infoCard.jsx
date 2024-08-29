"use client";

import {VStack, Image, Box, Card, CardBody, CardHeader, chakra, FormControl, SlideFade, Text, useDisclosure, CardFooter, HStack, Divider} from '@chakra-ui/react';
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

export default function InfoCard({sessionObj, colorTheme}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: postIsOpen, onOpen: postOnOpen, onClose: postOnClose} = useDisclosure();
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

    // ------------------------------
    useEffect(()=>{
        async function fetchInfo() {
           
            const accountInfo = await getAccountInfo(session?.id)
            setAccount(accountInfo.account)
        }

        if (status == "authenticated") {
            fetchInfo()
        }
    }, [status]);

    // ---------------------------
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
                <Text fontSize="10px" color={colorTheme}>
                        <Link onClick={postOnOpen}>Post Something</Link>
                    </Text>
                    <Text mx="20px" fontSize="10px">|</Text>
                    <Text fontSize="10px" color={colorTheme}>
                        <Link onClick={onOpen}>Edit</Link>
                    </Text>
                    <Text mx="20px" fontSize="10px">|</Text>
                    <Text fontSize="10px" color="red">
                        <Link textAlign="start" onClick={signOut}>Logout</Link>
                    </Text>
                </CardFooter>
                <InfoEditModal account={account} isOpen={isOpen} onOpen={onOpen} onClose={onClose}></InfoEditModal>
                <CreatePostModal account={account} isOpen={postIsOpen} onOpen={postOnOpen} onClose={postOnClose}></CreatePostModal>
            </Card>
  
    );
}