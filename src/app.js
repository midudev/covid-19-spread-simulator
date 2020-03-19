import { html, render, useState } from './html+preact.js'
import t, { initTranslations } from './t.js'

import Share from './Share.js'
import Counter from './Counter.js'

function App () {
  const [counters, setCounters] = useState({ healthy: 0, recovered: 0, sick: 0 })

  return html`
    <h1>${t`TITLE`} 🦠</h1>
    <${Counter} ...${counters} />
    <${Share} />
  `
}

initTranslations().then(() => {
  render(html`<${App} />`, document.getElementById('app'))
})
