import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { socket } from "@/utils/socketControl";
export function MessageUser({profileImg, name, roomId, userId, onClickUserState, setSelectedState, borderColor}) {
  
  const onClickUser = () => {
    console.log("DETECING CHAT USER CLICK")
    onClickUserState([roomId, userId])
    setSelectedState([roomId, userId])
  }



  return (
    <Box 
        onClick={onClickUser}
        sx={{
            _hover: {backgroundColor: "rgb(240,240,240)",
            cursor:"pointer",
            borderColor: "black"
            }
        }}
  
        height="100px"
        width="100%"
        borderLeftWidth="4px"
        borderBottomWidth="4px"
        borderBottomLeftRadius="20px"
        paddingLeft="10px"
        borderColor= {borderColor}
        borderStyle="solid">
        
        <Image 
            
            width="50px"
            height="50px"
            objectFit="cover"
            borderRadius="50%"
            borderWidth="2px"
            borderStyle="solid"
            src={profileImg?profileImg:"/p-default.png"}>
        
        </Image>
        <Text textAlign="start">{name}</Text>
    </Box>
  );
}

