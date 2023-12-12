<template>
	<span>{{ displayString ? displayString : id }}</span>

</template>

<script>
import matchNavigatorLanguage from '../matchNavigatorLanguage.js'
const DOMAIN_DEFAULT = 'translate-karel-alpha.netlify.app'

export default {
	name: "translate-id",
	props: {
		id: {
			type: String,
			required: true,
		},
		language: {
			type: String,
			required: false,
		},
		translationDomain: {
			type: String,
			required: false,
			default: DOMAIN_DEFAULT
		}
	},
	data: () => ({
		fetchedLanguage: null,
		displayString: null
	}),
	async created() {
		if (this.language) {
			this.fetchedLanguage = this.language
		} else {
			this.fetchedLanguage = await matchNavigatorLanguage(['en', 'pt', 'th'])
		}

		const res = await Agent.query(
			'translate',
			[ this.id, this.fetchedLanguage ],
			this.translationDomain
		)
		const translation = res?.[0]?.value
		if (translation) {
			this.displayString = translation
		} else { // look for breadcrumb
			const allBreadcrumbs = await Agent.query('translatable_targets')
			const breadcrumb = allBreadcrumbs.find(obj => obj.id === this.id)
			const breadcrumbIsDesiredLanguage = breadcrumb?.language === this.fetchedLanguage

			if (breadcrumbIsDesiredLanguage) {
				this.displayString = breadcrumb.value
			} else { // nothing found
				this.displayString = `${this.fetchedLanguage} ${this.id}`
			}
		}	
	}
}
</script>
