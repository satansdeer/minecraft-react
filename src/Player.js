import React, { useEffect, useRef } from "react";
import { useSphere } from "use-cannon";
import { useThree, useFrame } from "react-three-fiber";
import { PointerLockControls } from "./PointerLockControls";
import { usePlayerControls } from "./usePlayerControls";
import { Vector3 } from "three";

const SPEED = 5;

export const Player = (props) => {
  const { camera } = useThree();
  const {
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    jump,
  } = usePlayerControls();
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 10, 0],
    ...props,
  }));

  const velocity = useRef([0, 0, 0])
  useEffect(() => {
    api.velocity.subscribe((v) => (
      velocity.current = v
    ))
  }, [])

  useFrame(() => {
    camera.position.copy(ref.current.position);
    const direction = new Vector3();

    const frontVector = new Vector3(
      0,
      0,
      Number(moveBackward) - Number(moveForward)
    );
    const sideVector = new Vector3(Number(moveLeft) - Number(moveRight), 0, 0);

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);
    
    api.velocity.set(direction.x, velocity.current[1], direction.z)
    
    if(jump && Math.abs(velocity.current[1].toFixed(2)) < 0.05) {
      api.velocity.set(velocity.current[0], 10, velocity.current[2])
    }
  });

  return (
    <>
      <PointerLockControls />
      <mesh ref={ref} />
    </>
  );
};
