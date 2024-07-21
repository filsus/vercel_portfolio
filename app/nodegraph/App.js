"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Stage, Layer, Rect } from "react-konva";
import ConnectorNode from "./ConnectorNode";
import ReadNode from "./SocialMediaNode";

const App = () => {
  const [inputConnected, setInputConnected] = useState(false);
  const [inArrowFootPos, setInArrowFootPos] = useState({ x: 40, y: -60 });
  const [draggingFoot, setDraggingFoot] = useState(false);

  const layerRef = useRef(null);
  const stageRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);

  const isCursorOverAnyShape = () => {
    const position = stageRef.current.getPointerPosition();
    const otherComponents = layerRef.current.children;
    console.log(otherComponents)
    // Filter out the child with id 'id45'
    const filteredComponents = otherComponents.filter(
      (child) => child.children.length === 4
    );

    // Iterate through otherComponents
    for (let i = filteredComponents.length - 1; i >= 0; i--) {
      const component = filteredComponents[i];

      // Check if the component is a Konva.Group
      if (component instanceof Konva.Group) {
        // Recursively check each child shape within the group
        const topmostChild = getTopmostChildUnderCursor(component, position);
        if (topmostChild) {
          return component;
        }
      } else if (
        component instanceof Konva.Shape &&
        component.isVisible() &&
        component.intersects(position)
      ) {
        // Check if the cursor is over the component
        return component;
      }
    }

    // Return null if cursor is not over any component
    return null;
  };

  const getTopmostChildUnderCursor = (group, position) => {
    const children = group.getChildren();
    for (let i = children.length - 1; i >= 0; i--) {
      const child = children[i];
      if (
        child instanceof Konva.Shape &&
        child.isVisible() &&
        child.intersects(position)
      ) {
        return child;
      } else if (child instanceof Konva.Group) {
        const topmostChild = getTopmostChildUnderCursor(child, position);
        if (topmostChild) {
          return topmostChild;
        }
      }
    }
    return null;
  };

  const handleScroll = (e) => {
    const currentScale = scale;
    const newScale = e.deltaY < 0 ? currentScale * 1.1 : currentScale * 0.9;
    const minScale = 0.25;
    const maxScale = 1;
    const boundedScale = Math.min(Math.max(newScale, minScale), maxScale);
    setScale(boundedScale);
  };

  // INPUT BUFFER HANDLE EVENTS
  const handleArrowFootDragMove = useCallback(
    (e) => {
      setDraggingFoot(true);
      if (draggingFoot) {
        setInputConnected(false);
        const stage = stageRef.current;
        if (stage) {
          // Get the pointer position relative to the stage
          const pointerPosition = stage.getPointerPosition();
          // Calculate the new position of the arrow foot relative to its group
          const newPos = {
            x: (pointerPosition.x - stage.x()) /scale,
            y: (pointerPosition.y - stage.y())/scale,
          };

          // Set the new position of the arrow foot
          setInArrowFootPos(newPos);
        }
      }
    },
    [draggingFoot]
  );

  const handleArrowFootDragEnd = useCallback(
    (e) => {
      const stage = e.target.getStage();
      const shape = isCursorOverAnyShape(stage);
      if (!shape) {
        const footPos = e.target.getParent().children[2].position();
        setInArrowFootPos({ x: footPos.x + 40, y: footPos.y - 60 });
        setInputConnected(null);
      } else {
        const shapePosition = shape.position();
        const position = stageRef.current.getPointerPosition();
        setInputConnected(null);
        if (
          (position.x - stage.x())/scale >= shapePosition.x &&
          (position.x - stage.x())/scale <= (shapePosition.x + 200) &&
          (position.y-stage.y())/scale >= shapePosition.y &&
          (position.y -stage.y())/scale <= (shapePosition.y + 200)
        ) {
          setInArrowFootPos({
            x: (shapePosition.x + 100),
            y: (shapePosition.y + 100),
          });
          setInputConnected(shape);
        }
        

        shape.moveToTop();
        if (typeof window !== "undefined") {
          window.open(shape.attrs.id, '_blank');
        }        
       
      }
      setDraggingFoot(false);
    },
    [isCursorOverAnyShape]
  );

  // useEffect(() => {
  //   const stage = stageRef.current;
  //   const handleWheel = (e) => {
  //     e.evt.preventDefault();
  //     handleScroll(e.evt);
  //   };
  //   if (stage) {
  //     stage.on("wheel", handleWheel);
  //     return () => {
  //       stage.off("wheel", handleWheel);
  //     };
  //   }
  // }, [scale]);

  const handleClick = useCallback(
    (e) => {
      console.log(e, e.target, e.target.getParent())
      const parent = e.target.getParent()
      var selectionRect = false
      if (parent) {
      const children = parent.getChildren()
          // Find the child with the specified id
          selectionRect = children.find(
            (child) => child.attrs.id === "selection"
          );} else{
            if (selectedNode) {selectedNode.fill("")}
        
      }


      if (selectionRect) {
        const topNode =
          selectionRect.getParent().attrs.id === "node"
            ? selectionRect.getParent()
            : selectionRect.getParent().getParent();
        selectionRect.getParent().moveToTop();

        if (selectedNode && selectedNode !== selectionRect) {
          selectedNode.fill(""); // Change fill color back to default
        }

        setSelectedNode(selectionRect);
        selectionRect.fill("#ffba5f");
      } else {
        setSelectedNode(null); // Deselect the node if it's clicked again
        if (selectedNode) {
          selectedNode.fill(""); // Change fill color back to default
        }
      }

      // Redraw the layer to reflect the changes
      layerRef.current.batchDraw();
    },
    [selectedNode]
  );

  const [stageX, setStageX] = useState(0);


  // Function to update stageX based on window width
  const updateStageX = () => {
    if (window !== undefined) {
      const windowWidth = window.innerWidth;
      const newStageX = windowWidth / 2 - (windowWidth/23);
      setStageX(newStageX);
    }
  };

  useEffect(() => {
    // Initial update
    updateStageX();

    // Add event listener for window resize
    const handleResize = () => {
      updateStageX();
    };

    if (window !== undefined) {
      window.addEventListener('resize', handleResize);
    }
    

    // Cleanup event listener on component unmount
    return () => {
      if (window !== undefined) {
        window.removeEventListener('resize', handleResize);
      }      
    };
  }, []);

  return (
    <div id="contact" className="bg-slate-800 min-h-[800px]">
    <Stage
      width={5000}
      height={800}
      scaleX={1}
      scaleY={1}
      ref={stageRef}
      onMouseDown={handleClick}
      x={stageX}
      zIndex={-10}
    >
      <Layer>
        <Rect
          x={0}
          y={0}
        />
      </Layer>
      <Layer ref={layerRef}>
        <ReadNode
          inputConnected={inputConnected}
          inArrowFootPos={inArrowFootPos}
          setInArrowFootPos={setInArrowFootPos}
          initialPos={{x:-340,y:100}}
          text = {"Read1\nLinkedIn.1001.exr"}
          path={"/images/linkedin.png"}
          color={'white'}
          socialLink = {"https://www.linkedin.com/in/filip-suska-519755188/"}
        />
        <ReadNode
          inputConnected={inputConnected}
          inArrowFootPos={inArrowFootPos}
          setInArrowFootPos={setInArrowFootPos}
          initialPos={{x:-120,y:100}}
          text = {"Read2\nGithub.json"}
          path={"/images/github.png"}
          color={'white'}
          socialLink = {"https://github.com/filsus?tab=repositories"}
        />
        <ReadNode
          inputConnected={inputConnected}
          inArrowFootPos={inArrowFootPos}
          setInArrowFootPos={setInArrowFootPos}
          initialPos={{x:100,y:100}}
          text = {"Read3\nVimeo.mov"}
          path={"/images/vimeo.png"}
          color={'white'}
          socialLink = {"https://vimeo.com/user116591296"}
        />
        <ReadNode
          inputConnected={inputConnected}
          inArrowFootPos={inArrowFootPos}
          setInArrowFootPos={setInArrowFootPos}
          initialPos={{x:320,y:100}}
          text = {"Read4\nIMDb.jpeg"}
          path={"/images/imdb.png"}
          color={'white'}
          socialLink = {"https://www.imdb.com/name/nm13686150/"}
        />
        <ConnectorNode
          name={"ConnectWithMe1"}
          color={"#22c55e"}
          initialPos={{x:0, y:400}}
          inArrowFootPos={inArrowFootPos}
          setInArrowFootPos={setInArrowFootPos}
          inputConnected={inputConnected}
          handleArrowFootDragEnd={handleArrowFootDragEnd}
          handleArrowFootDragMove={handleArrowFootDragMove}
          draggingFoot={draggingFoot}
        />
      </Layer>
    </Stage>
    </div>
  );
};

export default App;
