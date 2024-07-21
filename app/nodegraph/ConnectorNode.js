import React, { useRef, useEffect, useState, useCallback } from "react";
import { Layer, Rect, Arrow, Group, Circle, Text, Shape } from "react-konva";

const GroupShape = ({ name, color, start, handleNodeDragMove, initialPos }) => {

  useEffect(() => {
    handleNodeDragMove();
  }, []); 

  return (
    <Group draggable onDragMove={handleNodeDragMove} x={initialPos.x} y={initialPos.y}>
      <Shape
        sceneFunc={(context, shape) => {
          context.beginPath();
          context.moveTo(start.x, start.y);
          context.lineTo(start.x + 200, start.y);
          context.lineTo(start.x + 220, start.y + 30);
          context.lineTo(start.x + 200, start.y + 60);
          context.lineTo(start.x, start.y + 60);
          context.lineTo(start.x - 20, start.y + 30);
          context.closePath();
          context.fillStrokeShape(shape);
        }}
        stroke="black"
        fillLinearGradientStartPoint={{ x: start.x, y: start.y }}
        fillLinearGradientEndPoint={{ x: start.x, y: start.y + 200 }}
        fillLinearGradientColorStops={[0, color, 1, "black"]}
        strokeWidth={2}
      />
      <Shape
        sceneFunc={(context, shape) => {
          const innerStart = { x: start.x + 4, y: start.y + 6 };
          context.beginPath();
          context.moveTo(innerStart.x, innerStart.y);
          context.lineTo(innerStart.x + 200 - 8, innerStart.y);
          context.lineTo(innerStart.x + 220 - 12, innerStart.y + 24);
          context.lineTo(innerStart.x + 200 - 8, innerStart.y + 48);
          context.lineTo(innerStart.x, innerStart.y + 48);
          context.lineTo(innerStart.x - 16, innerStart.y + 24);
          context.closePath();
          context.fillStrokeShape(shape);
        }}
        fill={""}
        id={"selection"}
      />
      <Text
        x={start.x} // Adjust position as needed
        y={start.y}
        width={200}
        height={60}
        fontFamily="Open Sans, sans-serif" // Specify the font family here
        fontStyle="500" // Use semibold font weight
        align="center" // Optional: align text center horizontally
        verticalAlign="middle" // Optional: align text center vertically
        text={name}
        fontSize={20}
        fill="black"
      />
    </Group>
  );
};

const ConnectorNode = ({
  name,
  color,
  initialPos,
  handleArrowFootDragMove,
  handleArrowFootDragEnd,
  inArrowFootPos,
  setInArrowFootPos,
  inputConnected,
  draggingFoot,
}) => {
  const start = {x:0,y:0}
  const inputRef = useRef(null);
  const groupRef = useRef(null);
  const inBufferRef = useRef(null);
  const arrowStart = { x: start.x + 40, y: start.y - 60 };
  const [position, setPosition] = useState(start);
  const [initialized, setInitialized] = useState(false);

  const handleNodeDragMove = useCallback(
    (e) => {
      let pos; // Declare pos variable outside the if block
      if (inputConnected) {
        inputRef.current.stroke("#ffba5f");
      }
      if (e) {
        const group = e.target;
        pos = group.position(); // Assign value to pos
      } else {
        pos = initialPos; // Assign value to pos
      }
      setPosition(pos);

      if (!inputConnected) {
        // Update the position of the arrow
        const arrow = inputRef.current; // Assuming inputRef is a ref to the Arrow component
        if (arrow) {
          // Calculate the new position of the arrow relative to the group
          const newPos = {
            x: pos.x + arrowStart.x, // Adjust as needed based on the group's position
            y: pos.y + arrowStart.y, // Adjust as needed based on the group's position
          };
          arrow.position(newPos);
        }

        // Update the position of inBufferRef
        const inBuffer = inBufferRef.current;
        if (inBuffer) {
          const newPos = {
            x: pos.x + arrowStart.x, // Adjust as needed based on the group's position and inArrowFootPos
            y: pos.y + arrowStart.y, // Adjust as needed based on the group's position and inArrowFootPos
          };
          inBuffer.position(newPos);
        }
      } else {
        const inputPos = inputConnected.position();
        setInArrowFootPos({
          x: inputPos.x + 100,
          y: inputPos.y + 100,
        });
      }
    },
    [position, inArrowFootPos] // Ensure dependencies are included
  );
  
  useEffect(() => {
    const newArrowHeadPos = calculateIntersection(inArrowFootPos);
    setArrowEnd(newArrowHeadPos);

    let pos
    if (initialized) {
      pos = inArrowFootPos
    } else {
      pos= {x:initialPos.x+40, y:initialPos.y-60}
    }

    setInitialized(true)
    const deltaX = newArrowHeadPos.x - pos.x;
    const deltaY = newArrowHeadPos.y - pos.y;
    const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
    const unitX = deltaX / distance;
    const unitY = deltaY / distance;

    const offsetDistance = 50;
    const offsetX = pos.x + offsetDistance * unitX;
    const offsetY = pos.y + offsetDistance * unitY;

    const angleInRadians = Math.atan2(deltaY, deltaX);
    const angleInDegrees = (angleInRadians * 180) / Math.PI;

    const rect = inBufferRef.current;
    if (rect) {
      rect.rotation(angleInDegrees);
      rect.offset({
        x: rect.width() / 2,
        y: rect.height() / 2,
      });
      rect.position({
        x: offsetX,
        y: offsetY,
      });
    } 
  }, [inArrowFootPos]);

  // Function to calculate the equation of a line passing through two points
  const lineEquation = (A, B) =>
    `y = ${(B.y - A.y) / (B.x - A.x)}x + ${
      A.y - ((B.y - A.y) / (B.x - A.x)) * A.x
    }`;

  // Function to calculate the intersection point between two lines
  const lineLineIntersection = (p1, p2, p3, p4) => {
    const denominator =
      (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
    if (denominator === 0) {
      return null; // Lines are parallel or coincident
    }
    const ua =
      ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) /
      denominator;
    const ub =
      ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) /
      denominator;
    if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
      // Intersection point lies within line segments
      return { x: p1.x + ua * (p2.x - p1.x), y: p1.y + ua * (p2.y - p1.y) };
    } else {
      return null; // Intersection point is outside line segments
    }
  };

  const calculateIntersection = useCallback(
    (A) => {
      const hexagonPoints = [
        { x: position.x - 20, y: position.y + 30 }, // Point 1
        { x: position.x, y: position.y }, // Point 2
        { x: position.x + 200, y: position.y }, // Point 3
        { x: position.x + 220, y: position.y + 30 }, // Point 4
        { x: position.x + 200, y: position.y + 60 }, // Point 5
        { x: position.x, y: position.y + 60 }, // Point 6
      ];

      const B = { x: position.x + 100, y: position.y + 30 };
      const AB = lineEquation(A, B);
      // Find intersection points between line AB and the border of the hexagon
      const intersectionPoints = [];
      for (let i = 0; i < hexagonPoints.length; i++) {
        const point1 = hexagonPoints[i];
        const point2 = hexagonPoints[(i + 1) % hexagonPoints.length];
        const intersection = lineLineIntersection(A, B, point1, point2);
        if (intersection) {
          intersectionPoints.push(intersection);
        }
      }

      if (intersectionPoints.length === 0) {
        return B; // Placeholder, replace with your logic
      } else {
        return intersectionPoints[0];
      }
    },
    [position] // dependency array, empty as there are no dependencies
  );

  const [arrowEnd, setArrowEnd] = useState(calculateIntersection(arrowStart));

  return (
    <Group>
      <Arrow
        x={inArrowFootPos.x}
        y={inArrowFootPos.y}
        points={[
          0,
          0,
          arrowEnd.x - inArrowFootPos.x,
          arrowEnd.y - inArrowFootPos.y,
        ]}
        pointerLength={10}
        pointerWidth={10}
        stroke={draggingFoot ? "white" : "black"}
        strokeWidth={4}
        ref={inputRef}
        id={"inputArrow"}
      />
      <Rect
        width={inputConnected ? 230 : 150}
        height={50}
        rotation={45}
        fill=""
        stroke="#00D2FF00"
        draggable
        ref={inBufferRef}
        onDragMove={handleArrowFootDragMove}
        onDragEnd={handleArrowFootDragEnd}
      />
      <GroupShape
        name={name}
        color={color}
        start={start}
        initialPos={initialPos}
        handleNodeDragMove={handleNodeDragMove}
        id={"node"}
        ref= {groupRef}
      />
    </Group>
  );
};

export default ConnectorNode;
