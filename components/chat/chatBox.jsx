"use client";

import { Flex,Text, Box, CardHeader, CardFooter, Card, Image, CardBody, VStack, HStack} from '@chakra-ui/react';
import { UserScroll } from './userScroll';
import { MessageBox } from './messageBox';
import { MessageUser } from './messageUser';

export default function ChatBox({users}) {
  return (
    
  <Card
      w={{base:"90%", md:"50%"}}
      >
          <CardBody textAlign="center">
            <HStack>
              <UserScroll width="30%"
                content={

                  [<MessageUser profileImg={null} name={null}/>,
                  <MessageUser/>,
                  <MessageUser/>,
                  <MessageUser/>,
                  <MessageUser/>,
                  <MessageUser/>,
                  <MessageUser/>]
                }
              />
              <MessageBox conversation={null} width="70%"/>
            </HStack>
          </CardBody>
  </Card>
     
  );
}

/*   */