import { useState } from 'react'
import { ImageOff } from 'lucide-react'

/**
 * Image with reserved aspect ratio, lazy-loading, fade-in and a
 * readable gradient fallback if the file fails to load.
 * `width`/`height` must be provided so the layout never shifts.
 */
export default function LazyImage({
  src,
  alt = '',
  width,
  height,
  eager = false,
  className = '',
  imgClassName = '',
  rounded = false,
}) {
  const [state, setState] = useState('loading') // loading | loaded | error

  return (
    <div
      className={`lazy-frame ${state === 'loaded' ? 'is-loaded' : ''} ${
        state === 'error' ? 'has-error' : ''
      } ${rounded ? 'is-rounded' : ''} ${className}`}
      style={{ aspectRatio: width && height ? `${width} / ${height}` : undefined }}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        draggable="false"
        className={imgClassName}
        onLoad={() => setState('loaded')}
        onError={() => setState('error')}
      />
      {state === 'error' && (
        <div className="lazy-fallback" role="img" aria-label={alt}>
          <ImageOff aria-hidden="true" size={22} strokeWidth={1.5} />
          <span>{alt}</span>
        </div>
      )}
    </div>
  )
}
