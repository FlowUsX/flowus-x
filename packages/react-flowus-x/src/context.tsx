import React, { createContext, FC, ReactNode, useContext, useMemo } from 'react'
import { PageBlocks } from '@flowusx/flowus-types'
import { FlowUsComponents, MapPageUrlFn } from './types'
import { Checkbox as DefaultCheckBox } from './components/default/checkbox'
import { defaultMapPageUrl } from './utils/map-page-url'
import { Equation } from './lib/equation'
import { Code } from './lib/code'

const defaultComponents: FlowUsComponents = {
  Code: Code,
  Equation: Equation,

  Collection: null,
  /** 复选框  */
  Checkbox: DefaultCheckBox,
}

interface FlowUsContext {
  /** 页面BLock */
  recordMap: PageBlocks
  /** 自定义渲染器 */
  components: FlowUsComponents

  mapPageUrl: MapPageUrlFn
  // mapImageUrl?: MapImageUrlFn
  // searchNotion?: SearchNotionFn
  // isShowingSearch?: boolean
  // onHideSearch?: () => void

  // rootPageId?: string
  // rootDomain?: string

  // fullPage: boolean
  // darkMode: boolean
  // previewImages: boolean
  // forceCustomImages: boolean
  // showCollectionViewDropdown: boolean
  // showTableOfContents: boolean
  // minTableOfContentsItems: number
  // linkTableTitleProperties: boolean
  // isLinkCollectionToUrlProperty: boolean

  // defaultPageIcon?: string
  // defaultPageCover?: string
  // defaultPageCoverPosition?: number

  zoom?: any
}

const defaultFlowUsContext: FlowUsContext = {
  recordMap: {
    blocks: {},
    collectionViews: {},
  },
  components: defaultComponents,

  mapPageUrl: defaultMapPageUrl(),
  zoom: null,
}

const context = createContext<FlowUsContext>(defaultFlowUsContext)

interface FlowUsContextProviderProps extends FlowUsContext {
  children?: ReactNode
}

export const FlowUsContextProvider: FC<Partial<FlowUsContextProviderProps>> = (props) => {
  const { children, ...rest } = props

  const value = useMemo(() => {
    return {
      ...defaultFlowUsContext,
      ...rest,
    }
  }, [rest])

  return <context.Provider value={value}>{children}</context.Provider>
}

export const useFlowUsContext = () => useContext(context)
