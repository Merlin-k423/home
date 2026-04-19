const STYLES = {
  title:
    'display:inline-block;padding:4px 10px;border-radius:999px 0 0 999px;background:#0ea5e9;color:#fff;font-weight:700;line-height:1.6;',
  text: 'display:inline-block;padding:4px 10px;border-radius:0 999px 999px 0;background:#111827;color:#e5e7eb;line-height:1.6;'
}

const normalizeRows = (rows) => {
  if (!Array.isArray(rows)) return []
  return rows
    .map((item) => {
      if (!Array.isArray(item) || item.length < 2) return null
      return [String(item[0]), String(item[1])]
    })
    .filter(Boolean)
}

const printBanner = (rows) => {
  rows.forEach(([title, text]) => {
    console.log(`%c${title}%c ${text}`, STYLES.title, STYLES.text)
  })
}

export const consoleText = (rows = [], mode = 'banner') => {
  const normalized = normalizeRows(rows)
  if (!normalized.length) return

  if (mode === 'table') {
    console.table(normalized.map(([title, text]) => ({ title, text })))
    return
  }

  printBanner(normalized)
}
