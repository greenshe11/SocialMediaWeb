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
import { render } from "react-dom";
import { usePathname, useRouter } from "next/navigation";

export default function Home() {
  const url = usePathname()
  const pattern = "(?<=/)[^/]+$"
  const id = url.match(pattern)[0]
  const sessionObj = useSession()
  const colorTheme = "#2E2F37";
  const [posts, setPosts] = useState([0,[]]); //iteration, posts
  const [info, setInfo] = useState([undefined, undefined]); // account, allPosts

  const getPosts = async () =>{
    const index = info[1].length - 1- posts[0]
    let postMediaData = await getMediaFromDbUsingPost(info[1][index]?._id)
    
    const tempJsx = posts[1]
    if (!info[1][index]){return}
    if (tempJsx.find(post => post.key == posts[0])){return}
    
    tempJsx.push(<PostCard key={posts[0]} account={info[0]} postData={info[1][index]} postMediaData={postMediaData}/>)
    setPosts([posts[0]+1, tempJsx])
  }

  useEffect(()=>{
    const fetchInfo = async () => {
      const account = await getAccountInfo(id)
      const allPosts = await getPostsFromDb(id)
      setInfo([account, allPosts])  
    }

    if (sessionObj.status == "authenticated") {
        console.log("AUTHENITICATED!")
        fetchInfo()

    }
}, [sessionObj.status]);

   useEffect(()=>{
    if (info[0]==undefined || info[1]==undefined){return}
    getPosts()
   }, [info]) // first run

   useEffect(()=>{
    console.log("INFO", info[0], info[1])
    console.log("INFOPOSTS", posts[0], posts[1])
    if (info[0]==undefined || info[1]==undefined){return}
    if (info[1].length <= posts[0]){return}

    getPosts()
   },[posts]) // iterative run
  return (
  <ChakraProvider>
  <Flex>
       <Box
       bg={colorTheme}
       height="100%"
       w="100vw">
       <VStack>
       <InfoCard sessionObj={sessionObj} infoId={id} colorTheme={colorTheme} mode="visit"/>
       
        <Card
            w={{base:"90%", md:"50%"}}
            >
                <CardBody textAlign="center">
                  {posts[1]}
                </CardBody>
        </Card>
       </VStack>
      </Box>
      </Flex>
  </ChakraProvider>
     
  );
}

/*   */