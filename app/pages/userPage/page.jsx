"use client";

import { Stack, Button, Text, Box} from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
import { signOut, useSession } from "next-auth/react"

export default function Home() {
  const colorTheme = "#2E2F37";
  const {data: session} = useSession();

  return (
  <ChakraProvider>
    <Box
    bg={colorTheme}
    h="100vh"
    w="100vw"
    padding="20px"
    display="flex"
    justifyContent="center"
    alignItems="center">
        <Stack spacing="40px">
            <Text
            fontWeight="bold"
            fontSize={{base: "10px", md: "20px"}}
            color="white">
                You are logged in using {session?.user?.email}.
            </Text>
            <Button bg="red"
            onClick={()=>{signOut()}}>
                Log Out
            </Button>
        </Stack>
    </Box>
  </ChakraProvider>
  );
}