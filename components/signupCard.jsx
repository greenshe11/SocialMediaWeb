"use client";

import {Card, CardBody, CardHeader, FormControl,SlideFade, useDisclosure, Text} from '@chakra-ui/react';
import {Link, Stack, Input, Button} from '@chakra-ui/react';
import {useRouter} from "next/navigation";
import bcrypt from "bcryptjs";
import { useState, useEffect } from 'react';


export default function SignupCard({colorTheme}){

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [password, setPassword] = useState("");
    const { isOpen, onToggle } = useDisclosure()
    const [password2, setPassword2] = useState("");

    const handleSubmit =  async (e) => {
        e.preventDefault();
      
        if (!email || !password){
                alert("Title and description are required!");
            }else  if (password!=password2){
                alert("Passwords do not match!");
            }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            try {
                const res = await fetch('../api/accounts',{
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({email, password: hashedPassword, profileImg: null, username, address, birthdate}),
                })

                if (res.ok){
                    alert("Successfully created account!")
                    router.push('/');
                    
                }else{
                    throw new Error("failed");
                }
            }catch(error){
                console.log(error);
            }
        }
    }
    
    useEffect(() => {
        let ignore = false;

        if (!ignore) {onToggle()};
        return () => { ignore = true; }
        },[]);
    return (
        <SlideFade in={isOpen} offsetY='20px' transition={{ enter: { duration: 1 }, exit: { duration: 0.3 } }}>
        <Card 
        w="400px"
        display="flex"
        mx={{base:"10px"}}
        justifyContent="center"
        textAlign="center">

            <CardHeader fontWeight="bold" fontSize="x-large" marginTop="20px">
                Create your account
            </CardHeader>

            <CardBody>
                <form onSubmit={handleSubmit}>
                <FormControl>
                <Stack spacing="20px">
                    <Input variant="outline" placeholder='Email' type="email" onChange={(e)=>{setEmail(e.target.value)}} ></Input>
                    <Input variant="outline" placeholder='Username' onChange={(e)=>{setUsername(e.target.value)}} ></Input>
                    <Input variant="outline" placeholder='Address' onChange={(e)=>{setAddress(e.target.value)}} ></Input>
                    <Input variant="outline" placeholder='Birthdate' type="date" onChange={(e)=>{setBirthdate(e.target.value)}} ></Input>
                    <Input variant="outline" placeholder="Password" type="password" onChange={(e)=>{setPassword(e.target.value)}}></Input>
                    <Input variant="outline" placeholder="Confirm Password" type="password" onChange={(e)=>{setPassword2(e.target.value)}}></Input>                   
                    <Button 
                    bg={colorTheme} 
                    color="white"
                    type="submit"
                    sx={{
                        ":hover": {
                            bg: "orange"
                        }
                    }}> 
                        Register
                    </Button>
                    <Text>
                        Already have an account? 
                        <Link 
                        ml="5px" 
                        color={colorTheme}
                        onClick={()=>{router.push('/')}}>
                            Login
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

