export interface BlockData {
  /** 文档属性 */
  collectionProperties?: {
    [key: string]: {
      enhancer?: { [key: string]: any }
      fileStorageType?: string
      height?: number
      size?: number
      text?: string
      type?: number
      url?: string
      uuid?: string
      width?: number
      [key: string]: any
    }[]
  }
  collectionPageProperties?: {
    property: string
    visible: boolean
  }[]
  cover: string
  coverPos: number
  format: {
    tableBlockColumnOrder: string[]
    tableBlockRowHeader: boolean
    [key: string]: any
  }
  icon: {
    type: string
    value: string
  }
  pageFixedWidth: boolean
  segments: {
    enhancer: {
      italic: boolean
      bold: boolean
      lineThrough: boolean
      underline: boolean
      code: boolean
    }
    url: string
    text: string
    type: number
    startDate: string
    startTime: string
  }[]
  level: number
  checked: boolean
  ossName: string
  fullLink: string
  display: string
  link: string
  schema: Schema
  extName: string
  [key: string]: any
}

export interface Schema {
  [key: string]: {
    name: string
    type: string
    options: {
      id: string
      color: string
      value: string
    }[]
    formula: {
      text: string
      refProps: {
        [key: string]: string
      }
    }
  }
}

export interface Block {
  backgroundColor: string
  createdAt: number
  createdBy: string
  data: BlockData
  discussions: string[]
  isTemplate: null
  moved: null
  parentId: string
  spaceId: string
  status: number
  subNodes: string[]
  templatePages: null
  textColor: string
  title: string
  type: number
  updatedAt: number
  updatedBy: string
  uuid: string
  version: number
  views: null
  [key: string]: any
}

export interface Blocks {
  [blockId: string]: Block
}

export interface PageBlocks {
  blocks: Blocks
  collectionViews: {
    [blockId: string]: {
      collectionId: null
      createdAt: number
      createdBy: string
      deletedBy: null
      format: {
        tableProperties: {
          property: string
          visible: boolean
        }[]
        tableWrap: boolean
      }
      pageSort: string[]
      parentId: string
      shareId: null
      spaceId: string
      status: number
      title: string
      type: string
      updatedAt: number
      updatedBy: string
      uuid: string
      version: number
    }
  }
}

export interface BaseBlock {
  uuid: string
  parentId: string
  spaceId: string
  type: number

  title: string
  backgroundColor: string
  textColor: string

  updatedAt: number
  updatedBy: string
  createdAt: number
  createdBy: string

  status: 1
  version: number
}

export interface BaseBlockData {
  segments: {
    text: string
    url: string
    type: number
    enhancer: {
      bold?: boolean
      underline?: boolean
      lineThrough?: boolean
      italic?: boolean
      code?: boolean
      textColor?: string
    }
    uuid?: string
    startDate?: string
    startTime?: string
  }[]
  format: {}
  pageFixedWidth: boolean
}

export interface DocBlockData extends BaseBlockData {
  /** 图标 */
  icon: {
    type: string
    value: string
  }
  /** 文档属性 */
  collectionPageProperties: {
    visible: boolean
    property: string
  }[]
  /** 封面 */
  cover: string
}

export interface TextBlockData extends BaseBlockData {
  level: number
}

/**
 * 文档类型
 */
export interface DocBlock extends BaseBlock {
  type: 0
  data: DocBlockData
  subNodes: string[]
}

/**
 * 文本
 */
export interface TextBlock extends BaseBlock {
  type: 1
  data: TextBlockData
}

export interface TodoBlockData extends BaseBlockData {
  checked: boolean
  level: number
}

/**
 * 待办事项
 */
export interface TodoBlock extends BaseBlock {
  type: 3
  data: TodoBlockData
  subNodes: string[]
}

/**
 * 无序标签
 */
export interface UnorderedListBlock extends BaseBlock {
  type: 4
  data: BaseBlockData
  subNodes: string[]
}

/**
 * 有序标签
 */
export interface NumberedListBlock extends BaseBlock {
  type: 5
  data: BaseBlockData
  subNodes: string[]
}

/**
 * 折叠列表
 */
export interface ToggleBlock extends BaseBlock {
  type: 6
  data: BaseBlockData
  subNodes: string[]
}

/**
 * 标题
 */
export interface TitleBlock extends BaseBlock {
  type: 7
  data: TextBlockData
}

/**
 * 分割线
 */
export interface DividingBlock extends BaseBlock {
  type: 9
  data: TextBlockData
}

/**
 * 引用
 */
export interface QuoteBlock extends BaseBlock {
  type: 12
  data: TextBlockData
}

/**
 * 着重文字
 */
export interface EmphasisTextBlock extends BaseBlock {
  type: 13
  data: BaseBlockData
}

export interface ImageBlockData extends BaseBlockData {
  size: number
  width: number
  height: number
  format: {
    width: number
    height: number
    blockFullWidth: boolean
    blockPageWidth: boolean
    captionGravity: 'LEFT' | 'CENTER' | 'RIGHT'
    contentGravity: 'LEFT' | 'CENTER' | 'RIGHT'
  }
  display: 'image'
  extName: string
  ossName: string
  viewMode: string
  /** 完整的链接 */
  fullLink: string
}

/**
 * 图片
 */
export interface ImageBlock extends BaseBlock {
  type: 14
  data: ImageBlockData
}

export interface FileBlockData extends BaseBlockData {
  size: number
  width: number
  height: number
  format: {
    width: number
    height: number
    blockFullWidth: boolean
    blockPageWidth: boolean
  }
  display: 'file'
  extName: string
  ossName: string
  viewMode: string
  /** 完整的链接 */
  fullLink: string
}

/**
 * 文件
 */
export interface FileBlock extends BaseBlock {
  type: 14
  data: FileBlockData
}

/**
 * 内嵌文件夹
 */
export interface EmbedFolderBlock extends BaseBlock {
  type: 15
  data: BaseBlockData
}

export interface EmbedPageBlockData extends BaseBlockData {
  ref: {
    uuid: string
  }
  display: 'linkPage'
}

/**
 * 引用页面
 */
export interface ReferencePageBlock extends BaseBlock {
  type: 16
  data: EmbedPageBlockData
}

export interface DataTableBlockData extends BaseBlockData {
  icon: {
    type: string
    value: string
  }
  cover: string
  schema: {
    title: Schema
    [blockId: string]: Schema
  }
  /** 表格属性 */
  collectionPageProperties: {
    visible: boolean
    property: string
  }[]
}

/**
 * 数据表格
 */
export interface DataTableBlock extends BaseBlock {
  type: 18
  data: DataTableBlockData
  views: string[]
  subNodes: string[]
}

export interface DataTableInlineBlockData extends DataTableBlockData {
  level: number
}

/**
 * 内嵌数据表格
 */
export interface DataTableInlineBlock extends BaseBlock {
  type: 19
  data: DataTableInlineBlockData
  views: string[]
  subNodes: string[]
}

export interface EmbedWebpageBlockData extends BaseBlockData {
  link: string
  format: {
    width: number
    height: number
    blockFullWidth: boolean
  }
  embedType: 'webpage'
}

/**
 * 内嵌网页
 */
export interface EmbedWebpageBlock extends BaseBlock {
  type: 20
  data: EmbedWebpageBlockData
}

export interface WebBookmarkBlockData extends BaseBlockData {
  icon: {
    type: string
    value: string
  }
  link: string
  cover: ''
  linkInfo: {
    text: string
    type: number
    enhancer: {}
  }[]
  description: {
    text: string
    type: number
    enhancer: {}
  }[]
}

/**
 * 网页书签
 */
export interface WebBookmarkBlock extends BaseBlock {
  type: 21
  data: WebBookmarkBlockData
}

/**
 * 公式
 */
export interface EquationBlock extends BaseBlock {
  type: 23
  data: BaseBlockData
}

export interface CodeBlockData extends BaseBlockData {
  format: {
    // language: 'TypeScript'
    language: string
  }
  description: {
    text: string
    type: number
    enhancer: {}
  }[]
}

/**
 * 代码块
 */
export interface CodeBlock extends BaseBlock {
  type: 25
  data: CodeBlockData
}

export interface EmbedMediaBlockData extends BaseBlockData {
  link: string
  display: string
  extName: string
}

/**
 * 内嵌媒体
 */
export interface EmbedMediaBlock extends BaseBlock {
  type: 26
  data: EmbedMediaBlockData
}

export interface TableBlockData extends BaseBlockData {
  format: {
    tableBlockRowHeader: boolean
    tableBlockColumnOrder: string[]
    tableBlockColumnFormat?: {
      [key: string]: {
        textColor: string
        width: number
      }
    }
  }
}

/**
 * 表格
 */
export interface TableBlock extends BaseBlock {
  type: 27
  data: TableBlockData
  subNodes: string[]
}

export interface TableRowBlockData extends BaseBlockData {
  collectionProperties: {
    [key: string]: Decoration[]
  }
  format: {
    backgroundColor: string
    tableBlockRowHeader: boolean
    tableBlockColumnOrder: string[]
  }
}

/**
 * 表格
 */
export interface TableRowBlock extends BaseBlock {
  type: 28
  data: TableRowBlockData
}

/**
 * 引用多维表
 */
export interface ReferenceDataTableBlock extends BaseBlock {
  type: 29
  data: EmbedPageBlockData
}

export interface MindMapBlockData extends BaseBlockData {
  format: {
    mindMappingFormat: {
      oldBlockType: number
    }
  }
}

/**
 * 思维导图
 */
export interface MindMapBlock extends BaseBlock {
  type: 36
  data: MindMapBlockData
  subNodes: string[]
}

/**
 * 内嵌思维导图页面
 */
export interface MindMapInlineBlock extends BaseBlock {
  type: 37
  data: MindMapBlockData
  subNodes: string[]
}

/**
 * 内嵌思维导图页面
 */
export interface ToggleTitleBlock extends BaseBlock {
  type: 38
  data: TextBlockData
  subNodes: string[]
}

/**
 * 文字装饰器
 */
export interface Decoration {
  text: string
  /** 0:正常文字 3:链接 4:引用 6:时间 7:成员 8:内联公式 */
  type: number
  enhancer: {
    bold?: boolean
    underline?: boolean
    lineThrough?: boolean
    italic?: boolean
    code?: boolean
    textColor?: string
  }
  url?: string
  startDate?: string
  startTime?: string
  uuid?: string
}
