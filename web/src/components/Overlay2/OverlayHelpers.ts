interface Style {
  [key: string]: string
}
const cache = new WeakMap()

export function getTranslateY(element: HTMLElement): number | null {
  const style = window.getComputedStyle(element)
  const transform =
    // @ts-ignore
    style.transform || style.webkitTransform || style.mozTransform
  let mat = transform.match(/^matrix3d\((.+)\)$/)
  if (mat) return parseFloat(mat[1].split(', ')[13])
  mat = transform.match(/^matrix\((.+)\)$/)
  return mat ? parseFloat(mat[1].split(', ')[5]) : null
}

export function set(
  el?: Element | HTMLElement | null,
  styles?: Style,
  ignoreCache = false
) {
  if (!el || !(el instanceof HTMLElement) || !styles) return
  const originalStyles: Style = {}

  Object.entries(styles).forEach(([key, value]: [string, string]) => {
    if (key.startsWith('--')) {
      el.style.setProperty(key, value)
      return
    }

    originalStyles[key] = (el.style as any)[key]
    ;(el.style as any)[key] = value
  })

  if (ignoreCache) return

  cache.set(el, originalStyles)
}

export function dampenValue(v: number) {
  return 8 * (Math.log(v + 1) - 2)
}
