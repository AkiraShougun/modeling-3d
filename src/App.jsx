import { useRef } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import "../src/index.css"
import {CubicBezierLine, OrbitControls, useHelper} from "@react-three/drei"
import { CubeTextureLoader, SpotLightHelper } from "three"
import img1 from "../public/space-nebula.jpg"
import img2 from "../public/2.jpg"


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

const SkyBox = () => {
  const { scene } = useThree();
  const loader = new CubeTextureLoader();
  const texture = loader.load([
    img2,
    img2,
    img2,
    img2,
    img2,
    img2
  ]);
  scene.background = texture;
  return null;
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

const Star = () => {
  const max = 10
  const min = -10
  return (
    <mesh scale={[0.1,0.1,0.1]} position={[Math.floor(Math.random() * (max - min + 1)) + min,Math.floor(Math.random() * (max - min + 1)) + min,Math.floor(Math.random() * (max - min + 1)) + min]}>
      <sphereGeometry/>
      <meshPhongMaterial color={"white"}/>
    </mesh>
  )
}


const Light = () => {
  const dirLight = useRef();
  useHelper(dirLight, SpotLightHelper,1, "cyan");
  return (
    <>
      <spotLight intensity={90} ref={dirLight} position={[0,10,0]}/>
    </>
  );
};

const StarArray = () => {
  const arr = []
  for (let i=0; i<80; i++){
    arr.push(<Star/>)
  }
  return arr
}



function App() {

  return (
    <>
      <div id="canvas-container" className=" w-full h-full">
        <Canvas>
          <ambientLight intensity={0.25}/>
          <Light/>
          <Torus/>
          <Sphere/>
          <StarArray/>
          <SkyBox/>
          <CubicBezierLine start = {[0,0,2]} end = {[0,5,10]} midA = {[0,8,0]} midB = {[-9,0,5]} color="cyan"/>
          <OrbitControls/>
          <gridHelper/>
        </Canvas>
      </div>
    </>
  )
}

export default App
