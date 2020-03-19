import { html } from './html+preact.js'
import t from './t.js'

export default function Counter ({ healthy, recovered, sick, dead }) {
  const showDead = typeof dead !== 'undefined'

  return html`<div id="counter">
    <div style="color: var(--c-healthy)">${t`HEALTHY`}<br /><span>${healthy}</span></div>
    <div style="color: var(--c-recovered)">${t`RECOVERED`}<br /><span>${recovered}</span></div>
    <div style="color: var(--c-sick)">${t`SICK`}<br /><span>${sick}</span></div>
    ${showDead &&
      html`<div style="color: var(--c-dead)">${t`DEAD`}<br /><span>${dead}</span></div>`}
  </div>`
}
