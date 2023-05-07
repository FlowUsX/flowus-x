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
  // 思维导图
  Mind_Map = 36,
  // 内嵌思维导图页面
  Mind_Map_Page = 37,
  // 折叠标题
  Toggle_Title = 38,
}

export const BlockTypeText = {
  0: '文档',
  1: '正文',
  3: '待办列表',
  4: '项目列表',
  5: '编号列表',
  6: '折叠列表',
  7: '标题',
  9: '分割线',
  12: '引述文字',
  13: '着重文字',
  14: '媒体',
  15: '文件夹',
  16: '引用页面',
  18: '多维表',
  19: '内嵌多维表',
  20: '嵌入网页',
  21: '网页书签',
  23: '数学公式',
  25: '代码片段',
  26: '嵌入媒体',
  27: '表格',
  28: '表格行',
  29: '引用多维表',
  36: '思维导图',
  37: '思维导图页面',
  38: '折叠标题',
}
