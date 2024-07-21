import React, { useRef, useEffect, useState } from "react";
import { Rect, Group, Text, Image } from "react-konva";

const ReadNode = ({ inputConnected, setInArrowFootPos,text, path, color, initialPos, socialLink }) => {
  // State to store the loaded image
  const [image, setImage] = useState(null);
  
  // Event handler for drag move
  const handleDragMove = (e) => {
    // Get the current position of the group
    if (inputConnected) {
      const groupPos = inputConnected.position();
      setInArrowFootPos({ x: groupPos.x + 100, y: groupPos.y + 100 });
    }
  };
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = new window.Image();
      img.src = path; 
      img.alt = "";
      img.onload = () => {
        setImage(img);
    };
    };
  }, [path]);

  return (
    <Group draggable onDragMove={handleDragMove} id={socialLink} x={initialPos.x} y={initialPos.y}>
      <Rect
        stroke="black"
        width={200}
        height={200}
        fillLinearGradientStartPoint={{ x: 0, y: 0 }}
        fillLinearGradientEndPoint={{ x: 0, y: 500 }}
        fillLinearGradientColorStops={[0, color, 1, "black"]}
        strokeWidth={2}
      />
      <Rect
        fill={""}
        x={6} // Adjust position as needed
        y={6}
        width={188}
        height={188}
        id={"selection"}
      />
      <Text
        y={135}
        width={200}
        height={50}
        fontFamily="Open Sans, sans-serif" // Specify the font family here
        fontStyle="500" // Use semibold font weight
        align="center" // Optional: align text center horizontally
        verticalAlign="middle" // Optional: align text center vertically
        text= {text}
        fontSize={20}
        fill="black"
        lineHeight={1.25}
      />
      <Image
        x={image ? (100- (image.width * (95 / image.height))/2) : 0}
        y={10}
        height={95}
        width={image ? image.width * (95 / image.height) : 0}
        image={image} // Provide the path to your image
      />
    </Group>
  );
};

export default ReadNode;
