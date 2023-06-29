import defaultRecordMap from './record-map.json'
import { FlowUsRenderer } from '@flowusx/react-flowus-x'

function App() {

  const recordMap = defaultRecordMap as any
  return <FlowUsRenderer recordMap={recordMap} />
}

export default App
