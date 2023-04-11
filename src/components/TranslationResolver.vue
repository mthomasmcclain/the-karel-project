<template>
    <span>{{ translation.value }}</span>
</template>

<script>
  export default {
    props: {
      id: {
        type: String,
        required: true
      },
      lang: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        sourceLang: null,
        translations: null
      }
    },
    async created() {
      console.log('CREATED AND GETTING STUFFFFFF!', this.id)
      const [
        { state: sourceLang },
        { state: translations }
      ] = await Promise.all([
        Core.send({ type: 'state', user: 'assertions-v3', scope: `sourceLanguage-${this.id}`, domain: 'asdf-translation.knowlearning.systems' }),
        Core.send({ type: 'state', user: 'assertions-v3', scope: `translations-${this.id}`, domain: 'asdf-translation.knowlearning.systems' })
      ])
      console.log('CREATED AND GOT STUFFFFFF!', sourceLang, translations)

      this.sourceLang = sourceLang
      this.translations = translations
    },
    computed: {
      translation() {
        if (!this.sourceLang) return { value: '...' }
        else {
          return this.translations[this.lang] || this.translations[this.sourceLang.lang]
        }
      }
    }
  }
</script>