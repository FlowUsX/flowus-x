import React from 'react'
// import { useFlowUsContext } from '../context'
import { Decoration, Block } from '@flowusx/flowus-types'
import cs from 'classnames'
import { useFlowUsContext } from '../context'
import { PageTitle } from './page-title'

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
  const { components, recordMap, mapPageUrl } = useFlowUsContext()
  return (
    <React.Fragment>
      {value?.map(({ text, uuid, type, enhancer, url, startDate, startTime }, index) => {
        const formatted = (() => {
          // TODO flowus-text-字体
          let enhancerClass = Object.keys(enhancer).map((key) => {
            if (key === 'textColor') {
              return `flowus-${enhancer.textColor}`
            }
            return `flowus-text-${key}`
          })

          // 解决下划线和删除线同时存在的问题
          if (
            enhancerClass.includes('flowus-text-underline') &&
            enhancerClass.includes('flowus-text-lineThrough')
          ) {
            enhancerClass = enhancerClass.filter((item) => {
              return item !== 'flowus-text-underline' && item !== 'flowus-text-lineThrough'
            })
            enhancerClass.push('flowus-text-underline-lineThrough')
          }

          switch (type) {
            case 0:
              return <span className={cs(enhancerClass)}>{text}</span>

            case 3:
              return (
                <a target="_blank" className={cs(enhancerClass, 'flowus-text-link')} href={url}>
                  {text}
                </a>
              )

            case 4: {
              const block = recordMap.blocks[uuid!]
              return (
                <a className={cs('flowus-link', block.uuid)} href={mapPageUrl(block.uuid)}>
                  <PageTitle block={block} />
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
              return <components.Equation math={text} inline />
              // return <span className={cs(enhancerClass)}>{text}</span>
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
            //       className="flowus-user"
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
