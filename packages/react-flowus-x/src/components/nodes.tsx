import React, { ReactNode } from 'react'
import cs from 'classnames'
import { FlowUsBlockProps } from '../types'
import { useFlowUsContext } from '../context'
import {
  Block,
  CodeBlock,
  DividingBlock,
  DocBlock,
  EquationBlock,
  NumberedListBlock,
  QuoteBlock,
  TableBlock,
  TableRowBlock,
  TextBlock,
  TitleBlock,
  TodoBlock,
  ToggleBlock,
  ToggleTitleBlock,
  UnorderedListBlock,
  WebBookmarkBlock,
} from '@flowusx/flowus-types'
import { Text } from './text'
import { BlockType } from '../consts/block'
import { getListNumber } from '../utils'
import {
  getTextContent,
  uuidToId,
  getBlockParentPage,
  getPageTableOfContents,
} from '@flowusx/flowus-utils'
import { LinkIcon } from '../icons/link-icon'
import { MediaWrapper } from './media-wrapper'
import { PageTitle } from './page-title'
import { PageIcon } from './page-icon'
import { LazyImage } from './lazy-image'

const tocIndentLevelCache: {
  [blockId: string]: number
} = {}

// genDocNode
/**
 * 文档
 */
export const genDocNode = (props: FlowUsBlockProps<DocBlock>) => {
  const { block, children, level, blockId, className } = props
  const blockTextColor = block.textColor
  const blockBackgroundColor = block.backgroundColor
  const { mapPageUrl } = useFlowUsContext()
  console.log('genDocNode', props)

  if (level === 0) {
    const pageFixedWidth = block.data.pageFixedWidth

    return (
      <div
        className={cs(
          'flowus',
          'flowus-app',
          // darkMode ? 'dark-mode' : 'light-mode',
          blockId,
          className,
        )}
      >
        <div className="flowus-viewport" />

        <div className="flowus-frame">
          <div className="flowus-page-scroller">
            <main
              className={cs(
                'flowus-page',
                'flowus-page-no-cover',
                'flowus-page-no-icon',
                'flowus-page-has-text-icon',
                'flowus-full-page',
                !pageFixedWidth && 'flowus-full-width',
                // page_small_text && 'flowus-small-text',
                // bodyClassName,
              )}
            >
              {/*{page_icon && <PageIcon block={block} defaultIcon={defaultPageIcon} inline={false} />}*/}

              {/*{pageHeader}*/}

              {/*<h1 className="flowus-title">*/}
              {/*  {pageTitle ?? <Text value={properties?.title} block={block} />}*/}
              {/*</h1>*/}

              {/*{(block.type === 'collection_view_page' ||*/}
              {/*  (block.type === 'page' && block.parent_table === 'collection')) && (*/}
              {/*  <components.Collection block={block} ctx={ctx} />*/}
              {/*)}*/}

              <div
                className={cs(
                  'flowus-page-content',
                  pageFixedWidth && 'flowus-page-content-has-aside',
                  // hasToc && 'flowus-page-content-has-toc',
                )}
              >
                <article className="flowus-page-content-inner">{children}</article>

                {/*{pageFixedWidth && (*/}
                {/*  <PageAside*/}
                {/*    toc={toc}*/}
                {/*    activeSection={activeSection}*/}
                {/*    setActiveSection={setActiveSection}*/}
                {/*    hasToc={hasToc}*/}
                {/*    hasAside={hasAside}*/}
                {/*    pageAside={pageAside}*/}
                {/*  />*/}
                {/*)}*/}
              </div>

              {/*{pageFooter}*/}
            </main>

            {/*{footer}*/}
          </div>
        </div>
      </div>
    )
    // return <article className="flowus-page-content-inner">{children}</article>
  }
  console.log('genDocNode-123444', block)

  return (
    <a
      className={cs(
        'flowus-page-link',
        blockTextColor && `flowus-${blockTextColor}`,
        blockBackgroundColor && `flowus-${blockBackgroundColor}_background`,
        blockId,
      )}
      href={mapPageUrl(block.uuid)}
    >
      <PageTitle block={block as any} />
    </a>
  )
}

/**
 * 文本
 * @param props
 */
export const genTextNode = (props: FlowUsBlockProps<TextBlock>) => {
  const { block, children, blockId } = props
  const blockTextColor = block.textColor
  const blockBackgroundColor = block.backgroundColor

  return (
    <div
      className={cs(
        'flowus-text',
        blockTextColor && `flowus-${blockTextColor}`,
        blockBackgroundColor && `flowus-${blockBackgroundColor}_background`,
        blockId,
      )}
    >
      {block?.title && <Text value={block.data.segments} block={block} />}

      {children && <div className="flowus-text-children">{children}</div>}
    </div>
  )
}

/**
 * 待办事项ToDo
 * @param props
 */
export const genToDoNode = (props: FlowUsBlockProps<TodoBlock>) => {
  const { children, block, blockId } = props
  const isChecked = block.data.checked
  const { components } = useFlowUsContext()

  return (
    <div className={cs('flowus-to-do', blockId)}>
      <div className="flowus-to-do-item">
        <components.Checkbox blockId={blockId} isChecked={isChecked} />

        <div
          className={cs('flowus-to-do-body', {
            'flowus-to-do-checked': isChecked,
          })}
        >
          <Text value={block.data.segments} block={block} />
        </div>
      </div>

      <div className="flowus-to-do-children">{children}</div>
    </div>
  )
}

/**
 * 无序/有序列表
 * @param props
 */
export const genListNode = (props: FlowUsBlockProps<NumberedListBlock | UnorderedListBlock>) => {
  const { blockId, block, children } = props
  const { recordMap } = useFlowUsContext()

  const wrapList = (content: ReactNode, start?: number) =>
    block.type === BlockType.Unordered_List ? (
      <ul className={cs('flowus-list', 'flowus-list-disc', blockId)}>{content}</ul>
    ) : (
      <ol start={start} className={cs('flowus-list', 'flowus-list-numbered', blockId)}>
        {content}
      </ol>
    )

  let output: ReactNode | null

  if (block.subNodes.length) {
    output = (
      <>
        {block.data.segments.length && (
          <li>
            <Text value={block.data.segments} block={block} />
          </li>
        )}
        {wrapList(children)}
      </>
    )
  } else {
    output = block.data.segments.length ? (
      <li>
        <Text value={block.data.segments} block={block} />
      </li>
    ) : null
  }

  const isTopLevel = block.type !== recordMap.blocks[block.parentId].type
  const start = getListNumber(block.uuid, recordMap.blocks)

  return isTopLevel ? wrapList(output, start) : output
}

/**
 * 折叠列表
 * @param props
 */
export const genToggleNode = (props: FlowUsBlockProps<ToggleBlock>) => {
  const { blockId, children, block } = props
  return (
    <details className={cs('flowus-toggle', blockId)}>
      <summary>
        <Text value={block.data?.segments} block={block} />
      </summary>

      <div>{children}</div>
    </details>
  )
}

/**
 * 标题/折叠标题
 * @param props
 */
export const genTitleNode = (props: FlowUsBlockProps<TitleBlock | ToggleTitleBlock>) => {
  const { blockId, children, block } = props
  const { recordMap } = useFlowUsContext()
  if (!block.data.segments.length) return null

  const blockTextColor = block.textColor
  const blockBackgroundColor = block.backgroundColor
  const id = uuidToId(block.uuid)
  const title = getTextContent(block.data.segments) || `FlowUs Header ${id}`

  // we use a cache here because constructing the ToC is non-trivial
  let indentLevel = tocIndentLevelCache[block.uuid]
  let indentLevelClass: string = ''

  if (indentLevel === undefined) {
    // @ts-ignore
    const page = getBlockParentPage(block, recordMap)

    if (page) {
      const toc = getPageTableOfContents(page, recordMap)
      const tocItem = toc.find((tocItem) => tocItem.uuid === block.uuid)

      if (tocItem) {
        indentLevel = tocItem.indentLevel
        tocIndentLevelCache[block.uuid] = indentLevel
      }
    }
  }

  if (indentLevel !== undefined) {
    indentLevelClass = `flowus-h-indent-${indentLevel}`
  }

  const isH1 = (block.type === 7 || block.type === 38) && block.data.level === 1
  const isH2 = (block.type === 7 || block.type === 38) && block.data.level === 2
  const isH3 = (block.type === 7 || block.type === 38) && block.data.level === 3
  const isH4 = (block.type === 7 || block.type === 38) && block.data.level === 4

  const classNameStr = cs(
    blockTextColor && `flowus-${blockTextColor}`,
    blockBackgroundColor && `flowus-${blockBackgroundColor}_background`,
    indentLevelClass,
    blockId,
    {
      'flowus-h': isH1 || isH2 || isH3 || isH4,
      'flowus-h1': isH1,
      'flowus-h2': isH2,
      'flowus-h3': isH3,
      'flowus-h4': isH4,
    },
  )

  const innerHeader = (
    <span>
      <div id={id} className="flowus-header-anchor" />
      {/* 如果不是折叠标题，就展示锚点 */}
      {block.type !== 38 && (
        <a className="flowus-hash-link" href={`#${id}`} title={title}>
          <LinkIcon />
        </a>
      )}

      <span className="flowus-h-title">
        <Text value={block.data.segments} block={block} />
      </span>
    </span>
  )
  let headerBlock

  //page title takes the h1 so all header blocks are greater
  if (isH1) {
    headerBlock = (
      <h2 className={classNameStr} data-id={id}>
        {innerHeader}
      </h2>
    )
  } else if (isH2) {
    headerBlock = (
      <h3 className={classNameStr} data-id={id}>
        {innerHeader}
      </h3>
    )
  } else if (isH3) {
    headerBlock = (
      <h4 className={classNameStr} data-id={id}>
        {innerHeader}
      </h4>
    )
  } else {
    headerBlock = (
      <h5 className={classNameStr} data-id={id}>
        {innerHeader}
      </h5>
    )
  }

  if (block.type === 38) {
    return (
      <details className={cs('flowus-toggle', blockId)}>
        <summary>{headerBlock}</summary>
        <div>{children}</div>
      </details>
    )
  } else {
    return headerBlock
  }
}

/**
 * 分割线
 * @param props
 */
export const genDividerNode = (props: FlowUsBlockProps<DividingBlock>) => {
  const { blockId } = props
  return <hr className={cs('flowus-divider', blockId)} />
}

/**
 * 引用
 * @param props
 */
export const genQuoteNode = (props: FlowUsBlockProps<QuoteBlock>) => {
  const { blockId, children, block } = props
  if (!block.data.segments.length) return null

  const blockTextColor = block.textColor
  const blockBackgroundColor = block.backgroundColor

  return (
    <blockquote
      className={cs(
        'flowus-quote',
        blockTextColor && `flowus-${blockTextColor}`,
        blockBackgroundColor && `flowus-${blockBackgroundColor}_background`,
        blockId,
      )}
    >
      <div>
        <Text value={block.data.segments} block={block} />
      </div>
      {children}
    </blockquote>
  )
}

/**
 * 着重文字
 * @param props
 */
export const genEmphasisTextNode = (props: FlowUsBlockProps<QuoteBlock>) => {
  const { blockId, children, block } = props
  const blockTextColor = block.textColor
  const blockBackgroundColor = block.backgroundColor
  console.log('genEmphasisTextNode', block)
  // NOTE 着重文字组件
  return (
    <div
      className={cs(
        'flowus-emphasis',
        blockTextColor && `flowus-${blockTextColor}`,
        blockBackgroundColor && `flowus-${blockBackgroundColor}_background_co`,
        blockId,
      )}
    >
      <PageIcon block={block as Block} />

      <div className="flowus-emphasis-text">
        <Text value={block.data.segments} block={block} />
        {children}
      </div>
    </div>
  )
}

/**
 * 媒体
 * @param props
 */
export const genMediaNode = (props: FlowUsBlockProps<Block>) => {
  const { block } = props
  return <MediaWrapper block={block} />
}

/**
 * （引用页面）页面链接
 * @param props
 */
export const genPageLinkNode = (props: FlowUsBlockProps<Block>) => {
  console.log('genPageLinkNode', props)
  const { blockId, block } = props
  const blockTextColor = block.textColor
  const blockBackgroundColor = block.backgroundColor
  const { mapPageUrl } = useFlowUsContext()

  return (
    <a
      className={cs(
        'flowus-page-link',
        blockTextColor && `flowus-${blockTextColor}`,
        blockBackgroundColor && `flowus-${blockBackgroundColor}_background`,
        blockId,
      )}
      href={mapPageUrl(block.uuid)}
    >
      <PageTitle block={block} />
    </a>
  )
}

/**
 *  书签
 * @param props
 */
export const genBookmarkNode = (props: FlowUsBlockProps<WebBookmarkBlock>) => {
  console.log('genBookmarkNode', props)
  const { block, blockId } = props
  // const { mapImageUrl } = useFlowUsContext()
  if (!block.data.link) return null
  let title = getTextContent(block.data.linkInfo)
  const blockTextColor = block.textColor
  const blockBackgroundColor = block.backgroundColor
  return (
    <div className="flowus-row">
      <a
        target="_blank"
        rel="noopener noreferrer"
        className={cs(
          'flowus-bookmark',
          blockTextColor && `flowus-${blockTextColor}`,
          blockBackgroundColor && `flowus-${blockBackgroundColor}_background`,
          blockId,
        )}
        href={block.data.link}
      >
        <div>
          {title && (
            <div className="flowus-bookmark-title">
              <Text value={block.data.linkInfo} block={block} />
            </div>
          )}

          {block.data?.description && (
            <div className="flowus-bookmark-description">
              <Text value={block.data?.description} block={block} />
            </div>
          )}

          <div className="flowus-bookmark-link">
            {block.data?.icon && (
              <div className="flowus-bookmark-link-icon">
                <LazyImage src={block.data.icon.value} alt={title} block={block as any} />
              </div>
            )}

            <div className="flowus-bookmark-link-text">
              <Text value={[{ text: block.data.link, type: 0, enhancer: {} }]} block={block} />
            </div>
          </div>
        </div>

        {block.data?.cover && (
          <div className="flowus-bookmark-image">
            <LazyImage
              block={block as any}
              src={block.data.cover}
              alt={title}
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        )}
      </a>
    </div>
  )
}

/**
 * 公式
 * @param props
 */
export const genEquationNode = (props: FlowUsBlockProps<EquationBlock>) => {
  const { blockId, block } = props
  const { components } = useFlowUsContext()
  console.log('genEquationNode', block.title)

  return <components.Equation math={block.title} inline={false} className={blockId} />
}

/**
 * Code
 * @param props
 */
export const genCodeNode = (props: FlowUsBlockProps<CodeBlock>) => {
  const { block } = props
  const { components } = useFlowUsContext()
  console.log('genCodeNode', block.title)

  return <components.Code block={block as any} />
}

/**
 * 表格
 * @param props
 */
export const genTableNode = (props: FlowUsBlockProps<TableBlock>) => {
  const { children, blockId } = props

  return (
    <table className={cs('flowus-simple-table', blockId)}>
      <tbody>{children}</tbody>
    </table>
  )
}

/**
 * 表格行
 * @param props
 */
export const genTableRowNode = (props: FlowUsBlockProps<TableRowBlock>) => {
  const { recordMap } = useFlowUsContext()
  const { blockId, block } = props

  const tableBlock = recordMap.blocks[block.parentId] as TableBlock
  const order = tableBlock.data.format?.tableBlockColumnOrder
  const formatMap = tableBlock.data.format?.tableBlockColumnFormat
  const backgroundColor = block.data.format?.backgroundColor

  // console.log('tableBlock', tableBlock)
  // console.log('order', order)
  // console.log('block', block)
  // console.log('formatMap', formatMap)
  // console.log('backgroundColor', backgroundColor)

  if (!tableBlock || !order) {
    return null
  }

  return (
    <tr
      className={cs(
        'flowus-simple-table-row',
        backgroundColor && `flowus-${backgroundColor}_background`,
        blockId,
      )}
    >
      {order.map((column) => {
        const color = formatMap?.[column]?.textColor

        return (
          <td
            key={column}
            className={color ? `flowus-${color}` : ''}
            style={{
              width: formatMap?.[column]?.width || 120,
            }}
          >
            <div className="flowus-simple-table-cell">
              <Text value={block.data.collectionProperties?.[column]} block={block} />
            </div>
          </td>
        )
      })}
    </tr>
  )
}
