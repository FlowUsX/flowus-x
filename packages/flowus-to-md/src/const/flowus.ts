export const enum BlockType {
  // 文档
  Doc = 0,
  Text = 1,
  Todo = 3,
  // 无序标签
  Unordered_List = 4,
  // 有序标签
  Numbered_List = 5,
  // 折叠列表
  Toggle = 6,
  // 标题
  Title = 7, // title有level
  // 分割线
  Dividing = 9,
  // 引用
  Quote = 12,
  // 着重文字
  Emphasis_Text = 13,
  // 图片
  Media = 14,
  // 数据表格
  Data_Table = 18,
  // 内嵌数据表格
  Data_Table_Inline = 19,
  // 网页书签
  Web_Bookmark = 21,
  // 公式
  Equation = 23,
  // 代码块
  Code = 25,
  // 表格
  Table = 27,
  // 表格行（包含表格标题）
  Table_Row = 28,
  // 思维导图
  Mind_Map = 36,
  // 折叠标题
  Toggle_Title = 38,
}
