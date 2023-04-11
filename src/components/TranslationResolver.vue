<template>
    <span>{{ translation }}</span>
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
        sourceLanguage: null,
        translations: null
      }
    },
    async created() {
      console.log('CREATED AND GETTING STUFFFFFF!', this.id)
      const [
        { state: sourceLang },
        { state: translations }
      ] = await Promise.all([
        Core.send({ type: 'state', user: 'assertionsv3', scope: `sourceLanguage-${this.id}`, domain: 'internal' }),
        Core.send({ type: 'state', user: 'assertionsv3', scope: `translations-${this.id}`, domain: 'internal' })
      ])
      console.log('CREATED AND GOT STUFFFFFF!', sourceLang, translations)

      this.sourceLanguage = sourceLang.lang.value
      this.translations = translations
    },
    computed: {
      translation() {
        console.log('computed translation')
        console.log(this.translations, this.lang, this.sourceLanguage)
        if (
          this.translations &&
          this.translations[this.lang] &&
          this.translations[this.lang].value
        ) {
          return this.translations[this.lang].value
        } else if (
          this.translations &&
          this.translations[this.sourceLanguage] &&
          this.translations[this.sourceLanguage].value
        ) {
          return this.translations[this.sourceLangauge].value
        } else {
          return `translation for ${this.id} in ${this.lang} not found, nor backup`
        }
        
      }
    }
  }
</script>