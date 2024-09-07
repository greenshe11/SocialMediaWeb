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


/**
 * 
 * 
 * 
 * 
 * 
 * @param {function} infoFunc - contains the function to retrieve essential information to be used for dataFunc
 * @param {*} dataFunc - 
 * @returns a list - a promise
 */
export function SequentialLoad({contentFunction, infoObject, iterationLength}){
const [stateContent, setStateContent] = useState([0,[]])



  const process = async () => {

    
    const value = await contentFunction(infoObject, stateContent[0], stateContent[1])
    const newIndex = stateContent[0] + 1
    setStateContent([newIndex, value])
    console.log('states',stateContent[1])
    if (stateContent[1].length <= iterationLength - 1){

        return 
        
    }else{
        return process()
    }
  }

   useEffect(()=>{
        process()
   }, []) // iterative run

   return <>{stateContent[1]}</>
}
