import React, { useEffect } from 'react'
import { CheckCircle, X, AlertCircle } from 'lucide-react'
import confetti from 'canvas-confetti'

interface StatusModalProps {
  isOpen: boolean
  type: 'success' | 'error'
  title: string
  message: string
  onClose: () => void
}

export const StatusModal: React.FC<StatusModalProps> = ({
  isOpen,
  type,
  title,
  message,
  onClose
}) => {
  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min
  }

  useEffect(() => {
    if (isOpen && type === 'success') {
      // Trigger confetti effect
      const duration = 3000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        
        // Since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        })
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        })
      }, 250)

      // Auto close after 2 seconds
      const autoCloseTimer = setTimeout(() => {
        onClose()
      }, 2000)

      return () => {
        clearInterval(interval)
        clearTimeout(autoCloseTimer)
      }
    }
  }, [isOpen, type, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              {type === 'success' ? (
                <CheckCircle className="h-8 w-8 text-green-600" />
              ) : (
                <AlertCircle className="h-8 w-8 text-red-600" />
              )}
              <h3 className={`text-lg font-semibold ${
                type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <p className="text-gray-600 mb-6">
            {message}
          </p>
          
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                type === 'success'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
