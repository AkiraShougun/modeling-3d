import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import "../src/index.css"

const Torus = () => {
  const ref = useRef()
  useFrame((state,delta) => {
    ref.current.position.z = Math.sin(state.clock.elapsedTime)
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime)
  })
  return (
    <mesh ref={ref}>
      <torusGeometry/>
      <meshStandardMaterial/>
    </mesh>
  )
}


function App() {
  return (
    <>
      <div id="canvas-container" className=" w-full h-full">
        <Canvas>
          <directionalLight intensity={0.5} position={[10,10,10]} />
          <Torus/>
        </Canvas>
      </div>
    </>
  )
}

export default App
