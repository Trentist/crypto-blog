import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface EnhancedImageProps {
  value: {
    asset: any
    alt?: string
    caption?: string
    hotspot?: {
      x: number
      y: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
}

export default function EnhancedImage({ value }: EnhancedImageProps) {
  const imageUrl = urlFor(value)
    .width(800)
    .height(500)
    .fit('max')
    .auto('format')
    .url()

  return (
    <figure className="my-8">
      <Image
        src={imageUrl}
        alt={value.alt || 'Post image'}
        width={800}
        height={500}
        className="w-full h-auto object-cover rounded-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 800px, 800px"
      />
      
      {/* Alt Text */}
      {value.alt && (
        <figcaption className="mt-3 text-sm text-slate-600 dark:text-gray-400 italic text-center">
          {value.alt}
        </figcaption>
      )}
    </figure>
  )
}
