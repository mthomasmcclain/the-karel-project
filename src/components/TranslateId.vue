<template>
	<component :is="el">
		{{ displayString ? displayString : id }}
	</component>

</template>

<script>
import matchNavigatorLanguage from '../matchNavigatorLanguage.js'
const DOMAIN_SELF = 'the-karel-project.netlify.app'
// const DOMAIN_SELF = '19188b19-bdaa-4a15-86ee-9bd442a13422.localhost:9899'
const TRANS_DOMAIN = 'translate-karel-alpha.netlify.app'
// const TRANS_DOMAIN = '19188b19-bdaa-4a15-86ee-9bd442a13422.localhost:6061'

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
	
		el: {
			type: String,
			required: false,
			default: 'span'
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
			TRANS_DOMAIN
		)
		const translation = res?.[0]?.value
		if (translation) {
			this.displayString = translation
		} else { // look for breadcrumb

			const allBreadcrumbs = await Agent.query('translatable_targets', [], DOMAIN_SELF)
			const breadcrumb = allBreadcrumbs.find(obj => obj.id === this.id)

			const breadcrumbIsDesiredLanguage = breadcrumb?.language === this.fetchedLanguage

			if (breadcrumbIsDesiredLanguage) {
				this.displayString = breadcrumb.source_string
			} else { // nothing found
				this.displayString = `${this.fetchedLanguage} ${this.id}`
			}
		}	
	}
}
</script>
