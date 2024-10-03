import { Box, Button, Flex, HStack, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export function MessageBox({width, conversation, onClickSendState, selectedState}) {
  const boxRef = useRef(null);  // Reference to the Box
  const sendRef = useRef(null);
  const scrollRef = useRef(null);


  const [ text, setText ] = useState()
  const [messageContent, setMessageContent]= useState()

  const onClickSend = () => {
    // [roomId, userId, message]
    console.log("SENDING MESSAGE", selectedState[0], selectedState[1], text)
    setText("")
    onClickSendState([selectedState[0], selectedState[1], text ])
  }

  useEffect(()=>{
    const tempContent = []
    console.log("SETTING CONVERSATION   ")
    for (let i=0; i<conversation.length; i++){
        // index 0: user
        // index 1: message
        if (conversation[i][0] == 'you'){
            tempContent.push(
                <Box w="80%" textAlign="left" ml='auto' mr='0px' backgroundColor='rgba(150,150,250)' fontSize='20px' color='black' p='10px'
                  borderTopLeftRadius="20px" wordBreak="word-break" whiteSpace="normal">    
                      {conversation[i][1]}
                </Box>
            )
        
        }else{
            tempContent.push(
                <Box w="80%" textAlign="left" mr='auto' ml='0px' backgroundColor='rgba(200,200,200)' fontSize='20px' color='black' p='10px'
                  borderTopRightRadius="20px" wordBreak="word-break" whiteSpace="normal">    
                      {conversation[i][1]}
                </Box>
            )
        }
    }
    setMessageContent(tempContent)
    
  },[conversation])

  useEffect(()=>{
    if (scrollRef.current) {

        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;

    }
    
    console.log(scrollRef.current.scrollTop)
    
    
  }, [messageContent])
  return (
    <Box
      ref = {boxRef}
      height="60vh"  // Set the max height of the scrollable area
      width = {width?width:'30%'}>
        <VStack>
            <Box 
            ref = {scrollRef}
            height="50vh"  // Set the max height of the scrollable area
            overflowY="scroll" // Enable vertical scrollingS
            width = "100%"> 
                <VStack color='black'>
                    {messageContent}
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
                    value = {text}
                    onChange={(e)=>{setText(e.target.value)}}
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
                    ref = {sendRef}
                    onClick={onClickSend}
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

