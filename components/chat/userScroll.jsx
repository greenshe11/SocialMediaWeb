import { Box } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

export function UserScroll({width, content}) {
  const boxRef = useRef(null);  // Reference to the Box
  
  

  return (
    <Box
      ref = {boxRef}
      height="60vh"  // Set the max height of the scrollable area
      overflowY="scroll" // Enable vertical scrollingS
      width = {width}
    >
      {content}

    </Box>
  );
}

