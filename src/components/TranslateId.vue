<template>
	<span>{{ displayString ? displayString : id }}</span>

</template>

<script>
import matchNavigatorLanguage from '../matchNavigatorLanguage.js'
const LOCAL_LANGUAGE = matchNavigatorLanguage(['en', 'th', 'pt'])
const DOMAIN_DEFAULT = 'translate-karel-alpha.netlify.app'
// DEV DOMAIN FOR TESTING
// const DOMAIN_DEFAULT = '19188b19-bdaa-4a15-86ee-9bd442a13422.localhost:6061'

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
			default: LOCAL_LANGUAGE
		},
		translationDomain: {
			type: String,
			required: false,
			default: DOMAIN_DEFAULT
		}
	},
	data: () => ({
		displayString: null
	}),
	async created() {

		const res = await Agent.query(
			'translate',
			[ this.id, this.language ],
			this.translationDomain
		)
		if (res && res[0] && res[0].value) this.displayString = res[0].value
		else this.displayString = `${this.language} ${this.id}`
}
}
</script>
