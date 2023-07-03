import React from 'react'

import { Media } from './media'
import { Block } from '@flowusx/flowus-types'
import { useFlowUsContext } from '../context'
import { PageTitle } from './page-title'

export const MediaWrapper: React.FC<{
  block: Block
}> = ({ block }) => {
  console.log('MediaWrapper-block', block)
  const value = block
  const { zoom, mapPageUrl } = useFlowUsContext()
  // 本地媒体14&网络媒体26
  // 嵌入文件（可预览）14
  // 上传本地文件 14
  const isMediaPreview =
    block.type === 14 && block.data.display === 'file' && block.data.viewMode === 'preview'
  const isMedia = (block.type === 14 || block.type === 26) && block.data.display !== 'file'
  const isFileUrl = block.type === 14 && block.data.display === 'file' && !block.data.viewMode
  // NOTE 媒体预览和媒体直接展示默认都是相同样式
  const isMediaView = isMediaPreview || isMedia

  console.log('MediaWrapper-isMediaView', isMediaView)
  if (isMediaView) {
    return <Media block={value} zoomable={zoom} />
  } else if (isFileUrl) {
    return (
      <a href={mapPageUrl(block.uuid)}>
        <PageTitle block={block} />
      </a>
    )
  } else {
    return null
  }
}
