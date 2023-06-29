import * as React from 'react'

import CheckIcon from '../../icons/check'

export const Checkbox: React.FC<{
  isChecked: boolean
  blockId?: string
}> = ({ isChecked }) => {
  let content = null

  if (isChecked) {
    content = (
      <div className="flowus-property-checkbox-checked">
        <CheckIcon />
        123
      </div>
    )
  } else {
    content = <div className="flowus-property-checkbox-unchecked" />
  }

  return <span className="flowus-property flowus-property-checkbox">{content}</span>
}
