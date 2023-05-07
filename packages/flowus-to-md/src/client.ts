import { PageBlocks } from '@flowusx/flowus-types'
import { transform } from './utils/flowus'
import { BlockType } from './const/flowus'
import { ConfigOptions, FlowUsToMarkdownOptions } from './types'
import { FlowUsClient } from '@flowusx/flowus-client'
import { out } from '@flowusx/flowus-shared'
import * as process from 'process'

export class FlowUsToMarkdown {
  private readonly flowusClient?: FlowUsClient
  private readonly config?: ConfigOptions

  constructor(options?: FlowUsToMarkdownOptions) {
    this.flowusClient = options?.client
    this.config = options?.config
    console.log(this.config)
  }

  public async pageToMarkdown(id: string) {
    if (!this.flowusClient) {
      out.err('flowusClient is not provided')
      process.exit(1)
    }
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
      let prevType = 0
      const needEnter = [BlockType.Emphasis_Text, BlockType.Quote, BlockType.Text]

      firstValue.subNodes.forEach((blockId) => {
        const block = pageBlocks.blocks[blockId]
        const curType = block.type as BlockType
        let linefeed = ''
        // 特殊处理一些md语法的粘连性，需要额外加换行
        if (needEnter.includes(prevType) && needEnter.includes(curType)) {
          linefeed += '\n'
        }
        // // 特殊处理有序列表的标号
        // if (prevType === BlockType.Numbered_List && curType === BlockType.Numbered_List) {
        //   number += 1
        //   mdString += transform[curType](block, pageBlocks.blocks, number) + '\n'
        // } else {
        //   number = 1
        //
        // }
        if (!transform[curType]) {
          out.warning(`暂不支持的块类型: ${curType}-${block.title}`)
        } else {
          mdString += linefeed + transform[curType](block, pageBlocks.blocks) + '\n'
          prevType = curType
        }
      })
    } else {
      // 非页面Block，退出转换
      out.err('类型错误', '非文档类型')
      process.exit(1)
    }

    return mdString
  }
}
