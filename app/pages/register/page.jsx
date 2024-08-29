import SignupCard from "@/components/signupCard";
import { Box} from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react'
export default function Home() {
  const colorTheme = "#2E2F37";
  return (
  <ChakraProvider>
       <Box 
       bg={colorTheme}
       w="100vw"
       display="flex"
       justifyContent="center"
       alignItems="center">
        <SignupCard colorTheme={colorTheme}/>
      </Box>
  </ChakraProvider>
     
  );
}
