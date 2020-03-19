let translations

const AVAILABLE_TRANSLATIONS = ['es', 'en']
const DEFAULT_TRANSLATION = 'en'

function translate (key, ...values) {
  return key.replace(/{(\d)}/g, (_, index) => values[index])
}

export function initTranslations () {
  const { language = 'en' } = navigator
  const languageToImport = AVAILABLE_TRANSLATIONS.find(l => l === language) || DEFAULT_TRANSLATION

  return import(`./translations/${languageToImport}.js`)
    .then(({ default: importedTranslations }) => {
      translations = importedTranslations
    })
}

export default function t (strings, ...values) {
  const [key] = strings
  const base = translations[key.trim()]
  if (base) return translate(base, ...values)

  console.warn(`translation missing for key: ${key}`)
  return key
}
