"use client";


import Image from "next/image";
import styles from "./page.module.css";
import LoginCard from "@/components/loginCard";
import { Text, Box} from '@chakra-ui/react';
import { useRouter } from "next/navigation";

import { signOut, useSession } from "next-auth/react"

import { ChakraProvider } from '@chakra-ui/react'
import { useEffect } from "react";
export default function Home() {
  const colorTheme = "#2E2F37";
  const router = useRouter();

  const {data: session, status} = useSession()
  
  useEffect(() => {
    if (status === 'authenticated') {
      // If the user is authenticated, redirect to the profile page
      //router.push('pages/profile');
    }
  }, [status, router]);
  
  //if (status === 'unauthenticated'){
  return (
  <ChakraProvider>
       <Box 
       bg={colorTheme}
       h="100vh"
       w="100vw"
       display="flex"
       justifyContent="center"
       alignItems="center">
        <LoginCard colorTheme={colorTheme}/>
      </Box>
  </ChakraProvider>
     
  );
  //}
}
