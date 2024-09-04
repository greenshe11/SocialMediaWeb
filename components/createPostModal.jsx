"use client";

import { createLocalFileUrl } from '@/utils/mediaControl';
import { postPostToDb } from '@/utils/postsControl';
import { VStack, FormControl, Modal, ModalHeader, ModalCloseButton, ModalBody, Text, ModalFooter, Button, ModalOverlay, ModalContent, Textarea, Input, Image } from '@chakra-ui/react';
import { useEffect, useRef, useState } from "react";

export default function CreatePostModal({ account, isOpen, onClose }) {
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [fileUrl, setFileUrl] = useState();
    const [file, setFile] = useState();
    const [description, setDescription] = useState();
    const [fileType, setFileType] = useState();
    const [media, setMedia] = useState();

     // CALLBACKS
     const onFileChange = (e) => {
      const {file, url} = createLocalFileUrl(e)
      setFileUrl(url)
      const resFileType = getFileType(file)
      setFileType(resFileType)
      console.log(fileType)
      
      setFile(file)
      if (resFileType.startsWith('image')) {
        setMedia(<Image maxHeight="400px" objectFit='contain' width="100%" src={url}/>)
      }else if (resFileType.startsWith('video')) {
        setMedia(
            <video key={url} width="100%" maxHeight="400px" controls autoPlay>
                <source src={url} type={resFileType} />
                Your browser does not support the video tag.
            </video>
        );
    }else if (resFileType.startsWith('audio')) {
        setMedia(
            <audio controls>
                <source src={url} type={resFileType} />
                Your browser does not support the audio element.
            </audio>
        );
    } else {
        return <Text>Unsupported media type</Text>;
    }}
    
    const getFileType = (file) => {
        return file?.type || 'Unknown';
    };


    const onSubmit = async (e) => {
        console.log(description)
        const postId = await postPostToDb(account._id, description, file, fileType)
        onClose(e)
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
                              <Textarea onChange={(e)=>{setDescription(e.target.value)}} placeholder='Say something...' />
                              <VStack m="10px" borderWidth="1px" borderColor="#E2E8F0">
                               {media}
                                
                              </VStack>
                              <Text m="10px">Insert a media: </Text>
                              <Input onChange={(e) => {onFileChange(e)}} type="file"></Input>
                            </FormControl>

                        </form>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={(e) => {onSubmit(e)}} type="submit" colorScheme='blue' mr={3}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
