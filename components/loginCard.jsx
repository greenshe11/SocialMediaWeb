"use client";

import {Card, CardBody, CardHeader, chakra, FormControl, SlideFade, Text, useDisclosure} from '@chakra-ui/react';
import {Link, Stack, Input, Button} from '@chakra-ui/react';

import { useEffect, useState } from "react";
import {signIn} from "next-auth/react";
import { useRouter } from 'next/navigation';

export default function LoginCard({colorTheme}){
    const router = useRouter();

   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { isOpen, onToggle } = useDisclosure()
    

    const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const res = await signIn('credentials',{
        email, password, redirect: false
        });
        if (res.error){
         alert("Incorrect Credentials!")
        }
        router.replace('pages/profile')
    }
    catch(error){
        console.log(error);
    }
    };

    useEffect(() => {
        let ignore = false;

        if (!ignore) {onToggle()};
        return () => { ignore = true; }
        },[]);
    
    return (
        <SlideFade in={isOpen} offsetY='20px'  transition={{ enter: { duration: 0.5 }, exit: { duration: 0.3 } }}>
        <Card 
        w="400px"
        h={{base:"440px",  sm:"420", md:"400px",}}
        display="flex"
        justifyContent="center"
        mx={{base:"10px"}}
        textAlign="center">

            <CardHeader fontWeight="bold" fontSize="x-large" marginTop="20px">
                Login to your account
            </CardHeader>

            <CardBody>
                <form onSubmit={handleSubmit}>
                <FormControl>
                <Stack spacing="20px">
                    <Input variant="outline" placeholder='Email' type='email' onChange={(e)=>{setEmail(e.target.value)}}></Input>
                    <Input variant="outline" placeholder="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}}></Input>
                  
                    <Link>
                        <Text 
                        color={colorTheme} 
                        textAlign="left"
                        onClick={()=>{router.push('pages/notImplemented/')}}>
                            Forgot Password?
                        </Text>    
                    </Link>
                    <Button 
                    bg={colorTheme} 
                    color="white"
                    type="submit"
                    
                    sx={{
                        ":hover": {
                            bg: "orange"
                        }
                    }}> 
                        Sign In
                    </Button>
                    <Text>
                        Don't have an account? 
                        <Link 
                        ml="5px" 
                        color={colorTheme}
                        onClick={()=>{router.push('/pages/register')}}>
                            Signup
                        </Link>
                    </Text>
                </Stack>
                </FormControl>
                </form>
            </CardBody>

        </Card>
        </SlideFade>
    );
}