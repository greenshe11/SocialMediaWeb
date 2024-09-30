import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export function MessageUser({profileImg, name}) {
  return (
    <Box 
        sx={{
            _hover: {backgroundColor: "rgb(240,240,240)",
            cursor:"pointer",
            borderColor: "gray"
            }
            
        }}
        height="100px"
        width="100%"
        borderLeftWidth="4px"
        borderBottomWidth="4px"
        borderBottomLeftRadius="20px"
        paddingLeft="10px"
        borderStyle="solid">
        
        <Image 

            width="50px"
            height="50px"
            objectFit="cover"
            borderRadius="50%"
            borderWidth="2px"
            borderStyle="solid"
            src="/p-default.png">
        
        </Image>
        <Text textAlign="start">Name</Text>
    </Box>
  );
}

