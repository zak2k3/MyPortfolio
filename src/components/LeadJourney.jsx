import { useEffect, useRef, useState } from 'react'

// "The journey of a lead" — a scroll-scrubbed illustrated pipeline drawn in
// the page margins, behind the content (z-index: -1, pointer-events: none).
//
// One SVG spans the whole document. A dotted path runs from the hero to the
// contact section; scroll position drives every animation deterministically
// (a given scrollY always produces the same frame, so scrolling up rewinds):
//   1. an envelope travels the path from the hero (the inquiry arrives)
//   2. a node cluster activates in the left margin (the AI processes it)
//   3. a chat bubble draws, types, and fills beside Projects (reply drafted),
//      with a status pill flipping "new" → "replied"
//   4. a paper plane rides the diagonal past Stack (reply sent), check-marks
//      popping in behind it
//   5. the plane lands at a final node by Contact — a small particle burst
//
// All per-scroll updates go straight to the DOM via refs inside one
// requestAnimationFrame tick — no React state changes while scrolling.
// prefers-reduced-motion: no listeners; everything renders in its final,
// fully-drawn state.
// On narrow viewports the scene is reduced to just the path + envelope.

const clamp01 = (v) => (v < 0 ? 0 : v > 1 ? 1 : v)
const easeOut = (p) => 1 - (1 - p) ** 3
const lerp = (a, b, t) => a + (b - a) * t

const COLORS = {
  teal: '#0f766e',
  deep: '#134e4a',
  emerald: '#10b981',
  mint: '#99f6e4',
  sage: '#8fb3a3',
  sageLine: '#cfe0d7',
  amber: '#f59e0b', // secondary accent, used only for the "new" status moment
}

// Node-cluster satellites, relative to the cluster centre.
const SATS = [
  { x: 34, y: -32 },
  { x: 52, y: 6 },
  { x: 26, y: 44 },
]

// Burst particles: angle (rad), distance, shape, colour.
const PARTICLES = [
  { a: -1.9, d: 34, shape: 'circle', color: COLORS.emerald },
  { a: -1.1, d: 40, shape: 'tri', color: COLORS.teal },
  { a: -0.3, d: 30, shape: 'circle', color: COLORS.mint },
  { a: 0.7, d: 36, shape: 'tri', color: COLORS.sage },
  { a: 2.2, d: 32, shape: 'circle', color: COLORS.teal },
  { a: 2.9, d: 38, shape: 'tri', color: COLORS.emerald },
]

const CHECK_FRACTIONS = [0.3, 0.55, 0.8]

// Catmull-Rom → cubic bezier, for a smooth path through the anchor points.
function smoothPath(pts) {
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] || p2
    const c1x = p1.x + (p2.x - p0.x) / 6
    const c1y = p1.y + (p2.y - p0.y) / 6
    const c2x = p2.x - (p3.x - p1.x) / 6
    const c2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`
  }
  return d
}

// Normalized length fraction of the path point closest to a target.
function tAtPoint(path, total, target) {
  let best = 0
  let bestDist = Infinity
  const steps = 300
  for (let i = 0; i <= steps; i++) {
    const p = path.getPointAtLength((i / steps) * total)
    const dist = (p.x - target.x) ** 2 + (p.y - target.y) ** 2
    if (dist < bestDist) {
      bestDist = dist
      best = i / steps
    }
  }
  return best
}

function buildGeometry() {
  const ids = ['top', 'about', 'projects', 'stack', 'experience', 'education', 'contact']
  const secs = {}
  for (const id of ids) {
    const el = document.getElementById(id)
    if (!el) return null
    const r = el.getBoundingClientRect()
    secs[id] = { top: r.top + window.scrollY, bottom: r.bottom + window.scrollY }
  }

  const vw = document.documentElement.clientWidth
  const vh = window.innerHeight
  const docH = document.documentElement.scrollHeight
  const contentW = Math.min(1040, vw - 48)
  const margin = (vw - contentW) / 2
  // Not enough margin for the side scenes → path + envelope only.
  const narrow = margin < 90
  const xL = narrow ? 22 : margin / 2
  const xR = vw - xL
  const xC = vw / 2

  const cluster = { x: xL, y: secs.projects.top + 90 }
  const bubble = { x: xR, y: secs.projects.top + (secs.projects.bottom - secs.projects.top) * 0.45 }
  const planeStart = { x: xR, y: secs.stack.bottom - 50 }
  const planeEnd = { x: xL, y: secs.experience.top + 110 }
  const final = { x: xL, y: secs.contact.top + 90 }

  const points = [
    { x: xR, y: secs.top.top + (secs.top.bottom - secs.top.top) * 0.55 },
    { x: xR - 26, y: secs.about.top + 60 },
    { x: xR, y: secs.about.bottom - 80 },
    { x: xC, y: (secs.about.bottom + secs.projects.top) / 2 + 6 },
    cluster,
    { x: xL + 14, y: secs.projects.bottom - 120 },
    { x: xC, y: (secs.projects.bottom + secs.stack.top) / 2 + 6 },
    { x: xR - 10, y: secs.stack.top + 90 },
    planeStart,
    planeEnd,
    { x: xL + 16, y: secs.experience.bottom - 60 },
    { x: xL, y: secs.education.bottom - 40 },
    final,
  ]

  const checks = CHECK_FRACTIONS.map((f) => ({
    x: lerp(planeStart.x, planeEnd.x, f),
    y: lerp(planeStart.y, planeEnd.y, f) - 16,
  }))

  return {
    vw,
    vh,
    docH,
    narrow,
    d: smoothPath(points),
    start: points[0],
    end: final,
    cluster,
    bubble,
    planeStart,
    planeEnd,
    final,
    checks,
  }
}

export default function LeadJourney() {
  const [geom, setGeom] = useState(null)
  const els = useRef({})

  // Measure the page and (re)build the scene geometry.
  useEffect(() => {
    let timer
    const rebuild = () => setGeom(buildGeometry())
    const debounced = () => {
      clearTimeout(timer)
      timer = setTimeout(rebuild, 150)
    }
    rebuild()
    window.addEventListener('resize', debounced)
    window.addEventListener('load', debounced)
    const observer = new ResizeObserver(debounced)
    observer.observe(document.body)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', debounced)
      window.removeEventListener('load', debounced)
      observer.disconnect()
    }
  }, [])

  // Drive the whole scene from scrollY.
  useEffect(() => {
    const g = geom
    const e = els.current
    if (!g || !e.main) return

    const L = e.main.getTotalLength()
    const tCluster = g.narrow ? 1 : tAtPoint(e.main, L, g.cluster)
    const tPlane = tAtPoint(e.main, L, g.planeStart)
    const tPlaneEnd = tAtPoint(e.main, L, g.planeEnd)
    const tChecks = CHECK_FRACTIONS.map((f) => lerp(tPlane, tPlaneEnd, f))
    const connLens = SATS.map((s) => Math.hypot(s.x, s.y))

    e.mask.setAttribute('stroke-dasharray', `${L}`)
    if (e.bubbleOutline) {
      var bubLen = e.bubbleOutline.getTotalLength()
      e.bubbleOutline.setAttribute('stroke-dasharray', `${bubLen}`)
    }
    SATS.forEach((s, i) => {
      if (e[`lit${i}`]) e[`lit${i}`].setAttribute('stroke-dasharray', `${connLens[i]}`)
    })

    const render = (y) => {
      const focus = y + g.vh * 0.55
      const overall = clamp01((focus - g.start.y) / (g.end.y - g.start.y))

      // 1. Path draw-in (slightly ahead of the envelope) + envelope travel.
      e.mask.setAttribute('stroke-dashoffset', `${L * (1 - Math.min(1, overall + 0.04))}`)
      const tEnv = Math.min(overall, tCluster)
      const envPt = e.main.getPointAtLength(tEnv * L)
      e.env.setAttribute('transform', `translate(${envPt.x.toFixed(1)} ${envPt.y.toFixed(1)})`)
      e.env.setAttribute(
        'opacity',
        overall < tCluster ? '1' : `${clamp01(1 - (overall - tCluster) / 0.02).toFixed(3)}`,
      )

      const burst = clamp01((focus - g.final.y) / (g.vh * 0.18))

      if (!g.narrow) {
        // 2. Node cluster activates: lines light up, pulses travel, nodes fill.
        const pc = clamp01((focus - (g.cluster.y - g.vh * 0.1)) / (g.vh * 0.5))
        e.centerFill.setAttribute('transform', `scale(${clamp01(pc * 4).toFixed(3)})`)
        SATS.forEach((s, i) => {
          const sub = clamp01(pc * 3 - i)
          e[`lit${i}`].setAttribute('stroke-dashoffset', `${(connLens[i] * (1 - sub)).toFixed(1)}`)
          e[`pulse${i}`].setAttribute(
            'transform',
            `translate(${(s.x * sub).toFixed(1)} ${(s.y * sub).toFixed(1)})`,
          )
          e[`pulse${i}`].setAttribute('opacity', `${(sub * (1 - sub) * 4).toFixed(3)}`)
          e[`nodeFill${i}`].setAttribute('transform', `scale(${clamp01((sub - 0.75) * 4).toFixed(3)})`)
        })

        // 3. Chat bubble: outline draws, dots type, fill floods, pill flips.
        const pb = clamp01((focus - (g.bubble.y - g.vh * 0.4)) / (g.vh * 0.55))
        e.bubbleOutline.setAttribute('stroke-dashoffset', `${(bubLen * (1 - clamp01(pb / 0.4))).toFixed(1)}`)
        const fillP = clamp01((pb - 0.66) / 0.14)
        e.bubbleFill.setAttribute('opacity', `${(fillP * 0.92).toFixed(3)}`)
        for (let i = 0; i < 3; i++) {
          const dotVis = clamp01((pb - (0.42 + i * 0.07)) / 0.06)
          e[`dotDark${i}`].setAttribute('opacity', `${(dotVis * (1 - fillP)).toFixed(3)}`)
          e[`dotLight${i}`].setAttribute('opacity', `${(dotVis * fillP).toFixed(3)}`)
        }
        const flip = clamp01((pb - 0.8) / 0.1)
        e.pillNew.setAttribute('opacity', `${(1 - flip).toFixed(3)}`)
        e.pillDone.setAttribute('opacity', `${flip.toFixed(3)}`)

        // 4. Paper plane rides the path from the Stack diagonal to the end;
        //    check-marks pop in behind it.
        tChecks.forEach((t, i) => {
          const s = easeOut(clamp01((overall - t) / 0.015))
          e[`check${i}`].setAttribute(
            'transform',
            `translate(${g.checks[i].x.toFixed(1)} ${g.checks[i].y.toFixed(1)}) scale(${s.toFixed(3)})`,
          )
          e[`check${i}`].setAttribute('opacity', `${s.toFixed(3)}`)
        })
        const tp = Math.min(Math.max(overall, tPlane), 1)
        const planePt = e.main.getPointAtLength(tp * L)
        const aheadPt = e.main.getPointAtLength(Math.min(tp * L + 2, L))
        const angle = (Math.atan2(aheadPt.y - planePt.y, aheadPt.x - planePt.x) * 180) / Math.PI
        e.plane.setAttribute(
          'transform',
          `translate(${planePt.x.toFixed(1)} ${planePt.y.toFixed(1)}) rotate(${angle.toFixed(1)})`,
        )
        e.plane.setAttribute(
          'opacity',
          `${(clamp01((overall - tPlane) / 0.01) * (1 - burst)).toFixed(3)}`,
        )

        // 5. Landing: final node fills, particles pop outward and settle.
        e.finalFill.setAttribute('transform', `scale(${easeOut(clamp01(burst * 2)).toFixed(3)})`)
        const spread = easeOut(burst)
        PARTICLES.forEach((p, i) => {
          e[`part${i}`].setAttribute(
            'transform',
            `translate(${(Math.cos(p.a) * p.d * spread).toFixed(1)} ${(Math.sin(p.a) * p.d * spread).toFixed(1)})`,
          )
          e[`part${i}`].setAttribute(
            'opacity',
            `${(clamp01(burst * 6) * (0.95 - 0.35 * burst)).toFixed(3)}`,
          )
        })
      }
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      render(g.docH) // static, fully-drawn end state
      return
    }

    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(() => {
          ticking = false
          render(window.scrollY)
        })
      }
    }
    render(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [geom])

  if (!geom) return null

  const ref = (key) => (el) => {
    els.current[key] = el
  }
  const stroke = { fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

  return (
    <div
      className="journey"
      style={{ height: geom.docH }}
      aria-hidden="true"
    >
      <svg
        width={geom.vw}
        height={geom.docH}
        viewBox={`0 0 ${geom.vw} ${geom.docH}`}
        fill="none"
      >
        <defs>
          <mask
            id="lj-mask"
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width={geom.vw}
            height={geom.docH}
          >
            <path
              ref={ref('mask')}
              d={geom.d}
              stroke="#fff"
              strokeWidth="10"
              fill="none"
              strokeDasharray="0 9999999"
            />
          </mask>
        </defs>

        {/* The journey path: dotted, revealed progressively via the mask. */}
        <path ref={ref('main')} d={geom.d} className="lj-path" mask="url(#lj-mask)" />

        {/* 1. The inquiry: envelope travelling the path. */}
        <g ref={ref('env')} opacity="0">
          <rect x="-12" y="-9" width="24" height="18" rx="3" fill="#fff" stroke={COLORS.teal} {...stroke} />
          <path d="M-12 -7 L0 4 L12 -7" stroke={COLORS.teal} {...stroke} />
        </g>

        {!geom.narrow && (
          <>
            {/* 2. Node cluster: the AI processes the inquiry. */}
            <g transform={`translate(${geom.cluster.x} ${geom.cluster.y})`}>
              {SATS.map((s, i) => (
                <line key={`base${i}`} x1="0" y1="0" x2={s.x} y2={s.y} stroke={COLORS.sageLine} strokeWidth="1.5" />
              ))}
              {SATS.map((s, i) => (
                <line
                  key={`lit${i}`}
                  ref={ref(`lit${i}`)}
                  x1="0"
                  y1="0"
                  x2={s.x}
                  y2={s.y}
                  stroke={COLORS.emerald}
                  strokeWidth="2"
                  strokeDasharray="0 9999"
                />
              ))}
              {SATS.map((s, i) => (
                <circle key={`pulse${i}`} ref={ref(`pulse${i}`)} r="2.5" fill={COLORS.emerald} opacity="0" />
              ))}
              <circle r="8" fill="#fff" stroke={COLORS.teal} {...stroke} />
              <circle ref={ref('centerFill')} r="8" fill={COLORS.teal} transform="scale(0)" />
              {SATS.map((s, i) => (
                <g key={`node${i}`} transform={`translate(${s.x} ${s.y})`}>
                  <circle r="6.5" fill="#fff" stroke={COLORS.sage} strokeWidth="1.5" />
                  <circle ref={ref(`nodeFill${i}`)} r="6.5" fill={COLORS.emerald} transform="scale(0)" />
                </g>
              ))}
            </g>

            {/* 3. The reply is drafted: chat bubble + status pill. */}
            <g transform={`translate(${geom.bubble.x - 32} ${geom.bubble.y - 26})`}>
              <path
                ref={ref('bubbleFill')}
                d="M10 0 H54 Q64 0 64 10 V32 Q64 42 54 42 H20 L10 52 L13 42 H10 Q0 42 0 32 V10 Q0 0 10 0 Z"
                fill={COLORS.teal}
                opacity="0"
              />
              <path
                ref={ref('bubbleOutline')}
                d="M10 0 H54 Q64 0 64 10 V32 Q64 42 54 42 H20 L10 52 L13 42 H10 Q0 42 0 32 V10 Q0 0 10 0 Z"
                stroke={COLORS.teal}
                strokeDasharray="0 9999"
                {...stroke}
              />
              {[0, 1, 2].map((i) => (
                <circle key={`dd${i}`} ref={ref(`dotDark${i}`)} cx={22 + i * 10} cy="21" r="2.6" fill={COLORS.sage} opacity="0" />
              ))}
              {[0, 1, 2].map((i) => (
                <circle key={`dl${i}`} ref={ref(`dotLight${i}`)} cx={22 + i * 10} cy="21" r="2.6" fill="#fff" opacity="0" />
              ))}
            </g>
            <g transform={`translate(${geom.bubble.x - 29} ${geom.bubble.y + 40})`}>
              <g ref={ref('pillNew')}>
                <rect width="58" height="20" rx="10" fill="#fff" stroke={COLORS.sageLine} strokeWidth="1.5" />
                <circle cx="12" cy="10" r="3" fill={COLORS.amber} />
                <text x="21" y="13.5" className="lj-text" fill="#6f6a64">
                  new
                </text>
              </g>
              <g ref={ref('pillDone')} opacity="0">
                <rect width="58" height="20" rx="10" fill={COLORS.teal} />
                <circle cx="12" cy="10" r="3" fill={COLORS.mint} />
                <text x="19" y="13.5" className="lj-text" fill="#fff">
                  replied
                </text>
              </g>
            </g>

            {/* 4. The reply is sent: check-marks + paper plane. */}
            {geom.checks.map((c, i) => (
              <g key={`check${i}`} ref={ref(`check${i}`)} opacity="0">
                <path d="M-4 0 L-1 3 L5 -3" stroke={COLORS.emerald} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ))}
            <g ref={ref('plane')} opacity="0">
              <path d="M15 0 L-11 -8 L-5 0 L-11 8 Z" fill="#fff" stroke={COLORS.teal} {...stroke} />
              <path d="M-5 0 L15 0" stroke={COLORS.teal} strokeWidth="1.5" />
            </g>

            {/* 5. Arrival: final node + particle burst. */}
            <g transform={`translate(${geom.final.x} ${geom.final.y})`}>
              {PARTICLES.map((p, i) => (
                <g key={`part${i}`} ref={ref(`part${i}`)} opacity="0">
                  {p.shape === 'circle' ? (
                    <circle r="3" fill={p.color} />
                  ) : (
                    <path d="M0 -4 L4 3 L-4 3 Z" fill={p.color} />
                  )}
                </g>
              ))}
              <circle r="9" fill="#fff" stroke={COLORS.deep} {...stroke} />
              <circle ref={ref('finalFill')} r="5" fill={COLORS.teal} transform="scale(0)" />
            </g>
          </>
        )}
      </svg>
    </div>
  )
}
