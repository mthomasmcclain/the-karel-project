<template>
  <div id="karel-tag-selector">

    <div class="user-select-tag-section">
      <span class="section-header">{{ t('user-tags') }}:</span>
      <span class="tag"
        v-for="(tag, i) in customTagChoices"
        :key="`tag-select-${i}`"
        @click="toggleSelected(tag)"
        :style="tags.customTags.includes(tag) ? 'background: green; color: white': ''"
        >
        <span style="margin-right: 4px;">{{ tags.customTags.includes(tag) ? '☒' : '☐' }}</span>
        <span> {{ t(tag) }}</span>
      </span>
    </div>
    
    <div class="auto-populated-tags-section">
      <span class="section-header">{{ t('system-auto-tags') }}:</span>
      <span class="tag"
        v-for="(tag, i) in tags.systemTags"
        :key="`system-tag-${i}`"
        >
        <span> {{ t(tag) }}</span>
      </span>
    </div>
  </div>

</template>

<script>
const TAG_CHOICES = [ "beginner", "intermediate", "challenge" ]
export default {
  name: 'App',
  props: [ 'tags' ],
  computed: {
    customTagChoices() { return TAG_CHOICES }
  },
  methods: {
    t(target) {
      return this.$store.getters.translation(target)
    },
    toggleSelected(tag) {
      const newCustomTags = [ ...this.tags.customTags ]
      const index = newCustomTags.indexOf(tag)
      if (index === -1) newCustomTags.push(tag)
      else newCustomTags.splice(index, 1)
      this.$emit('change', {
        systemTags: [ ...this.tags.systemTags ], // unchanged, just pass through
        customTags: newCustomTags
      })
    }
  }

}
</script>

<style scoped >
#karel-tag-selector {
  display: flex;
  user-select: none;
}
.user-select-tag-section,
.auto-populated-tags-section{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(4, 1fr);
  justify-items: start;
  padding: 5px;
  grid-gap: 5px;
}
.section-header {
  font-weight: bold;
  grid-column: 1 / 3;
}
.user-select-tag-section {
  border-right: 1px solid grey;
}
.user-select-tag-section .tag,
.auto-populated-tags-section .tag {
  display: inline-flex;
  font-size: 0.9rem;
  padding: 2px 14px;
  border-radius: 30px;
  background: #ddd;
  border-radius: 30px;
  color: #888;
}
.auto-populated-tags-section .tag {
  background: cadetblue;
  color: white;
}

</style>
