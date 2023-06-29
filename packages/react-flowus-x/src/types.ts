import { PageBlocks } from '@flowusx/flowus-types'
// import { PageBlocks } from 'packages/flowus-types/dist'
import React, { ReactNode } from 'react'

export type MapPageUrlFn = (pageId: string, recordMap?: PageBlocks) => string

export interface FlowUsComponents {
  /** 图片资源 */
  Image: any
  /** 代码块 */
  Code: any
  /** 公式 */
  Equation: any

  Checkbox: React.FC<{ isChecked: boolean; blockId?: string }>

  Collection: any
}

export interface FlowUsBlockProps<T = any> {
  children: ReactNode
  block: T
  blockId?: string
  level?: number
  className?: string
}
