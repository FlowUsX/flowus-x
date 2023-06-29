import { Decoration } from '@flowusx/flowus-types'

export const getTextContent = (text?: Decoration[]): string => {
  if (!text) {
    return ''
  } else if (Array.isArray(text)) {
    return (
      text?.reduce((prev, current) => prev + (current.text !== '‣' ? current.text : ''), '') ?? ''
    )
  } else {
    return text
  }
}
