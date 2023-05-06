import { BlockType } from '../const/flowus'
import { Block, Blocks } from '../types/flowus'
import {
  addTabSpace,
  bullet,
  codeBlock,
  divider,
  equation,
  heading,
  image,
  link,
  quote,
  table,
  todo,
  toggle,
} from './md'

export const getTextValue = (block: Block) => {
  // return block.data.segments.map(segment => segment.text).join('')
  return block.title
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
    childrenStr += addTabSpace(transform[childBlock.type](childBlock, blocks), 1)
  })
  return bullet(block.title) + childrenStr
}

export const getNumberedListValue = (block: Block, blocks: Blocks) => {
  // return block.data.segments.map(segment => segment.text).join('')
  let childrenStr = '\n'
  const childrenIds = block.subNodes
  childrenIds.forEach((id) => {
    const childBlock = blocks[id]
    childrenStr += addTabSpace(transform[childBlock.type](childBlock, blocks), 1)
  })
  return bullet(block.title, 1) + childrenStr
}

export const getToggleValue = (block: Block, blocks: Blocks) => {
  let childrenStr = ''
  const childrenIds = block.subNodes
  childrenIds.forEach((id) => {
    const childBlock = blocks[id]
    childrenStr = transform[childBlock.type](childBlock, blocks)
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
    return image(block.title, block.data.fullLink)
  } else if (block.data.display === 'video') {
    return link(block.title, block.data.fullLink)
  }
  return ''
}

export const nonsupport = () => ''

export const getLinkValue = (block: Block) => {
  return link(block.title, block.data.link)
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
    Object.keys(blocks[subNode].data.collectionProperties).forEach((columnkey) => {
      columns.forEach((column) => {
        if (columnkey === column) {
          const cell = blocks[subNode].data.collectionProperties[columnkey][0].text
          cellString.push(cell)
        }
      })
    })
    // 生成二维行数组
    cells.push(cellString)
  })
  // 转Table
  return table(cells)
}

export const transform = {
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
  [BlockType.Data_Table]: nonsupport,
  [BlockType.Data_Table_Inline]: nonsupport,
  [BlockType.Web_Bookmark]: getLinkValue,
  [BlockType.Equation]: getEquationValue,
  [BlockType.Code]: getCodeValue,
  [BlockType.Table]: getTableValue,
  [BlockType.Table_Row]: nonsupport,
  [BlockType.Mind_Map]: nonsupport,
  [BlockType.Toggle_Title]: getToggleValue,
}
