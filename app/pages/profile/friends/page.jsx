"use client";

import InfoCard from "@/components/infoCard";
import { Flex,Text, Box, CardHeader, CardFooter, Card, Image, CardBody, VStack} from '@chakra-ui/react';
import InfoEditModal from "@/components/infoEditModal";
import { ChakraProvider } from '@chakra-ui/react'
import FileUpload from "@/components/fileUpload";
import { signOut, useSession } from "next-auth/react"
import PostCard from "@/components/postCard";
import { useEffect, useState } from "react";
import { getPostsFromDb } from "@/utils/postsControl";
import { getMediaFromDb, getMediaFromDbUsingPost, getMediaUrlFromMediaId } from "@/utils/mediaControl";
import { getAccountInfo } from "@/utils/accountControl";
import FriendCard from "@/components/friendCard";
import { getFriendRequests, getFriends } from "@/utils/friendsControl";
import { SequentialLoad, sequentialLoad } from "@/utils/behaviors";


export default function FriendsList() {
  const sessionObj = useSession();
  const colorTheme = "#2E2F37";
  const [contentJ, setContentJ] = useState([])
  const [infoHead, setInfoHead] = useState()

  const reloadFriendCards = () => {
    getFriendsCard()
  }

  const getFriendsCard = async () =>{
    let count = 0
    const addCount = () =>{
      count = count + 1
      return count
      }
    
    const account = await getAccountInfo(sessionObj.data?.id)
    const pendingFriends = await getFriendRequests(account?.account._id)
    const confirmedFriends = await getFriends(account?.account._id, "confirmed")
    console.log("PENDINGFRIENDS", pendingFriends)
    
    const getProfileImageUrl = async (targetAccount) =>{
      const mediaUrl = await getMediaUrlFromMediaId(targetAccount?.account?.profileImg, "/p-default.png")
      return mediaUrl
     }
    const jsx = []
    for (let index=0; index<pendingFriends.content.length; index++){
      const targetAccount = await getAccountInfo(pendingFriends.content[index].targetUserId)
      const profileImageUrl = await getProfileImageUrl(targetAccount)
      jsx.push(<FriendCard key={addCount()} account={account?.account} targetAccount={targetAccount.account} state={pendingFriends.content[index].state} profileImageUrl={profileImageUrl} refresherFunc={reloadFriendCards}/>)
      
    }
    for (let index2=0; index2<confirmedFriends?.content.length; index2++){
      const oppositeUserId = () => {
        if (confirmedFriends?.content[index2].sourceUserId == account?.account._id){
          return confirmedFriends?.content[index2].targetUserId
        }
        else{
          return confirmedFriends?.content[index2].sourceUserId
        }
      }
      const targetAccount2 = await getAccountInfo(oppositeUserId())
      const profileImageUrl2 = await getProfileImageUrl(targetAccount2)
      jsx.push(<FriendCard key={addCount()} account={account?.account} targetAccount={targetAccount2?.account} state={confirmedFriends?.content[index2].state} profileImageUrl={profileImageUrl2} refresherFunc={reloadFriendCards}/>)
    }

    setContentJ(jsx)

  }

  useEffect(()=>{
   
    if (sessionObj.status == "authenticated") {
        console.log("AUTHENITICATED!")
        setContentJ(<Text textAlign="center" color={colorTheme}>Loading...</Text>)
        getFriendsCard()
        setInfoHead(<InfoCard sessionObj={sessionObj} infoId={sessionObj.data.id} reloader={reloadFriendCards} colorTheme={colorTheme} mode="friendsList"/>)
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
        <Card
            w={{base:"90%", md:"50%"}}
            >
              {contentJ}

             
        </Card>
       </VStack>
      </Box>
      </Flex>
  </ChakraProvider>
     
  );
}

/*   */