import { PageBlocks } from '@flowusx/flowus-types'
import { transform } from './utils/flowus'
import { BlockType } from './const/flowus'

export class FlowUsToMarkdown {
  constructor() {}

  toMarkdownString(pageBlocks: PageBlocks): string {
    let mdString = ''
    // 判断是文档页面还是数据表格页面
    const blocksKeys = Object.keys(pageBlocks.blocks)
    const firstKey = blocksKeys[0]
    const firstValue = pageBlocks.blocks[firstKey]
    if (firstValue.type === 0) {
      firstValue.subNodes.forEach((blockId) => {
        const block = pageBlocks.blocks[blockId]
        const type = block.type as BlockType
        mdString += transform[type](block, pageBlocks.blocks) + '\n\n'
      })
    } else {
      // 非页面Block，退出转换
    }

    return mdString
  }
}
