import { html } from './html+preact.js'

export default function Filters ({ onChangePeople, onChangeMortality }) {
  return html`
    <form>
      <label aria-label="Activate People Stay At Home filter" title="People stay at home">
        <input id="stay-home" type="checkbox">🏠 Stay At Home
      </label>
      <label aria-label="Change mortality provoked by virus" title="Mortality provoked by virus">
        <input id="mortality" type="range" min="0" max="100" step="1" value="0">☠️ Mortality
      </label>
    </form>
  `
}
