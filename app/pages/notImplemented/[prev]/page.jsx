"use client";

import { Stack, Button, Text, Box} from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/navigation';
export default function Home({params}) {
  const colorTheme = "#009578";
  const router = useRouter();
  return (
  <ChakraProvider>
    <Box
    bg={colorTheme}
    h="100vh"
    w="100vw"
    display="flex"
    padding="20px"
    justifyContent="center"
    alignItems="center">
        <Stack spacing="40px">
            <Text
            fontWeight="bold"
            fontSize={{base: "10px", md: "20px"}}
            color="white">
                Not Yet Implemented
            </Text>
            <Button
            onClick={()=>{router.push(`/${params.prev}`)}}>
                Go Back
            </Button>
        </Stack>
    </Box>
  </ChakraProvider>
  );
}
