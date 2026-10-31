import { useState } from 'react'

// Shows the product photo if there is one, otherwise the emoji placeholder.
// If the photo file is missing or broken, it quietly falls back to the emoji.
export default function ProductImage({ product, out = false }) {
  const [failed, setFailed] = useState(false)
  const showPhoto = product.image && !failed

  return (
    <div
      className="flex h-full w-full items-center justify-center text-6xl"
      style={{ background: 'linear-gradient(135deg, #F5EEDD, #84B3CE)' }}
    >
      {showPhoto ? (
        <img
          src={product.image}
          alt={product.name.en}
          loading="lazy"
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${out ? 'opacity-50 grayscale' : ''}`}
        />
      ) : (
        <span aria-hidden="true" className={out ? 'opacity-40 grayscale' : ''}>
          {product.emoji}
        </span>
      )}
    </div>
  )
}
