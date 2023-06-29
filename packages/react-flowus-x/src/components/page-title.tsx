import React from 'react'
import cs from 'classnames'
import { Text } from './text'
import { Block } from '@flowusx/flowus-types'
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

  if (block.type === BlockType.Reference_Data_Table_Page) {
    title = getBlockTitle(block, recordMap)
    if (!title) {
      return null
    }
  }

  if (!block.properties?.title) {
    return null
  }

  return (
    <span className={cs('flowus-page-title', className)} {...rest}>
      <PageIcon block={block} defaultIcon={defaultIcon} className="flowus-page-title-icon" />

      <span className="flowus-page-title-text">
        <Text value={block.properties?.title} block={block} />
      </span>
    </span>
  )
}

export const PageTitle = React.memo(PageTitleImpl)
