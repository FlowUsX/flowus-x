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
  // 分栏布局
  Grid = 10,
  // 分栏列
  Grid_Column = 11,
  // 引用
  Quote = 12,
  // 着重文字
  Emphasis_Text = 13,
  // 图片
  Media = 14,
  // 内嵌文件夹
  Embed_Folder = 15,
  // 引用页面
  Reference_Page = 16,
  // 数据表格
  Data_Table = 18,
  // 内嵌数据表格
  Data_Table_Inline = 19,
  // 内嵌网页
  Embed_Webpage = 20,
  // 网页书签
  Web_Bookmark = 21,
  // 公式
  Equation = 23,
  // 代码块
  Code = 25,
  // 内嵌媒体
  Embed_Media = 26,
  // 表格
  Table = 27,
  // 表格行（包含表格标题）
  Table_Row = 28,
  // 引用多维表
  Reference_Data_Table = 29,
  // 同步块
  Sync_Block = 31,
  // 思维导图
  Mind_Map = 36,
  // 内嵌思维导图页面
  Mind_Map_Page = 37,
  // 折叠标题
  Toggle_Title = 38,
}

export const BlockTypeText = {
  [BlockType.Doc]: '文档',
  [BlockType.Text]: '正文',
  [BlockType.Todo]: '待办列表',
  [BlockType.Unordered_List]: '项目列表',
  [BlockType.Numbered_List]: '编号列表',
  [BlockType.Toggle]: '折叠列表',
  [BlockType.Title]: '标题',
  [BlockType.Dividing]: '分割线',
  [BlockType.Grid]: '分栏',
  [BlockType.Grid_Column]: '分栏列',
  [BlockType.Quote]: '引述文字',
  [BlockType.Emphasis_Text]: '着重文字',
  [BlockType.Media]: '媒体',
  [BlockType.Embed_Folder]: '文件夹',
  [BlockType.Reference_Page]: '引用页面',
  [BlockType.Data_Table]: '多维表',
  [BlockType.Data_Table_Inline]: '内嵌多维表',
  [BlockType.Embed_Webpage]: '嵌入网页',
  [BlockType.Web_Bookmark]: '网页书签',
  [BlockType.Equation]: '数学公式',
  [BlockType.Code]: '代码片段',
  [BlockType.Embed_Media]: '嵌入媒体',
  [BlockType.Table]: '表格',
  [BlockType.Table_Row]: '表格行',
  [BlockType.Reference_Data_Table]: '引用多维表',
  [BlockType.Sync_Block]: '同步块',
  [BlockType.Mind_Map]: '思维导图',
  [BlockType.Mind_Map_Page]: '内嵌思维导图页面',
  [BlockType.Toggle_Title]: '折叠标题',
}
