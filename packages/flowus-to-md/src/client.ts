import { PageBlocks } from '@flowusx/flowus-types'
import { transform } from './utils/flowus'
import { BlockType } from './const/flowus'
import { ConfigOptions, FlowUsToMarkdownOptions } from './types'
import { FlowUsClient } from '@flowusx/flowus-client'
import { out } from '@flowusx/flowus-shared'
import * as process from 'process'

export class FlowUsToMarkdown {
  private flowusClient: FlowUsClient
  private readonly config?: ConfigOptions

  constructor(options: FlowUsToMarkdownOptions) {
    this.flowusClient = options.client
    this.config = options.config
    console.log(this.config)
  }

  public async pageToMarkdown(id: string) {
    const pageBlocks = await this.flowusClient.getPageBlocks(id)
    return this.toMarkdownString(pageBlocks)
  }

  public toMarkdownString(pageBlocks: PageBlocks): string {
    let mdString = ''
    // 判断是是否是文档页面
    const blocksKeys = Object.keys(pageBlocks.blocks)
    // 第一个节点标记了该Block的属性是文档还是其他
    const firstKey = blocksKeys[0]
    const firstValue = pageBlocks.blocks[firstKey]
    if (firstValue.type === BlockType.Doc) {
      firstValue.subNodes.forEach((blockId) => {
        const block = pageBlocks.blocks[blockId]
        const type = block.type as BlockType
        mdString += transform[type](block, pageBlocks.blocks) + '\n\n'
      })
    } else {
      // 非页面Block，退出转换
      out.err('类型错误', '非文档类型')
      process.exit(1)
    }

    return mdString
  }
}
