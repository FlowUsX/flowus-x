import { Block, PageBlocks } from 'packages/flowus-types/dist'
import { getTextContent } from './get-text-content'

export interface TableOfContentsEntry {
  uuid: string
  type: number
  text: string
  indentLevel: number
}

/**
 * Gets the metadata for a table of contents block by parsing the page's
 * H1, H2, and H3 elements.
 */
export const getPageTableOfContents = (
  page: Block,
  recordMap: PageBlocks,
): Array<TableOfContentsEntry> => {
  const toc = (page.subNodes ?? [])
    .map((blockId) => {
      const block = recordMap.blocks[blockId]

      if (block) {
        const {
          type,
          data: { level },
        } = block

        if (type === 7) {
          return {
            uuid: blockId,
            type,
            text: getTextContent(block.data.segments),
            indentLevel: level,
          }
        }
      }

      return null
    })
    .filter(Boolean) as Array<TableOfContentsEntry>

  const indentLevelStack = [
    {
      actual: -1,
      effective: -1,
    },
  ]

  // Adjust indent levels to always change smoothly.
  // This is a little tricky, but the key is that when increasing indent levels,
  // they should never jump more than one at a time.
  for (const tocItem of toc) {
    const { indentLevel } = tocItem
    const actual = indentLevel

    do {
      const prevIndent = indentLevelStack[indentLevelStack.length - 1]
      const { actual: prevActual, effective: prevEffective } = prevIndent

      if (actual > prevActual) {
        tocItem.indentLevel = prevEffective + 1
        indentLevelStack.push({
          actual,
          effective: tocItem.indentLevel,
        })
      } else if (actual === prevActual) {
        tocItem.indentLevel = prevEffective
        break
      } else {
        indentLevelStack.pop()
      }

      // eslint-disable-next-line no-constant-condition
    } while (true)
  }

  return toc
}
