import { BlockType } from '../const/flowus'
import { Block, Blocks } from '@flowusx/flowus-types'
import { FlowUsClient } from '@flowusx/flowus-client'

export type Transform = {
  [key in BlockType]: (block: Block, blocks: Blocks) => string
}

export interface ConfigOptions {
  saveChildPage?: boolean
}

export interface FlowUsToMarkdownOptions {
  client?: FlowUsClient
  config?: ConfigOptions
}
