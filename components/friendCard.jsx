"use client";

import {VStack, Image, Box, Card, CardBody, CardHeader, chakra, FormControl, SlideFade, Text, useDisclosure, CardFooter, HStack, Divider, Spacer} from '@chakra-ui/react';
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
import { createUrlForMedia, getMediaFromDb, getMediaUrlFromMediaId } from '@/utils/mediaControl';
import { createReaction, updateReaction, deleteReaction, getReactionsFromPost, getUserReactionFromPost } from '@/utils/reactionControl';
import { sequentialLoad } from '@/utils/behaviors';
import { cancelFriendRequest } from '@/utils/friendsControl';

export default function FriendCard({account, targetAccount, state, refresherFunc, profileImageUrl}){
    const router = useRouter();
    const [btnUnfriendDisplay, setBtnUnfriendDisplay] = useState("none");
    const [btnCancelDisplay, setBtnCancelDisplay] = useState("none");
    const [profileImage, setProfileImage] = useState("/p-default.png");

    

    const onClickCancelFriendRequest = async () => {
        
        const res = await cancelFriendRequest({$or: [{targetUserId: targetAccount._id, sourceUserId: account._id}, 
            {targetUserId: account._id, sourceUserId: targetAccount._id}
        ]})
        
        console.log("FRIEND REQUEST CANCELLED")
        refresherFunc()
    }
        
    useEffect(()=>{
        if (state=="confirmed"){
            setBtnCancelDisplay("none")
            setBtnUnfriendDisplay("block")
        }
        else if(state=="pending"){
            setBtnCancelDisplay("block")
            setBtnUnfriendDisplay("none")
        
        }
    },[])

    
    // ---------------------------------
    return (
        <Card p="10px" w="100%">
        <HStack>
            <Image width="50px" height="50px" objectFit="cover" mx="10px" borderWidth="5px" borderStyle="solid" borderRadius="50%" src={profileImageUrl }></Image>
            <Text fontSize="15px" fontWeight="bold"><Link onClick={(e)=>{router.push(`/pages/profile/friends/${targetAccount._id}`)}}>{targetAccount.username}</Link></Text>
            <Spacer/>
            <Button px="10px" textColor="white" onClick={(e)=>{onClickCancelFriendRequest(e)}} display={btnCancelDisplay} backgroundColor="rgb(190,100,100)" sx={{_hover: {backgroundColor:"rgb(180,50,50)", color: "white"}}}>Cancel Request</Button>
            <Button px="10px" textColor="white" onClick={(e)=>{onClickCancelFriendRequest(e)}} display={btnUnfriendDisplay} backgroundColor="rgb(190,100,100)" sx={{_hover: {backgroundColor:"rgb(180,50,50)", color: "white"}}}>Unfriend</Button>
            
        </HStack>
    </Card>
  
    );
}