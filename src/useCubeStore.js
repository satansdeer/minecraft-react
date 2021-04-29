import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { nanoid } from 'nanoid';

import { $cubes } from './state';
import { Cube } from './Cube';

export const useCube = () => useRecoilValue($cubes);

export const useSetCube = () => {
  const setCubes = useSetRecoilState($cubes);
  return (x, y, z) =>
    setCubes(cubes => [...cubes, <Cube key={nanoid()} position={[x, y, z]} />]);
};
