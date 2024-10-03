"use client";


import Image from "next/image";
import styles from "./page.module.css";
import LoginCard from "@/components/loginCard";
import { Text, Box} from '@chakra-ui/react';
import { useRouter } from "next/navigation";

import { signOut, useSession } from "next-auth/react"

import { ChakraProvider } from '@chakra-ui/react'
import { useEffect, useState } from "react";

export default function Home() {
  const colorTheme = "#2E2F37";
  const router = useRouter();
  const [content, setContent] = useState()
  const {data: session, status} = useSession()
  useEffect(()=>{

    if (status=='authenticated'){
      router.push('/pages/profile');
    }
    else if (status=='unauthenticated'){
      setContent(<ChakraProvider>
        <Box 
        bg={colorTheme}
        h="100vh"
        w="100vw"
        display="flex"
        justifyContent="center"
        alignItems="center">
          <LoginCard colorTheme={colorTheme}/>
        </Box>
    </ChakraProvider>)
    }
  },[status])

 

  return (
  <ChakraProvider>
  {content}
  </ChakraProvider>
  )
}
