import { request, RequestOptions } from 'urllib'
import { Blocks, PageBlocks } from '@flowusx/flowus-types'
import { FlowUsConfig, MediaUrl } from './types'

export class FlowUsClient {
  private readonly _baseUrl: string
  // private readonly _authToken?: string
  constructor(config?: FlowUsConfig) {
    this._baseUrl = config?.baseUrl || 'https://flowus.cn/api'
    // this._authToken = authToken
  }

  public async getPageBlocks(pageId: string) {
    const pageBlocks = await this._fetch<PageBlocks>(`docs/${pageId}`, { method: 'GET' })
    // 处理图片链接
    // 获取可下载的图片链接
    pageBlocks.blocks = await this.getOssUrl(pageBlocks.blocks)

    return pageBlocks
  }

  private async _fetch<T>(endpoint: string, reqOpts?: RequestOptions): Promise<T> {
    const opts: RequestOptions = {
      contentType: 'json',
      dataType: 'json',
      headers: {
        'User-Agent': '@flowusx/flowus-client',
        authority: 'flowus.cn',
        app_version_name: '1.51.0',
        ...reqOpts?.headers,
      },
      compressed: true,
      // 超时时间 60s
      timeout: 60000,
      ...reqOpts,
    }

    const url = `${this._baseUrl}/${endpoint}`
    const res = await request(url, opts)
    return res.data.data
  }

  private async getOssUrl(blocks: Blocks) {
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
    })
    const data = {
      batch: mediaBlocks,
    }
    const medias = await this._fetch<MediaUrl[]>('file/create_urls', { data, method: 'POST' })
    medias.forEach((media) => {
      const ossId = media.url.split('/')[4]
      Object.keys(blocks).forEach((blockId) => {
        const block = blocks[blockId]
        // 媒体类型
        if (block.type === 14) {
          if (blocks[blockId].data.ossName.includes(ossId)) {
            blocks[blockId].data.fullLink = media.url
          }
        }
      })
    })
    return blocks
  }
}
