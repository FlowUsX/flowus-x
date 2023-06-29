import React, { FC, useMemo } from 'react'
import { PageBlocks } from '@flowusx/flowus-types'
import mediumZoom from 'medium-zoom'
import { FlowUsContextProvider, useFlowUsContext } from '../context'
import { getMediumZoomMargin } from '../utils'
import { FlowUsBlock } from './block'

interface FlowUsRendererProps {
  /** 页面所有Blocks */
  recordMap: PageBlocks
  /** 自定义渲染器 */
  components?: any
  /** 块ID 内部用 */
  blockId?: string
  className?: string
}

export const FlowUsRenderer: FC<FlowUsRendererProps> = ({ recordMap, ...rest }) => {
  const zoom = useMemo(
    () =>
      typeof window !== 'undefined' &&
      mediumZoom({
        background: 'rgba(0, 0, 0, 0.8)',
        // minZoomScale: 2.0,
        margin: getMediumZoomMargin(),
      }),
    [],
  )

  return (
    <FlowUsContextProvider recordMap={recordMap} zoom={zoom}>
      <FlowUsBlockRenderer {...rest} />
    </FlowUsContextProvider>
  )
}

interface FlowUsBlockRendererProps {
  /** 块ID */
  blockId?: string
  /** 块等级 */
  level?: number
  /** 自定义样式 */
  className?: string
}

export const FlowUsBlockRenderer: FC<FlowUsBlockRendererProps> = (props) => {
  const { blockId, level = 0, ...rest } = props

  const { recordMap } = useFlowUsContext()

  const id = useMemo(() => {
    return blockId || Object.keys(recordMap.blocks)[0]
  }, [blockId, recordMap])

  const block = useMemo(() => {
    return recordMap.blocks[id]
  }, [recordMap])

  if (!block) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('missing block', blockId)
    }

    return null
  }
  return (
    <FlowUsBlock key={id} level={level} block={block} {...rest}>
      {block?.subNodes.map((contentBlockId) => (
        <FlowUsBlockRenderer
          key={contentBlockId}
          blockId={contentBlockId}
          level={level + 1}
          {...rest}
        />
      ))}
    </FlowUsBlock>
  )
}
