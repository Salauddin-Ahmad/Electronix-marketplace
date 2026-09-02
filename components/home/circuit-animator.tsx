'use client'

import dynamic from 'next/dynamic'

const LumenCircuitExperience = dynamic(
  () =>
    import('./lumen-circuit/experience').then((module) => module.LumenCircuitExperience),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-full w-full bg-[#080c13]"
        role="status"
        aria-label="Preparing interactive electrical circuit"
      />
    ),
  },
)

export function CircuitAnimator() {
  return <LumenCircuitExperience />
}
