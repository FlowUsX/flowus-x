import { BlockType } from '../const/flowus'
import { Block, Blocks } from '@flowusx/flowus-types'
import { FlowUsClient } from '@flowusx/flowus-client'

export interface TransformPrams {
  block: Block
  blocks: Blocks
  pageTitle: string
}

export type Transform = {
  [key in BlockType]: (data: TransformPrams) => string
}

export interface ConfigOptions {
  saveChildPage?: boolean
}

export interface FlowUsToMarkdownOptions {
  client?: FlowUsClient
  config?: ConfigOptions
}
