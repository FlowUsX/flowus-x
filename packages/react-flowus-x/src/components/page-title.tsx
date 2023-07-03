import React from 'react'
import cs from 'classnames'
import { Text } from './text'
import { Block, Decoration } from '@flowusx/flowus-types'
import { useFlowUsContext } from '../context'
import { getBlockTitle } from '@flowusx/flowus-utils'
import { PageIcon } from './page-icon'
import { BlockType } from '../consts/block'

export const PageTitleImpl: React.FC<{
  block: Block
  className?: string
  defaultIcon?: string
}> = ({ block, className, defaultIcon, ...rest }) => {
  const { recordMap } = useFlowUsContext()

  if (!block) return null

  let title = ''

  if (
    block.type === BlockType.Reference_Data_Table_Page ||
    block.type === BlockType.Reference_Page
  ) {
    title = getBlockTitle(block, recordMap)
    if (!title) {
      return null
    }
    const titleDecoration: Decoration[] = [{ text: title, type: 0, enhancer: {} }]
    return (
      <span className={cs('flowus-page-title', className)} {...rest}>
        <PageIcon block={block} defaultIcon={defaultIcon} className="flowus-page-title-icon" />

        <span className="flowus-page-title-text">
          <Text value={titleDecoration} block={block} />
        </span>
      </span>
    )
  }

  if (!block?.title) {
    return null
  }

  return (
    <span className={cs('flowus-page-title', className)} {...rest}>
      <PageIcon block={block} defaultIcon={defaultIcon} className="flowus-page-title-icon" />

      <span className="flowus-page-title-text">
        <Text value={block?.data.segments} block={block} />
      </span>
    </span>
  )
}

export const PageTitle = React.memo(PageTitleImpl)
