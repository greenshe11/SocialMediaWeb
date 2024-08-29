"use client";

import InfoCard from "@/components/infoCard";
import { Flex,Text, Box, CardHeader, CardFooter, Card, Image, CardBody, VStack} from '@chakra-ui/react';
import InfoEditModal from "@/components/infoEditModal";
import { ChakraProvider } from '@chakra-ui/react'
import FileUpload from "@/components/fileUpload";
import { signOut, useSession } from "next-auth/react"
import PostCard from "@/components/postCard";

export default function Home() {
  const sessionObj = useSession();
  const colorTheme = "#2E2F37";
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
                  <PostCard/>
                  <PostCard/>
                  <PostCard/><PostCard/><PostCard/><PostCard/><PostCard/><PostCard/><PostCard/>
                  <PostCard/>
                </CardBody>
        </Card>
       </VStack>
      </Box>
      </Flex>
  </ChakraProvider>
     
  );
}

/*   */