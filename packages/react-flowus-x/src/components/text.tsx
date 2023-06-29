import React from 'react'
import { useFlowUsContext } from '../context'
import { Decoration, Block } from '@flowusx/flowus-types'
import cs from 'classnames'

// import { Block, Decoration, ExternalObjectInstance } from 'notion-types'
// import { parsePageId } from 'notion-utils'

// import { useNotionContext } from '../context'
// import { formatDate, getHashFragmentValue } from '../utils'
// import { EOI } from './eoi'
// import { GracefulImage } from './graceful-image'
// import { PageTitle } from './page-title'

interface TextProps<T = Block> {
  value: Decoration[]
  block: T
  linkProps?: any
  linkProtocol?: string
}

/**
 * Renders a single piece of Notion text, including basic rich text formatting.
 *
 * These represent the innermost leaf nodes of a Notion subtree.
 *
 * TODO: I think this implementation would be more correct if the reduce just added
 * attributes to the final element's style.
 */
export const Text = <T = Block,>({ value }: TextProps<T>) => {
  const { components } = useFlowUsContext()
  // console.log(block, linkProps, linkProtocol, recordMap)
  return (
    <React.Fragment>
      {value?.map(({ text, type, enhancer, url, startDate, startTime }, index) => {
        const formatted = (() => {
          // TODO notion-text-字体
          const enhancerClass = Object.keys(enhancer).map((key) => `notion-text-${key}`)

          switch (type) {
            // case 'p': {
            //   // link to an internal block (within the current workspace)
            //   const blockId = decorator[1]
            //   const linkedBlock = recordMap.block[blockId]?.value
            //   if (!linkedBlock) {
            //     console.log('"p" missing block', blockId)
            //     return null
            //   }
            //
            //   // console.log('p', blockId)
            //
            //   return (
            //     <components.PageLink className="notion-link" href={mapPageUrl(blockId)}>
            //       <PageTitle block={linkedBlock} />
            //     </components.PageLink>
            //   )
            // }

            // case '‣': {
            //   // link to an external block (outside of the current workspace)
            //   const linkType = decorator[1][0]
            //   const id = decorator[1][1]
            //
            //   switch (linkType) {
            //     case 'u': {
            //       const user = recordMap.notion_user[id]?.value
            //
            //       if (!user) {
            //         console.log('"‣" missing user', id)
            //         return null
            //       }
            //
            //       const name = [user.given_name, user.family_name].filter(Boolean).join(' ')
            //
            //       return (
            //         <GracefulImage
            //           className="notion-user"
            //           src={mapImageUrl(user.profile_photo, block)}
            //           alt={name}
            //         />
            //       )
            //     }
            //
            //     default: {
            //       const linkedBlock = recordMap.block[id]?.value
            //
            //       if (!linkedBlock) {
            //         console.log('"‣" missing block', linkType, id)
            //         return null
            //       }
            //
            //       return (
            //         <components.PageLink
            //           className="notion-link"
            //           href={mapPageUrl(id)}
            //           {...linkProps}
            //           target="_blank"
            //           rel="noopener noreferrer"
            //         >
            //           <PageTitle block={linkedBlock} />
            //         </components.PageLink>
            //       )
            //     }
            //   }
            // }

            // 内联公式
            // case 'e':
            //   return <components.Equation math={decorator[1]} inline />

            // 讨论
            // case 'm':
            // comment / discussion
            // return element //still need to return the base element

            // case 'a': {
            //   const v = decorator[1]
            //   const pathname = v.substr(1)
            //   const id = parsePageId(pathname, { uuid: true })
            //
            //   if ((v[0] === '/' || v.includes(rootDomain)) && id) {
            //     const href = v.includes(rootDomain)
            //       ? v
            //       : `${mapPageUrl(id)}${getHashFragmentValue(v)}`
            //
            //     return (
            //       <components.PageLink className="notion-link" href={href} {...linkProps}>
            //         {element}
            //       </components.PageLink>
            //     )
            //   } else {
            //     return (
            //       <components.Link
            //         className="notion-link"
            //         href={linkProtocol ? `${linkProtocol}:${decorator[1]}` : decorator[1]}
            //         {...linkProps}
            //       >
            //         {element}
            //       </components.Link>
            //     )
            //   }
            // }

            case 0:
              return <span className={cs(enhancerClass)}>{text}</span>

            case 3:
              return (
                <a target="_blank" className={cs(enhancerClass, 'notion-text-link')} href={url}>
                  {text}
                </a>
              )

            case 4: {
              // TODO 引用页面等
              return (
                <a className={cs(enhancerClass, 'notion-text-link')} href={url}>
                  {text}
                </a>
              )
            }

            case 6: {
              // 时间
              return (
                <span className={cs(enhancerClass)}>
                  {startDate} {startTime}
                </span>
              )
            }
            case 7: {
              // 人员 不支持
              return null
            }

            case 8: {
              // 内联公式
              return <components.Equation math={text} inline />
            }

            // case 'u': {
            //   const userId = decorator[1]
            //   const user = recordMap.notion_user[userId]?.value
            //
            //   if (!user) {
            //     console.log('missing user', userId)
            //     return null
            //   }
            //
            //   const name = [user.given_name, user.family_name].filter(Boolean).join(' ')
            //
            //   return (
            //     <GracefulImage
            //       className="notion-user"
            //       src={mapImageUrl(user.profile_photo, block)}
            //       alt={name}
            //     />
            //   )
            // }
            //
            // case 'eoi': {
            //   const blockId = decorator[1]
            //   const externalObjectInstance = recordMap.block[blockId]
            //     ?.value as ExternalObjectInstance
            //
            //   return <EOI block={externalObjectInstance} inline={true} />
            // }

            default:
              if (process.env.NODE_ENV !== 'production') {
                console.log('unsupported text format', type)
              }

              return text
          }
        })()

        return <React.Fragment key={index}>{formatted}</React.Fragment>
      })}
    </React.Fragment>
  )
}
