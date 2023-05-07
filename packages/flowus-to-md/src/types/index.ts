import { BlockType } from '../const/flowus'
import { Block, Blocks } from '@flowusx/flowus-types'

export type Transform = {
  [key in BlockType]: (block: Block, blocks: Blocks) => string
}
