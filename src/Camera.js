import React, { useRef, useEffect, useLayoutEffect } from 'react';
import { useThree } from 'react-three-fiber';

export const Camera = props => {
  const ref = useRef();
  const { set, size } = useThree();

  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.aspect = size.width / size.height;
      ref.current.updateProjectionMatrix()
    }
  }, [size, props]);

  useEffect(() => {
    set({ camera: ref.current });
    // eslint-disable-next-line
  }, []);

  return <perspectiveCamera ref={ref} {...props} />;
};
