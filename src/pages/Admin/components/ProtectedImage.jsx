import { useEffect, useState } from 'react'
import { api } from '../../../lib/api'

function ProtectedImage({ imageKey, alt = '' }) {
  const [src, setSrc] = useState('')

  useEffect(() => {
    let active = true
    let objectUrl = ''
    if (!imageKey) return undefined

    api.getBlob(`/api/admin/images/${imageKey.split('/').map(encodeURIComponent).join('/')}`)
      .then((blob) => {
        if (!active) return
        objectUrl = URL.createObjectURL(blob)
        setSrc(objectUrl)
      })
      .catch(() => { if (active) setSrc('') })

    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [imageKey])

  return src ? <img src={src} alt={alt} /> : null
}

export default ProtectedImage