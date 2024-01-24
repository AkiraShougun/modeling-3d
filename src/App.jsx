import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import "../src/index.css"
import {OrbitControls, useHelper} from "@react-three/drei"
import { SpotLightHelper } from "three"

const Torus = () => {
  const ref = useRef()
  useFrame((state,delta) => {
    ref.current.position.z = Math.sin(state.clock.elapsedTime)
    ref.current.rotation.x = ref.current.rotation.z = -Math.cos(state.clock.elapsedTime)
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime)
  })
  return (
    <mesh ref={ref}>
      <torusGeometry/>
      <meshPhongMaterial color={"cyan"}/>
    </mesh>
  )
}


const Sphere = () => {
  const ref2 = useRef()
  useFrame((state,delta) => {
    ref2.current.position.z = Math.sin(state.clock.elapsedTime)
  })
  return (
    <mesh ref={ref2} scale={[0.5,0.5,0.5]}>
      <sphereGeometry/>
      <meshPhongMaterial color={"cyan"}/>
    </mesh>
  )
}

const Light = () => {
  const dirLight = useRef();
  useHelper(dirLight, SpotLightHelper,1, "cyan");
  console.log("working")
  return (
    <>
      <spotLight intensity={30} ref={dirLight} position={[0,5,0]}/>
    </>
  );
};




function App() {

  return (
    <>
      <div id="canvas-container" className=" w-full h-full">
        <Canvas>
          <ambientLight intensity={0.25}/>
          <Light/>
          <Torus/>
          <Sphere/>
          <OrbitControls/>
          <gridHelper/>
        </Canvas>
      </div>
    </>
  )
}

export default App
