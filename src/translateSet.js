import { browserAgent } from '@knowlearning/agents'
import translationSlugMap from './store/translationSlugMap.js'
import matchNavigatorLanguage from './matchNavigatorLanguage.js'

const language = matchNavigatorLanguage([ 'en' , 'pt', 'th' ])

const TRANSLATION_DOMAIN = 'translate-karel-alpha.netlify.app'
const CONTENT_DOMAIN = 'the-karel-project.netlify.app'

const Agent = browserAgent()

// translations expected, not breadcrumbs
export async function translateArrayOfTargets(targets) {
	const res = await Agent.query(
		'translationSetInLanguage',
		[ targets, language],
		TRANSLATION_DOMAIN
	)
	const translationMap = res.reduce((acc,cur) => ({ ...acc, [cur.target]: cur.value }), {})
	return translationMap
}

export async function translationsForParent(parentId) {
	const res = await Agent.query(
		'targets_for_parent',
		[ parentId ],
		CONTENT_DOMAIN
	)
	const targets = res.map(obj => obj.id)
	return translateArrayOfTargets(targets)
}

export function translateAllSlugs() {
	const targets = Object.values(translationSlugMap)
	return translateArrayOfTargets(targets)
}