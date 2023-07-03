import { PageBlocks, Block } from '@flowusx/flowus-types'

/**
 * Returns the parent page block containing a given page.
 *
 * Note that many times this will not be the direct parent block since
 * some non-page content blocks can contain sub-blocks.
 */
export const getBlockParentPage = (block: Block, recordMap: PageBlocks) => {
  const parentId = block.parentId
  return recordMap.blocks[parentId]
}

export function getBlockCollectionId(block: Block): string | null {
  const collectionId = block.data?.ref?.uuid

  if (collectionId) {
    return collectionId
  }

  return null
}

export function getBlockTitle(block: Block, recordMap: PageBlocks) {
  if (block.title) {
    return block.title
  }

  if (block.type === 33 || block.type === 16) {
    const collectionId = getBlockCollectionId(block)

    if (collectionId) {
      const collection = recordMap.blocks[collectionId]

      if (collection) {
        return collection.title
      }
    }
  }

  return ''
}

export function getBlockIcon(block: Block, recordMap: PageBlocks) {
  if (block.data.icon?.value) {
    return block.data.icon?.value
  }

  if (block.type === 33) {
    const collectionId = getBlockCollectionId(block)
    if (collectionId) {
      const collection = recordMap.blocks[collectionId]

      if (collection) {
        return collection.data.icon?.value
      }
    }
  }

  return null
}
