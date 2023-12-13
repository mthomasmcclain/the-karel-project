export default async function translateGroupInLanguage(parentId, language) {
    const SELF_DOMAIN = 'the-karel-project.netlify.app'
    // const SELF_DOMAIN = '19188b19-bdaa-4a15-86ee-9bd442a13422.localhost:9899'

    // 1. get all breadcrumbs for a group
    const breadcrumbs = await Agent.query('targets_for_parent', [ parentId ], SELF_DOMAIN)
    // 1a. if no breadcrumbs, EXIT and return undefined
    if (!breadcrumbs.length) return undefined
    //  1b. if breadcrumbs' source_langauge is languague, use those and EXIT
    const sourceTranslations = breadcrumbs.reduce((acc, cur) => ({ ...acc, [cur.id] : cur.source_string }), {})
    if (breadcrumbs[0].language === language) {  // use first as bellwether
      return sourceTranslations
    }
    
    // 2. get all translations for targets in lang
    const targets = breadcrumbs.map(bc => bc.id)
    const domain = 'translate-karel-alpha.netlify.app'
    // const domain = '19188b19-bdaa-4a15-86ee-9bd442a13422.localhost:6061'

    const translatePromises = targets.map(t => Agent.query('translate', [t, language], domain))
    const translations = await Promise.all(translatePromises)
    // translations is an Array of Arrays of length 0 (if not found) or length 1 (if found) containing { target, value, language }
    // 2a. if any are missing, return strings from breadcrumbs
    const anyAreMissing = translations.some(trans => !trans || trans.length === 0)
    if (anyAreMissing) return sourceTranslations
    // 2b. otherwise return the map we want
    return translations.reduce((acc, cur) => ({ ...acc, [cur[0].target] : cur[0].value }), {})
}