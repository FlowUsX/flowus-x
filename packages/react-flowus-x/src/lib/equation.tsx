import React from 'react'

import Katex from '@matejmazur/react-katex'
import { Block } from '@flowusx/flowus-types'
import { useFlowUsContext } from '../context'
import { getBlockTitle } from '@flowusx/flowus-utils'
import cs from 'classnames'
import 'katex/dist/katex.min.css'

const katexSettings = {
  throwOnError: true,
  strict: false,
}

export const Equation: React.FC<{
  block: Block
  math?: string
  inline?: boolean
  className?: string
}> = ({ block, math, inline = false, className, ...rest }) => {
  console.log('math', math)
  const { recordMap } = useFlowUsContext()

  math = math || getBlockTitle(block, recordMap)
  if (!math) return null

  return (
    <span
      role="button"
      tabIndex={0}
      className={cs(
        'flowus-equation',
        inline ? 'flowus-equation-inline' : 'flowus-equation-block',
        className,
      )}
    >
      <Katex math={math} settings={katexSettings} {...rest} />
    </span>
  )
}
