'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useState, type MouseEvent, type ReactNode } from 'react'

const MotionLink = motion.create(Link)

const sparks = [
  { x: '18%', y: '28%', dx: -15, dy: -13, rotate: -24 },
  { x: '34%', y: '70%', dx: -9, dy: 14, rotate: 18 },
  { x: '51%', y: '22%', dx: 2, dy: -17, rotate: 4 },
  { x: '67%', y: '72%', dx: 10, dy: 14, rotate: -16 },
  { x: '82%', y: '32%', dx: 16, dy: -11, rotate: 28 },
] as const

export type ElectricButtonProps = {
  children: ReactNode
  className?: string
  disabled?: boolean
  href?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  'aria-label'?: string
}

export function ElectricButton({
  children,
  className = '',
  disabled = false,
  href,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
}: ElectricButtonProps) {
  const reduceMotion = Boolean(useReducedMotion())
  const [scanRun, setScanRun] = useState(0)
  const [burst, setBurst] = useState(0)
  const rootClassName = `group/electric relative isolate ${className}`

  const shine = () => {
    if (!disabled && !reduceMotion) setScanRun((value) => value + 1)
  }
  const spark = () => {
    if (disabled || reduceMotion) return
    shine()
    setBurst((value) => value + 1)
  }

  const content = (
    <>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]" aria-hidden="true">
        {!reduceMotion && scanRun > 0 && (
          <motion.span
            key={`scan-${scanRun}`}
            className="absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-120%', opacity: 0 }}
            animate={{ x: '520%', opacity: [0, 0.72, 0] }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
          />
        )}
      </span>

      {!reduceMotion && burst > 0 && sparks.map((particle, index) => (
        <motion.span
          key={`${burst}-${index}`}
          data-electric-spark="true"
          className="pointer-events-none absolute z-20 h-[2px] w-2 origin-left bg-[#F6C90E] shadow-[0_0_5px_rgba(246,201,14,0.8)]"
          style={{ left: particle.x, top: particle.y }}
          initial={{ x: 0, y: 0, rotate: particle.rotate, scaleX: 0.35, opacity: 0 }}
          animate={{ x: particle.dx, y: particle.dy, scaleX: [0.35, 1, 0.2], opacity: [0, 0.95, 0] }}
          transition={{ duration: 0.38, delay: index * 0.018, ease: 'easeOut' }}
          aria-hidden="true"
        />
      ))}

      <span className="relative z-10 inline-flex items-center gap-[inherit]">{children}</span>
    </>
  )

  if (href) {
    return (
      <MotionLink
        href={href}
        data-electric-button="true"
        className={rootClassName}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        onPointerEnter={shine}
        onFocus={(event) => {
          if (event.currentTarget.matches(':focus-visible')) shine()
        }}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault()
            return
          }
          spark()
          onClick?.(event)
        }}
        whileHover={reduceMotion || disabled ? undefined : { scale: 1.01, y: -1 }}
        whileTap={reduceMotion || disabled ? undefined : { scale: 0.98 }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
      >
        {content}
      </MotionLink>
    )
  }

  return (
    <motion.button
      type={type}
      data-electric-button="true"
      className={rootClassName}
      disabled={disabled}
      aria-label={ariaLabel}
      onPointerEnter={shine}
      onFocus={(event) => {
        if (event.currentTarget.matches(':focus-visible')) shine()
      }}
      onClick={(event) => {
        spark()
        onClick?.(event)
      }}
      whileHover={reduceMotion || disabled ? undefined : { scale: 1.01, y: -1 }}
      whileTap={reduceMotion || disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
    >
      {content}
    </motion.button>
  )
}
