import { PageBlocks } from './types/flowus'

export class FlowUsToMarkdown {
  private readonly _pageBlocks: PageBlocks

  constructor(pageBlocks: PageBlocks) {
    this._pageBlocks = pageBlocks
  }

  toMarkdownString(): string {
    let mdString = ''
    // 判断是文档页面还是数据表格页面
    const blocksKeys = Object.keys(this._pageBlocks.blocks)
    const firstKey = blocksKeys[0]
    const firstValue = this._pageBlocks.blocks[firstKey]
    if (firstValue.type === 0) {
      firstValue.subNodes.forEach((blockId) => {
        const block = this._pageBlocks.blocks[blockId]
        console.log(block)
      })
    } else {
      // 非页面Block，退出转换
    }

    return mdString
  }
}
