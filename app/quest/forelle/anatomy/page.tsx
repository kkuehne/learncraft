'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AnatomyRedirect() {
  const router = useRouter()
  
  useEffect(() => {
    router.replace('/quest/forelle/anatomy-lab')
  }, [router])
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-cyan-900 to-blue-950 flex items-center justify-center">
      <div className="text-white text-center">
        <p>Weiterleitung zum Anatomie-Lab...⏳</p>
      </div>
    </div>
  )
}
