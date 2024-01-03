<template>
	<component :is="el">
		{{ displayString ? displayString : id }}
	</component>

</template>

<script>
import { validate as isUUID } from 'uuid'
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
		// for legacy content names, print the "id" if not a uuid. 
		if (!isUUID(this.id)) {
			this.displayString = this.id
			return
		}


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
		} else { // fallback to breadcrumb
			const res = await Agent.state(this.id)
			this.displayString = (res && res.source_string)
				? res.source_string
				: `cannot find ${this.id}`
		}
	}
}
</script>
