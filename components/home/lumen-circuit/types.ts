import type { MutableRefObject } from 'react'

export type CircuitStage = 'off' | 'arming' | 'on' | 'disarming'

export type CircuitTimeline = {
  lastStage: CircuitStage
  stage: CircuitStage
  startedAt: number
  power: number
  leadProgress: number
  switchClosed: number
  bulb: number
  resistor: number
  flow: number
}

export type CircuitTimelineRef = MutableRefObject<CircuitTimeline>

export type CircuitPartProps = {
  timeline: CircuitTimelineRef
  reducedMotion: boolean
}

