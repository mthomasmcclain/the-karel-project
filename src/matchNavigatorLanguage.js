import Agent from '@knowlearning/agents/browser.js'

export default async function matchNavigatorLanguage(incomingChoices = ['en']) {
    if (Agent.embedded) {
        const { variables: { FORCED_LANGUAGE, LANGUAGES } } = await Agent.environment()
        return (FORCED_LANGUAGE ? [FORCED_LANGUAGE] : LANGUAGES)[0] || 'en'
    }
    const shortChoices = incomingChoices.map(lang => lang.split('-')[0])
    const shortenedNav = navigator.languages.map(lang => lang.split('-')[0])
    const firstMatch = shortenedNav.find(lang => shortChoices.includes(lang))
    return firstMatch ? firstMatch : 'en'
}

export function topLanguageChoice() {
    const defaultIfNoneFound = 'en'
    const languagesFound = navigator.languages
    if (!languagesFound || !languagesFound[0]) return defaultIfNoneFound
    else return navigator.languages[0].slice(0, 2)
}