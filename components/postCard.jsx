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
import { createReaction, updateReaction, deleteReaction, getReactionsFromPost, getUserReactionFromPost } from '@/utils/reactionControl';

export default function PostCard({account, postData, postMediaData}){
    const [posterAccount, setPosterAccount] = useState();
    const [loveLabel, setLoveLabel] = useState();
    const [laughLabel, setLaughLabel] = useState();
    const [sadLabel, setSadLabel] = useState();
    const [angryLabel, setAngryLabel] = useState();
    const [loveColor, setLoveColor] = useState('');
    const [laughColor, setLaughColor] = useState('');
    const [sadColor, setSadColor] = useState('');
    const [angryColor, setAngryColor] = useState('');
    const [loveCount, setLoveCount] = useState(0);
    const [laughCount, setLaughCount] = useState(0);
    const [angryCount, setAngryCount] = useState(0);
    const [sadCount, setSadCount] = useState(0);

    const [profileImgUrl, setProfileImgUrl] = useState();
    const [username, setUsername] = useState();
    const [description, setDescription] = useState();
    const [datetime, setDatetime] = useState();
    const [media, setMedia] = useState();

    const color_code = {love: "#faa2ee", laugh: "#eeff59", sad: "#a2b1fa",  angry: "#ff5959"}

    const showMedia = () => {
        if (!postMediaData) {return}
        const mediaUrl = createUrlForMedia(postMediaData)
        if (postMediaData?.media?.mediaType == 'image'){
            return <Image width="100%" maxHeight="400px" objectFit="contain" src={mediaUrl}></Image>
        }
    }

    const showReactionsColors = (reaction) => {
        
        if (reaction == "laugh") {
            setLaughColor(color_code.laugh)
        }
        else if (reaction == "love") {
            setLoveColor(color_code.love)
        }
        else if (reaction == "sad") {
            setSadColor(color_code.sad)
        }
        else if (reaction == "angry") {
            setAngryColor(color_code.angry)
        }
       
    }

    const showReactions = async () => {
        
        const reactionData = await getReactionsFromPost(postData._id)
        let tempLoveCount = 0;
        let tempLaughCount = 0;
        let tempAngryCount = 0;
        let tempSadCount = 0;
        console.log(reactionData)
        for (let i=0; i<reactionData.content.length; i++){
            if (reactionData.content[i].reaction == "love"){
                tempLoveCount += 1;
            }else if( reactionData.content[i].reaction == "sad"){
                tempSadCount += 1;
            }else if( reactionData.content[i].reaction == "angry"){
                tempAngryCount += 1;
            }else if( reactionData.content[i].reaction == "laugh"){
                tempLaughCount += 1;
            }
            if (reactionData.content[i].reactorId==account.account._id){
                resetColor()
                showReactionsColors( reactionData.content[i].reaction)
            }
        }
        setLoveCount(tempLoveCount)
        setSadCount(tempSadCount)
        setLaughCount(tempLaughCount)
        setAngryCount(tempAngryCount)
        

        
    }

    const resetColor = () =>{
        setLoveColor('')
        setLaughColor('')
        setSadColor('')
        setAngryColor('')
    }

    const getPosterAccount = async () => {
        const resPosterAccount = await getAccountInfo(postData.userId)
        setPosterAccount(resPosterAccount.account)
        return resPosterAccount.account
    }

    const getProfileImage = async (resPosterAccount) => {
        const media = await getMediaFromDb(resPosterAccount.profileImg)
        setProfileImgUrl(createUrlForMedia(media))
    }
    const getInitialData = async() => {
        const resPosterAccount = await getPosterAccount()
        console.log("POSTERACCOUNT", resPosterAccount)
        getProfileImage(resPosterAccount)
        setUsername(resPosterAccount.username)
        setDescription(postData.description)
        setDatetime(postData.createdAt)
        setMedia(showMedia())
        showReactions()
    }

    const makeReaction = async (e, reaction) => {
        const currentReaction = await getUserReactionFromPost(postData._id, account.account._id)
        console.log(currentReaction)
        if (!currentReaction.content){
            console.log('creating reaction')
            await createReaction(postData._id, account.account._id, posterAccount._id, reaction)
        }else if (currentReaction.content.reaction == reaction) {
            console.log('deleting reaction')
            await deleteReaction(postData._id, account.account._id)
            resetColor()
        }
        else{
            console.log('updating reaction')
            await updateReaction(postData._id, account.account._id, reaction)
        }
        showReactions()
        
    }

    // -----------------------------------
    
    useEffect(()=>{
        getInitialData()
    },[])

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
                    <Text fontSize="10px">{loveLabel}{loveCount}</Text>
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
                    <Text fontSize="10px">{laughLabel}{laughCount}</Text>
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
                    <Text fontSize="10px">{sadLabel}{sadCount}</Text>
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
                    <Text fontSize="10px">{angryLabel}{angryCount}</Text>
                </Button>
              
              
            
            </HStack>
            
            
        </VStack>
  
    );
}