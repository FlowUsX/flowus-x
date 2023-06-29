import React from 'react'
import { useFlowUsContext } from '../context'
import { Block } from '@flowusx/flowus-types'

/**
 * Progressive, lazy images modeled after Medium's LQIP technique.
 */
export const LazyImage: React.FC<{
  src?: string
  alt?: string
  block: Block
  className?: string
  style?: React.CSSProperties
  height?: number
  zoomable?: boolean
  priority?: boolean
}> = ({
  src: srcUrl,
  alt: altText,
  block,
  className,
  style,
  zoomable = false,
  priority = false,
  height,
  ...rest
}) => {
  const { zoom, components } = useFlowUsContext()
  const src = srcUrl || block.data.fullLink
  const alt = altText || block.title
  const { width: previewWidth, height: previewHeight } = block.data.format

  const zoomRef = React.useRef(zoom ? zoom.clone() : null)

  const onLoad = React.useCallback(
    (e: any) => {
      if (zoomable && (e.target.src || e.target.srcset)) {
        if (zoomRef.current) {
          ;(zoomRef.current as any).attach(e.target)
        }
      }
    },
    [zoomRef, zoomable],
  )

  const attachZoom = React.useCallback(
    (image: any) => {
      if (zoomRef.current && image) {
        ;(zoomRef.current as any).attach(image)
      }
    },
    [zoomRef],
  )

  const attachZoomRef = React.useMemo(
    () => (zoomable ? attachZoom : undefined),
    [zoomable, attachZoom],
  )

  if (components.Image) {
    return (
      <components.Image
        src={src}
        alt={alt}
        style={style}
        className={className}
        width={previewWidth}
        height={previewHeight}
        placeholder="blur"
        priority={priority}
        onLoad={onLoad}
      />
    )
  }

  // Default image element
  return (
    <img
      className={className}
      style={style}
      src={src}
      alt={alt}
      ref={attachZoomRef}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  )
}
