"use client";

import { Flex,Text, Box, CardHeader, CardFooter, Card, Image, CardBody, VStack, HStack} from '@chakra-ui/react';
import { UserScroll } from './userScroll';
import { MessageBox } from './messageBox';
import { MessageUser } from './messageUser';
import { useEffect, useState } from 'react';

export default function ChatUsersBox({getUsersFunc, onClickUserState, userId, conversation, onClickSendState, setSelectedState, selectedState, usersDataCopy, setUsersDataCopy}) {
  const [users, setUsers] = useState()

  const dataToComponent = (data) => {
    return (
    <MessageUser 
      onClickUserState={onClickUserState} 
      profileImg={data.targetUserImage}//{userRooms[i].targetUserImage} 
      name={data.targetUserName}//{userRooms[i].targetUserName} 
      userId={data.userId}//{userRooms[i].userId}
      roomId={data.roomId}//{userRooms[i].roomId}
      setSelectedState={setSelectedState}
      borderColor={data.borderColor}>
    </MessageUser>)
  }
  useEffect(()=>{
    const getInfo = async () =>{ 
      const userRooms = await getUsersFunc(userId)
      let tempRes = []
      let tempResDataCopy = []
      console.log("DD",userRooms)
  
      for (let i=0; i<userRooms.length; i++){
        console.log("ROOM", userRooms)
       
        tempRes.push(
        dataToComponent(userRooms[i]))
        userRooms[i].borderColor = "gray"
        tempResDataCopy.push(userRooms[i])
      
      }

      setUsersDataCopy(tempResDataCopy)
      setUsers(tempRes)

    }
    getInfo()
    
  },[userId])

  useEffect(()=>{
    console.log("SELECTED STATE")
    if (selectedState){
      const tempRes = []
      const data = usersDataCopy
      for (let i=0; i<data.length; i++){
        if (selectedState[0] == data[i].roomId){
          data[i].borderColor = "green"
        }else{
          data[i].borderColor = "gray"
        }
        tempRes.push(dataToComponent(data[i]))
      }
      setUsers(tempRes)
    }

  },[selectedState])
  
  return (
  
  <Card
      w={{base:"90%", md:"50%"}}
      >
          <CardBody textAlign="center">
            <HStack>
              <UserScroll width="30%"
                content={

                  users
                }
              />
              <MessageBox conversation={conversation} onClickSendState={onClickSendState} selectedState={selectedState} width="70%"/>
            </HStack>
          </CardBody>
  </Card>
     
  );
}

/*   */