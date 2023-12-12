import { browserAgent } from '@knowlearning/agents'
import translationSlugMap from './store/translationSlugMap.js'
import matchNavigatorLanguage from './matchNavigatorLanguage.js'

const language = matchNavigatorLanguage([ 'en' , 'pt', 'th' ])

const TRANS_DOMAIN = 'translate-karel-alpha.netlify.app'
const Agent = browserAgent()

// translatios expected, not breadcrumbs
export default async function translateArrayOfTargets(targets) {
	if (targets === 'all') targets = Object.values(translationSlugMap)

	const res = await Agent.query('translationSetInLanguage', [ targets, language], TRANS_DOMAIN)
	const translationMap = res.reduce((acc,cur) => ({ ...acc, [cur.target]: cur.value }), {})
	return translationMap
}