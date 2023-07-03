import defaultRecordMap from './record-map.json'
import { FlowUsRenderer } from '@flowusx/react-flowus-x'
import '@flowusx/react-flowus-x/src/styles.css'
function App() {

  const recordMap = defaultRecordMap as any
  return <FlowUsRenderer recordMap={recordMap} />
}

export default App
