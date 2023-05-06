const blocks = require('./blocks.json')

import { transform } from '../utils/transform'

import * as fs from 'fs'

let str = ''

const firstKey = Object.keys(blocks)[0]
const firstValue = blocks[firstKey]
if (firstValue.type === 0) {
  firstValue.subNodes.forEach((blockId) => {
    const block = blocks[blockId]
    str += transform[block.type](block, blocks)
  })
}

fs.writeFileSync('./file.md', str)
