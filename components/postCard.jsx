"use client";

import {VStack, Image, Box, Card, CardBody, CardHeader, chakra, FormControl, SlideFade, Text, useDisclosure, CardFooter, HStack, Divider} from '@chakra-ui/react';
import {Link, Stack, Input, Button} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import {useSession} from "next-auth/react";
import { useRouter } from "next/navigation";
import { IconButton } from "@chakra-ui/react";
import { FaHeart, FaThumbsDown, FaThumbsUp, FaLaughSquint, FaSadTear, FaAngry } from "react-icons/fa";


import {signOut} from "next-auth/react";
// components
import InfoEditModal from './infoEditModal';

// utils
import { getAccountInfo } from '@/utils/accountControl';
import { createUrlForMedia, getMediaFromDb } from '@/utils/mediaControl';

export default function PostCard({account, postData, postMediaData}){
    
    const [loveLabel, setLoveLabel] = useState();
    const [laughLabel, setLaughLabel] = useState();
    const [sadLabel, setSadLabel] = useState();
    const [angryLabel, setAngryLabel] = useState();
    const [loveColor, setLoveColor] = useState('');
    const [laughColor, setLaughColor] = useState('');
    const [sadColor, setSadColor] = useState('');
    const [angryColor, setAngryColor] = useState('');

    const [profileImgUrl, setProfileImgUrl] = useState();
    const [username, setUsername] = useState();
    const [description, setDescription] = useState();
    const [datetime, setDatetime] = useState();
    const [media, setMedia] = useState();

    const showMedia = () => {
        if (!postMediaData) {return}
        const mediaUrl = createUrlForMedia(postMediaData)
        if (postMediaData?.media?.mediaType == 'image'){
            return <Image width="100%" maxHeight="400px" objectFit="contain" src={mediaUrl}></Image>
        }
    }

    useEffect(()=>{
        const getProfileImage = async () => {
            const media = await getMediaFromDb(account.account.profileImg)
            setProfileImgUrl(createUrlForMedia(media))
        }
        getProfileImage()
        console.log("ACCOUNT",account)
        setUsername(account.account.username)
        setDescription(postData.description)
        setDatetime(postData.createdAt)
        setMedia(showMedia())
    },[])

    const resetColor = () =>{
        setLoveColor('')
        setLaughColor('')
        setSadColor('')
        setAngryColor('')
    }
   
    const makeReaction = (e, reaction) => {
        const color_code = {love: "#faa2ee", laugh: "#eeff59", sad: "#a2b1fa",  angry: "#ff5959"}
        if (reaction == 'love'){
            resetColor()
            loveColor!=color_code.love ? setLoveColor(color_code.love): null
        }
        else if (reaction =='laugh')     {
            resetColor()
            laughColor!=color_code.laugh ? setLaughColor(color_code.laugh): null
        }else if (reaction =='sad') {
            resetColor()
            sadColor!=color_code.sad ? setSadColor(color_code.sad) : null
        }else if (reaction == 'angry'){
            resetColor()
            angryColor!=color_code.angry ? setAngryColor(color_code.angry) : null
        }
        
    }

    // ---------------------------------
    return (
        <VStack borderBottomWidth="2px" borderBottomColor="#E2E8F0" my="5px" py="5px" align='start'>
            
            {/*post Header */}
            <HStack>
                <Image width="50px" height="50px" objectFit="cover" mx="10px" borderWidth="5px" borderStyle="solid" borderRadius="50%" src={profileImgUrl ? profileImgUrl : "/p-default.png"}></Image>
                <VStack align='start' spacing="0px">
                    <Text fontSize="15px" fontWeight="bold">{username}</Text>
                    <Text fontSize="10px" fontColor="secondary">{datetime}</Text>
                </VStack>
            </HStack>

            {/*post Body */}
            <VStack width="100%" align="start">
                <Text>{description}</Text>
                <HStack width="100%" align="center" justifyContent="center" borderWidth="1px" borderColor="#E2E8F0" >
                    {media}
                </HStack>
            </VStack>

            {/*post Interact*/}
            <HStack>
                <Button
                    aria-label="Like"
                    leftIcon={<FaHeart />}
                    backgroundColor={loveColor}
                    size="sm"
                    onClick={(e) => {makeReaction(e, 'love')}}
                    _hover = {{backgroundColor: loveColor}}
                    onMouseEnter={()=>{setLoveLabel("Love: ")}}
                    onMouseLeave={()=>{setLoveLabel("")}}>
                    <Text fontSize="10px">{loveLabel}21</Text>
                </Button>
                <Button
                    aria-label="Laugh"
                    leftIcon={<FaLaughSquint/>}
                    backgroundColor={laughColor}
                    size="sm"
                    _hover = {{backgroundColor: laughColor}}
                    onClick={(e) => {makeReaction(e, 'laugh')}}
                    onMouseEnter={()=>{setLaughLabel("Laugh: ")}}
                    onMouseLeave={()=>{setLaughLabel("")}}>
                    <Text fontSize="10px">{laughLabel}5</Text>
                </Button>
                <Button
                    aria-label="Sad"
                    leftIcon={<FaSadTear/>}
                    backgroundColor={sadColor}
                    _hover = {{backgroundColor: sadColor}}
                    size="sm"
                    onClick={(e) => {makeReaction(e, 'sad')}}
                    onMouseEnter={()=>{setSadLabel("Sad: ")}}
                    onMouseLeave={()=>{setSadLabel("")}}>
                    <Text fontSize="10px">{sadLabel}5</Text>
                </Button>
                <Button
                    aria-label="Angry"
                    leftIcon={<FaAngry/>}
                    backgroundColor={angryColor}
                    _hover = {{backgroundColor: angryColor}}
                    size="sm"
                    onClick={(e) => {makeReaction(e, 'angry')}}
                    onMouseEnter={()=>{setAngryLabel("Angry: ")}}
                    onMouseLeave={()=>{setAngryLabel("")}}>
                    <Text fontSize="10px">{angryLabel}5</Text>
                </Button>
              
              
            
            </HStack>
            
            
        </VStack>
  
    );
}