export interface BaseDoc {
  /** 文章唯一ID */
  id: string
  /** 文章ID */
  doc_id: string
  /** 更新时间，冗余字段 */
  updated: number
}

/** 文章属性 */
export interface DocProperties {
  urlname: string
  title: string
  date: string
  updated: string
  [key: string]: any
}

/** 语雀文档目录 */
export interface DocCatalog {
  title: string
  doc_id: string
}

/** 文章详情 */
export interface DocDetail extends BaseDoc {
  /** 实际部署时的文档字符串 */
  body: string
  /** 原始文档字符串 */
  body_original: string
  /** 文章属性 */
  properties: DocProperties
  /** 文章目录路径 */
  catalog?: DocCatalog[]
}
