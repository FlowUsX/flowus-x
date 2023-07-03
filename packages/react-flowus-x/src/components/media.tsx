import { Block } from '@flowusx/flowus-types'
import React, { CSSProperties } from 'react'
import { LazyImage } from './lazy-image'
import cs from 'classnames'

const supportedAssetTypes = ['video', 'image', 'file', 'audio']

export const Media: React.FC<{
  block: Block
  children?: any
  zoomable?: boolean
  className?: string
}> = ({ block, zoomable = true, className }) => {
  console.log('Media-block', block)
  if (!block || !supportedAssetTypes.includes(block.data.display)) {
    return null
  }

  const style: CSSProperties = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    maxWidth: '100%',
    flexDirection: 'column',
  }

  const { width, height, blockFullWidth, blockPageWidth } = block.data.format

  if (blockFullWidth || blockPageWidth) {
    if (blockFullWidth) {
      style.width = '100vw'
    } else {
      style.width = '100%'
    }
    style.height = 'auto'
  } else {
    switch (block.data.format.contentGravity) {
      case 'CENTER': {
        style.alignSelf = 'center'
        break
      }
      case 'LEFT': {
        style.alignSelf = 'start'
        break
      }
      case 'RIGHT': {
        style.alignSelf = 'end'
        break
      }
    }
    style.width = width
    style.height = 'auto'
  }

  const mediaStyle: CSSProperties = {}

  let content = null

  // 判断类型
  // video类型 视频/音频
  const isAudio = block.data.extName === 'mp3' || block.data.display === 'audio'

  const isVideo = block.data.extName === 'mp4' || block.data.display === 'video'

  if (isVideo) {
    content = (
      <video
        playsInline
        controls
        preload="metadata"
        style={mediaStyle}
        src={block.data.fullLink}
        title={block.title}
      />
    )
  } else if (isAudio) {
    const source = block.data.fullLink
    return (
      <div className={cs(className, 'flowus-audio')}>
        <audio controls preload="none" src={source} />
      </div>
    )
  } else if (block.data.display === 'image') {
    // 图片类型 图片
    content = (
      <LazyImage
        block={block}
        zoomable={zoomable}
        height={style.height as number}
        style={mediaStyle}
      />
    )
  }

  return (
    <>
      <div style={style}>{content}</div>
    </>
  )
}
