import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import copyToClipboard from 'clipboard-copy'
import { highlightElement } from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-clike.min.js'
import 'prismjs/components/prism-css-extras.min.js'
import 'prismjs/components/prism-css.min.js'
import 'prismjs/components/prism-javascript.min.js'
import 'prismjs/components/prism-js-extras.min.js'
import 'prismjs/components/prism-json.min.js'
import 'prismjs/components/prism-jsx.min.js'
import 'prismjs/components/prism-tsx.min.js'
import 'prismjs/components/prism-typescript.min.js'

import { Text } from '../components/text'
import cs from 'classnames'
import { useFlowUsContext } from '../context'
import { getBlockTitle } from '@flowusx/flowus-utils'
import { Block } from '@flowusx/flowus-types'

export const Code: React.FC<{
  block: Block
  defaultLanguage?: string
  className?: string
}> = ({ block, defaultLanguage = 'typescript', className }) => {
  const [isCopied, setIsCopied] = useState(false)
  const copyTimeout = useRef<number | null>()
  const { recordMap } = useFlowUsContext()
  const content = getBlockTitle(block, recordMap)
  const language = (block.data.format.language || defaultLanguage).toLowerCase()
  const caption = block.data.description

  const codeRef = useRef<any>()
  useEffect(() => {
    if (codeRef.current) {
      try {
        highlightElement(codeRef.current)
      } catch (err) {
        console.warn('prismjs highlight error', err)
      }
    }
  }, [codeRef])

  const onClickCopyToClipboard = useCallback(() => {
    void copyToClipboard(content)
    setIsCopied(true)

    if (copyTimeout.current) {
      clearTimeout(copyTimeout.current)
      copyTimeout.current = null
    }

    copyTimeout.current = setTimeout(() => {
      setIsCopied(false)
    }, 1000) as unknown as number
  }, [content, copyTimeout])

  const copyButton = useMemo(() => {
    return (
      <div className="flowus-code-copy-button" onClick={onClickCopyToClipboard}>
        <span className="flowus-code-language">{block.data.format.language}</span>
        <span className="flowus-code-copy-text">{isCopied ? '复制成功' : '复制代码'}</span>
      </div>
    )
  }, [isCopied])

  return (
    <>
      <pre className={cs('flowus-code', className)}>
        <div className="flowus-code-copy">{copyButton}</div>

        <code className={`language-${language}`} ref={codeRef}>
          {content}
        </code>
      </pre>

      {caption?.length && (
        <figcaption className="flowus-asset-caption">
          <Text value={block.data.description} block={block} />
        </figcaption>
      )}
    </>
  )
}
