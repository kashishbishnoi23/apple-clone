import React, { Suspense } from 'react';
import { OrbitControls, PerspectiveCamera, View } from '@react-three/drei';
import Lights from './Lights';
import Iphone from './Iphone';
import * as THREE from 'three';
import Loader from './Loader'

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationSize, size, item }) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full absolute h-full ${index == 2 ? 'right-[-100%]' : ''}`}
    >
      {/* Ambient Light */}
      <ambientLight intensity={0.3} />

      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />

      <Lights />

      <OrbitControls
      makeDefault
      ref={controlRef}
      enableZoom={false}
      enalePan={false}
      enableRotate={true}
      rotateSpeed={0.4}
      target={new THREE.Vector3(0,0,0)}
      />

       <group ref={groupRef} name={`${index == 1} ? 'small' : 'large`} position={[0,0,0]}>
      {/* Suspense is used to provide a loader until the component loads */}
      <Suspense fallback={<Loader/>}>
        <Iphone
           scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
           item={item}
           size={size} />
      </Suspense>
      </group>
    </View>
  );
};

export default ModelView;