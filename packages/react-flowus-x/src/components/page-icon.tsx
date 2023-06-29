import React from 'react'
import { Block } from '@flowusx/flowus-types'
import cs from 'classnames'
import { LazyImage } from './lazy-image'
import { useFlowUsContext } from '../context'
import { BlockType } from '../consts/block'
import { getBlockIcon, getBlockTitle, isUrl } from '@flowusx/flowus-utils'
import { DefaultPageIcon } from '../icons/default-page-icon'

// TODO Icon
const isIconBlock = (value: Block) => {
  return (
    value.type === BlockType.Doc ||
    value.type === BlockType.Emphasis_Text ||
    value.type === BlockType.Reference_Data_Table ||
    value.type === BlockType.Reference_Data_Table_Page
  )
}

export const PageIconImpl: React.FC<{
  block: Block
  className?: string
  inline?: boolean
  hideDefaultIcon?: boolean
  defaultIcon?: string
}> = ({ block, className, inline = true, hideDefaultIcon = false, defaultIcon }) => {
  const { recordMap } = useFlowUsContext()
  let isImage = false
  let content: any = null

  if (isIconBlock(block)) {
    const icon = getBlockIcon(block, recordMap) || defaultIcon
    const title = getBlockTitle(block, recordMap)

    if (icon && isUrl(icon)) {
      const url = icon
      isImage = true

      content = (
        <LazyImage
          src={url}
          alt={title || 'page icon'}
          block={block}
          className={cs(className, 'notion-page-icon')}
        />
      )
    } else if (icon && icon.startsWith('/grey/')) {
      const url = 'https://www.notion.so' + icon

      content = (
        <LazyImage
          src={url}
          alt={title || 'page icon'}
          block={block}
          className={cs(className, 'notion-page-icon')}
        />
      )
    } else if (!icon) {
      if (!hideDefaultIcon) {
        isImage = true
        content = (
          <DefaultPageIcon
            className={cs(className, 'notion-page-icon')}
            alt={title ? title : 'page icon'}
          />
        )
      }
    } else {
      isImage = false
      content = (
        <span className={cs(className, 'notion-page-icon')} role="img" aria-label={icon}>
          {icon}
        </span>
      )
    }
  }

  if (!content) {
    return null
  }

  return (
    <div
      className={cs(
        inline ? 'notion-page-icon-inline' : 'notion-page-icon-hero',
        isImage ? 'notion-page-icon-image' : 'notion-page-icon-span',
      )}
    >
      {content}
    </div>
  )
}

export const PageIcon = React.memo(PageIconImpl)
