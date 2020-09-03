import React from "react";
import { usePlane } from "use-cannon";
import { TextureLoader, RepeatWrapping } from "three";
import grass from "./grass.jpg";

export const Ground = (props) => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  const texture = new TextureLoader().load(grass);
  texture.wrapS = RepeatWrapping;
  texture.wrapT = RepeatWrapping;
  texture.repeat.set(240, 240);

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1009, 1000]} />
      <meshStandardMaterial map={texture} attach="material" color="green" />
    </mesh>
  );
};
