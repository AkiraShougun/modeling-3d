import { Canvas } from "@react-three/fiber"

function App() {
  return (
    <>
      <div id="canvas-container">
        <Canvas>
          <ambientLight intensity={0.1} />
          <directionalLight color="red" position={[0, 0, 5]} />
          <mesh>
            <sphereGeometry/>
            <meshStandardMaterial color="hotpink" />
          </mesh>
        </Canvas>
      </div>
    </>
  )
}

export default App
