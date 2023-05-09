export interface BlockData {
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
}

export interface Schema {
  [key: string]: {
    name: string
    type: string
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
}

export interface Blocks {
  [key: string]: Block
}

export interface PageBlocks {
  blocks: Blocks
  collectionViews: {
    [key: string]: {
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
