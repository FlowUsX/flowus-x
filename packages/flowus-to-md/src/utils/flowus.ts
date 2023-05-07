import { BlockType, BlockTypeText } from '../const/flowus'
import { Block, Blocks } from '@flowusx/flowus-types'

import {
  addTabSpace,
  bold,
  bullet,
  codeBlock,
  divider,
  equation,
  heading,
  image,
  inlineCode,
  inlineEquation,
  italic,
  link,
  quote,
  strikethrough,
  table,
  todo,
  toggle,
  underline,
} from './md'
import { Transform } from '../types'
import { out } from '@flowusx/flowus-shared'

export const _unsupported = (type: BlockType) => {
  return () => {
    out.warning(`暂不支持的块类型: ${BlockTypeText[type]}`)
    // TODO DEBUG 输出block信息
    return ''
  }
}

export const getTextValue = (block: Block) => {
  let str = ''
  block.data.segments?.forEach((item) => {
    if (item.enhancer.bold) {
      // 加粗
      str += bold(item.text)
    } else if (item.enhancer.underline) {
      // 下划线
      str += underline(item.text)
    } else if (item.enhancer.italic) {
      // 斜体
      str += italic(item.text)
    } else if (item.enhancer.lineThrough) {
      // 删除线
      str += strikethrough(item.text)
    } else if (item.enhancer.code) {
      // 行内代码
      str += inlineCode(item.text)
    } else if (item.type === 8) {
      // 行内公式
      str += inlineEquation(item.text)
    } else {
      str += item.text
    }
  })
  return str
}

export const getTodoValue = (block: Block) => {
  // return block.data.segments.map(segment => segment.text).join('')
  return todo(block.title, block.data.checked)
}

export const getUnorderedListValue = (block: Block, blocks: Blocks) => {
  // return block.data.segments.map(segment => segment.text).join('')
  let childrenStr = '\n'
  const childrenIds = block.subNodes
  childrenIds.forEach((id) => {
    const childBlock = blocks[id]
    childrenStr += addTabSpace(transform[childBlock.type as BlockType](childBlock, blocks), 1)
  })
  return bullet(block.title) + childrenStr
}

export const getNumberedListValue = (block: Block, blocks: Blocks, count = 1) => {
  // return block.data.segments.map(segment => segment.text).join('')
  let childrenStr = '\n'
  const childrenIds = block.subNodes
  childrenIds.forEach((id) => {
    const childBlock = blocks[id]
    childrenStr += addTabSpace(transform[childBlock.type as BlockType](childBlock, blocks), 1)
  })
  return bullet(block.title, count) + childrenStr
}

export const getToggleValue = (block: Block, blocks: Blocks) => {
  let childrenStr = ''
  const childrenIds = block.subNodes
  childrenIds.forEach((id) => {
    const childBlock = blocks[id]
    childrenStr = transform[childBlock.type as BlockType](childBlock, blocks)
  })
  return toggle(block.title, childrenStr)
}

export const getTitleValue = (block: Block) => {
  // return block.data.segments.map(segment => segment.text).join('')
  return heading(block.title, block.data.level)
}

export const getDividingValue = () => {
  return divider()
}

export const getQuoteValue = (block: Block) => {
  return quote(block.title)
}

export const getEmphasisTextValue = (block: Block) => {
  let text = block.title
  if (block.data.icon.type === 'emoji') {
    text = block.data.icon.value + ' ' + text
  }
  return quote(text)
}

export const getMediaValue = (block: Block) => {
  if (block.data.display === 'image') {
    return image(block.title, block.data.fullLink || block.data.ossName)
  } else if (block.data.display === 'video') {
    return link(block.title, block.data.fullLink || block.data.ossName)
  }
  return ''
}

export const getLinkValue = (block: Block) => {
  return link(block.title || block.data.link, block.data.link)
}

export const getEquationValue = (block: Block) => {
  return equation(block.title)
}

export const getCodeValue = (block: Block) => {
  return codeBlock(block.title, block.data.format.language)
}

export const getTableValue = (block: Block, blocks: Blocks) => {
  // 找到table，然后找到行，然后按照行来渲染
  // 列顺序items
  const columns = block.data.format.tableBlockColumnOrder
  // 二维行数组
  const cells: string[][] = []
  block.subNodes.forEach((subNode) => {
    // 行数组
    const cellString: string[] = []
    const columnObj = blocks[subNode].data.collectionProperties!
    if (columnObj) {
      Object.keys(columnObj).forEach((columnkey) => {
        columns.forEach((column) => {
          if (columnkey === column) {
            const cell = columnObj[columnkey][0].text!
            cellString.push(cell)
          }
        })
      })
      // 生成二维行数组
      cells.push(cellString)
    }
  })
  // 转Table
  return '\n' + table(cells) + '\n'
}

export const transform: Transform = {
  [BlockType.Doc]: _unsupported(BlockType.Doc),
  [BlockType.Text]: getTextValue,
  [BlockType.Todo]: getTodoValue,
  [BlockType.Unordered_List]: getUnorderedListValue,
  [BlockType.Numbered_List]: getNumberedListValue,
  [BlockType.Toggle]: getToggleValue,
  [BlockType.Title]: getTitleValue,
  [BlockType.Dividing]: getDividingValue,
  [BlockType.Quote]: getQuoteValue,
  [BlockType.Emphasis_Text]: getEmphasisTextValue,
  [BlockType.Media]: getMediaValue,
  [BlockType.Embed_Folder]: _unsupported(BlockType.Embed_Folder),
  [BlockType.Reference_Page]: _unsupported(BlockType.Reference_Page),
  [BlockType.Data_Table]: _unsupported(BlockType.Data_Table),
  [BlockType.Data_Table_Inline]: _unsupported(BlockType.Data_Table_Inline),
  [BlockType.Embed_Webpage]: getLinkValue,
  [BlockType.Web_Bookmark]: getLinkValue,
  [BlockType.Equation]: getEquationValue,
  [BlockType.Code]: getCodeValue,
  [BlockType.Embed_Media]: getLinkValue,
  [BlockType.Table]: getTableValue,
  [BlockType.Table_Row]: _unsupported(BlockType.Table_Row),
  [BlockType.Reference_Data_Table]: _unsupported(BlockType.Reference_Data_Table),
  [BlockType.Mind_Map]: _unsupported(BlockType.Mind_Map),
  [BlockType.Mind_Map_Page]: _unsupported(BlockType.Mind_Map_Page),
  [BlockType.Toggle_Title]: getToggleValue,
}
