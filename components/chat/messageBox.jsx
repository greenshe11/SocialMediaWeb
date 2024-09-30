import { Box, Button, Flex, HStack, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export function MessageBox({conversation}) {
  const boxRef = useRef(null);  // Reference to the Box
  
  return (
    <Box
      ref = {boxRef}
      height="60vh"  // Set the max height of the scrollable area
      width = "30%">
        <VStack>
            <Box
            height="50vh"  // Set the max height of the scrollable area
            overflowY="scroll" // Enable vertical scrollingS
            width = "100%"> 
                <VStack color='black'>
                  
                  <Box w="80%" textAlign="left" ml='auto' mr='0px' backgroundColor='rgba(150,150,250)' fontSize='20px' color='black' p='10px'
                  borderTopLeftRadius="20px" wordBreak="word-break" whiteSpace="normal">    
                      Hello, how are you? asdinduwjeaindilwedfunjliekfbjdnwiekrjbdnweilhkbj
                  </Box>
                  <Text fontSize='10px' mt="-5px" ml='auto'>11/21/2000 11:24am</Text>

                  <Box w="80%" textAlign="left" mr='auto' ml='0px' backgroundColor='rgba(200,200,200)' fontSize='20px' color='black' p='10px'
                  borderTopRightRadius="20px" wordBreak="word-break" whiteSpace="normal">    
                      Hello, how are you? asdinduwjeaindilwedfunjliekfbjdnwiekrjbdnweilhkbj
                  </Box>
                  <Text fontSize='10px' mt="-5px" mr='auto'>11/21/2000 11:24am</Text>

                  <Box w="80%" textAlign="left" mr='auto' ml='0px' backgroundColor='rgba(200,200,200)' fontSize='20px' color='black' p='10px'
                  borderTopRightRadius="20px" wordBreak="word-break" whiteSpace="normal">    
                      Hello, how are you? asdinduwjeaindilwedfunjliekfbjdnwiekrjbdnweilhkbj
                  </Box>
                  <Text fontSize='10px' mt="-5px" mr='auto'>11/21/2000 11:24am</Text>

                  <Box w="80%" textAlign="left" mr='auto' ml='0px' backgroundColor='rgba(200,200,200)' fontSize='20px' color='black' p='10px'
                  borderTopRightRadius="20px" wordBreak="word-break" whiteSpace="normal">    
                      Hello, how are you? asdinduwjeaindilwedfunjliekfbjdnwiekrjbdnweilhkbj
                  </Box>
                  <Text fontSize='10px' mt="-5px" mr='auto'>11/21/2000 11:24am</Text>

                  <Box w="80%" textAlign="left" mr='auto' ml='0px' backgroundColor='rgba(200,200,200)' fontSize='20px' color='black' p='10px'
                  borderTopRightRadius="20px" wordBreak="word-break" whiteSpace="normal">    
                      Hello, how are you? asdinduwjeaindilwedfunjliekfbjdnwiekrjbdnweilhkbj
                  </Box>
                  <Text fontSize='10px' mt="-5px" mr='auto'>11/21/2000 11:24am</Text>

                  <Box w="80%" textAlign="left" mr='auto' ml='0px' backgroundColor='rgba(200,200,200)' fontSize='20px' color='black' p='10px'
                  borderTopRightRadius="20px" wordBreak="word-break" whiteSpace="normal">    
                      Hello, how are you? asdinduwjeaindilwedfunjliekfbjdnwiekrjbdnweilhkbj
                  </Box>
                  <Text fontSize='10px' mt="-5px" mr='auto'>11/21/2000 11:24am</Text>

                  <Box w="80%" textAlign="left" mr='auto' ml='0px' backgroundColor='rgba(200,200,200)' fontSize='20px' color='black' p='10px'
                  borderTopRightRadius="20px" wordBreak="word-break" whiteSpace="normal">    
                      Hello, how are you? asdinduwjeaindilwedfunjliekfbjdnwiekrjbdnweilhkbj
                  </Box>
                  <Text fontSize='10px' mt="-5px" mr='auto'>11/21/2000 11:24am</Text>

                  <Box w="80%" textAlign="left" mr='auto' ml='0px' backgroundColor='rgba(200,200,200)' fontSize='20px' color='black' p='10px'
                  borderTopRightRadius="20px" wordBreak="word-break" whiteSpace="normal">    
                      Hello, how are you? asdinduwjeaindilwedfunjliekfbjdnwiekrjbdnweilhkbj
                  </Box>
                  <Text fontSize='10px' mt="-5px" mr='auto'>11/21/2000 11:24am</Text>
                  
                </VStack>
            </Box>
            
            <Flex
            borderTopWidth="5px"
            borderTopStyle="solid"
            width="100%"
            height="10vh">
                <HStack
                width="100%">
                    <Textarea
                    width="80%"
                    borderWidth="0px"
                    borderBottomWidth="2px"
                    borderStyle="solid"
                    borderColor='black'
                    minHeight="8vh"
                    maxHeight="8vh"
                    resize="none"
                    backgroundColor="white"
                    borderRadius="0px"
                    placeholder="Type Here..."
                    aria-multiline="true"
                    />
                    <Button
                    width="10%"
                    height="8vh"
                    fontSize="10px"
                    backgroundColor="rgba(150,150,255)">
                        Send
                    </Button>

                </HStack>
            </Flex>
        </VStack>
    </Box>
    
  );
}

