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
import { getMediaFromDb, getMediaFromDbUsingPost } from "@/utils/mediaControl";
import { getAccountInfo } from "@/utils/accountControl";

export default function Home() {
  const sessionObj = useSession();
  const colorTheme = "#2E2F37";
  const [posts, setPosts] = useState();

  useEffect(()=>{
    const fetchInfo = async () => {
      const posts_jsx = []
      const account = await getAccountInfo(sessionObj.data?.id)
      const allPosts = await getPostsFromDb(sessionObj.data?.id)
      for (let i=0 ; i<allPosts.length; i++){
        let postMediaData = await getMediaFromDbUsingPost(allPosts[i]._id)
        posts_jsx.push(<PostCard account={account} postData={allPosts[i]} postMediaData={postMediaData}/>)
      }
      setPosts(posts_jsx.reverse())

        
    }

    if (sessionObj.status == "authenticated") {
        console.log("AUTHENITICATED!")
        fetchInfo()

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
       <InfoCard sessionObj={sessionObj} colorTheme={colorTheme}/>
       <Box h="10px" mb="10px" w={{base:"90%", md:"50%"}} ml = "20px" textAlign="left" >
            <Text color="white">Posts</Text>
        </Box> 
        <Card
            w={{base:"90%", md:"50%"}}
            >
                <CardBody textAlign="center">
                  {posts}
                </CardBody>
        </Card>
       </VStack>
      </Box>
      </Flex>
  </ChakraProvider>
     
  );
}

/*   */