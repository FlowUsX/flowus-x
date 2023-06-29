import React, { FC } from 'react'
import { BlockType } from '../consts/block'
import {
  genDividerNode,
  genDocNode,
  genEmphasisTextNode,
  genListNode,
  genMediaNode,
  genPageLinkNode,
  genQuoteNode,
  genTableNode,
  genTableRowNode,
  genTextNode,
  genTitleNode,
  genToDoNode,
  genToggleNode,
} from '../components/nodes'
import { FlowUsBlockProps } from '../types'

interface ReturnBlockProps {
  [key: number]: ((props: any) => React.ReactElement) | null
}

const blockNodeMap: ReturnBlockProps = {
  [BlockType.Doc]: genDocNode,
  [BlockType.Text]: genTextNode,
  [BlockType.Todo]: genToDoNode,
  [BlockType.Unordered_List]: genListNode,
  [BlockType.Numbered_List]: genListNode,
  [BlockType.Toggle]: genToggleNode,
  [BlockType.Title]: genTitleNode,
  [BlockType.Dividing]: genDividerNode,
  [BlockType.Quote]: genQuoteNode,
  [BlockType.Emphasis_Text]: genEmphasisTextNode,
  [BlockType.Media]: genMediaNode,
  [BlockType.Embed_Folder]: null,
  [BlockType.Reference_Page]: genPageLinkNode,
  [BlockType.Data_Table]: null,
  [BlockType.Data_Table_Inline]: genPageLinkNode,
  [BlockType.Embed_Webpage]: null,
  [BlockType.Web_Bookmark]: null,
  [BlockType.Equation]: null,
  [BlockType.Code]: null,
  [BlockType.Embed_Media]: genMediaNode,
  [BlockType.Table]: genTableNode,
  [BlockType.Table_Row]: genTableRowNode,
  [BlockType.Reference_Data_Table]: null,
  [BlockType.Reference_Data_Table_Page]: genPageLinkNode,
  [BlockType.Mind_Map]: null,
  [BlockType.Mind_Map_Inline]: genPageLinkNode,
  [BlockType.Toggle_Title]: genTitleNode,
}

/**
 * 所有块的渲染
 * @param props
 * @constructor
 */
export const FlowUsBlock: FC<FlowUsBlockProps> = (props) => {
  const { block } = props

  if (!block) {
    return null
  }

  if (blockNodeMap[block.type as BlockType]) {
    // @ts-ignore
    return blockNodeMap[block.type as BlockType](props)
  }
  return null
}
