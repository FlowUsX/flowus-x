import { Blocks, PageBlocks } from '@flowusx/flowus-types'
import { BlockType, out, request, RequestOptions } from '@flowusx/flowus-shared'
import { FlowUsConfig, MediaUrl } from './types'
import process from 'process'

/**
 * FlowUs客户端API
 */
export class FlowUsClient {
  private readonly _baseUrl: string
  constructor(config?: FlowUsConfig) {
    this._baseUrl = config?.baseUrl || 'https://flowus.cn/api'
  }

  /**
   * 获取页面所有Block
   * @param pageId
   */
  public async getPageBlocks(pageId: string) {
    const pageBlocks = await this._fetch<PageBlocks>(`docs/${pageId}`, { method: 'GET' })
    // 处理图片链接
    // 获取可下载的图片链接
    pageBlocks.blocks = await this.getOssUrl(pageBlocks.blocks)

    return pageBlocks
  }

  /**
   * 获取数据表格文档列表
   * @param pageId
   */
  public async getDataTableData(pageId: string) {
    const pageBlocks = await this._fetch<PageBlocks>(`docs/${pageId}`, { method: 'GET' })
    const blocksKeys = Object.keys(pageBlocks.blocks)
    // 第一个节点标记了该Block的属性是文档还是其他
    const firstKey = blocksKeys[0]
    const firstValue = pageBlocks.blocks[firstKey]
    if (firstValue.type === BlockType.Data_Table) {
      // 数据表格
      return pageBlocks
    } else if (firstValue.type === BlockType.Doc) {
      // 文档类型
      // 错误类型，请使用getPageBlocks
      out.err('类型错误', '请使用 getPageBlocks 获取页面数据')
    } else {
      // 错误类型，暂不支持
      out.err('类型错误', '暂不支持的文档类型')
    }
    process.exit(-1)
  }

  private async _fetch<T>(endpoint: string, reqOpts?: RequestOptions): Promise<T> {
    const url = `${this._baseUrl}/${endpoint}`
    const res = await request<T>(url, reqOpts)
    if (res.data.code !== 200) {
      // @ts-ignore
      if (res.data?.msg?.includes('无访问权限')) {
        out.err('暂无权限', `请检查页面是否开启公开分享`)
      } else {
        // @ts-ignore
        out.err('请求错误', res.data.msg)
      }
      process.exit()
    }
    return res.data.data
  }

  public async getOssUrl(blocks: Blocks) {
    const mediaBlocks: any[] = []
    Object.keys(blocks).forEach((blockId) => {
      const block = blocks[blockId]
      // 媒体类型
      if (block.type === 14) {
        mediaBlocks.push({
          blockId: block.uuid,
          ossName: block.data.ossName,
        })
      }
      if (block.type === 0 && block.data.cover) {
        // 文档类型
        mediaBlocks.push({
          blockId: block.uuid,
          ossName: block.data.cover,
        })
      }
    })
    const data = {
      batch: mediaBlocks,
    }
    let medias = await this._fetch<MediaUrl[]>('file/create_urls', { data, method: 'POST' })
    medias = medias.map((item, index) => {
      return {
        ...item,
        blockId: mediaBlocks[index].blockId,
      }
    })
    medias.forEach((media) => {
      const blockId = media.blockId
      blocks[blockId].data.fullLink = media.url
    })
    return blocks
  }
}
