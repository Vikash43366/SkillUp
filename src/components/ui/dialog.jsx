import React from "react"
import { createPortal } from "react-dom"

export function Dialog({ isOpen, onClose, children, size = "default" }) {
  if (!isOpen) return null

  const sizeClasses = {
    small: "max-w-sm max-h-[80vh]",
    default: "max-w-4xl h-full max-h-[95vh]",
    large: "max-w-6xl h-full max-h-[95vh]"
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative z-10 w-full mx-auto flex flex-col ${sizeClasses[size]}`}>
        {children}
      </div>
    </div>,
    document.body
  )
}

export function DialogContent({ children, className = "" }) {
  return (
    <div className={`bg-background border border-border rounded-lg shadow-lg flex-1 flex flex-col overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

export function DialogFooter({ children, className = "" }) {
  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-2 sm:space-y-0 sm:space-x-3 p-4 sm:p-6 border-t border-border bg-background rounded-b-lg shrink-0 ${className}`}>
      {children}
    </div>
  )
}
