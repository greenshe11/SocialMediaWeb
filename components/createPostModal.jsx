"use client";

import { createLocalFileUrl } from '@/utils/mediaControl';
import { VStack, FormControl, Modal, ModalHeader, ModalCloseButton, ModalBody, Text, ModalFooter, Button, ModalOverlay, ModalContent, Textarea, Input, Image } from '@chakra-ui/react';
import { useEffect, useRef, useState } from "react";

export default function CreatePostModal({ account, isOpen, onClose }) {
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [fileUrl, setFileUrl] = useState();
    const [file, setFile] = useState();

     // CALLBACKS
     const onFileChange = (e) => {
      const {file, url} = createLocalFileUrl(e)
      setFileUrl(url)
    
      setFile(file)
    }

    return (
        <Modal
            initialFocusRef={initialRef}
            finalFocusRef={finalRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create a New Post</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <VStack spacing="20px">
                        <form style={{width: '100%'}}>
                          <FormControl>
                              <Textarea placeholder='Say something...' />
                              <VStack m="10px" borderWidth="1px" borderColor="#E2E8F0">
                                <Image maxHeight="400px" objectFit='contain' width="100%" src={fileUrl}/>
                              </VStack>
                              <Text m="10px">Insert a media: </Text>
                              <Input onChange={(e) => {onFileChange(e)}} type="file"></Input>
                            </FormControl>

                        </form>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button type="submit" colorScheme='blue' mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
