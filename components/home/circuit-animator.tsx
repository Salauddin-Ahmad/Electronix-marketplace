'use client'

const ORIGINAL_SCENE_URL = '/switch-16xnx.html'

export function CircuitAnimator() {
  return (
    <iframe
      title="Interactive electrical circuit flow"
      src={ORIGINAL_SCENE_URL}
      className="h-full w-full border-0"
      loading="eager"
      allow="webgl"
    />
  )
}
