<template>
  <div class="modal-background" @click="$emit('close')" >
    <div @click.stop class="modal-content">

      <div class="modal-header">
        <h3>{{ title }}</h3>
      </div>

      <div class="modal-main">
        <slot />
      </div>

      <div class="modal-buttons">     
        <button class="mdc-button mdc-button--outlined" @click="$emit('close')">
          <span class="mdc-button__ripple"></span>
          <span class="mdc-button__label">Done</span>
        </button>
        <button class="mdc-button mdc-button--outlined"
          v-if="editing"
          @click="$emit('delete')"
        >
          <span class="mdc-button__ripple"></span>
          <span class="mdc-button__label">Delete</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'modal',
    props: ['id', 'editing'],
    computed: {
      title() {
        return this.$store.getters.name(this.id)
      }
    }
}
</script>

<style scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1050;
}
.modal-content {
  position: absolute;
  top: 32px;
  left:32px;
  right: 32px;
  bottom: 32px;

  display: flex;
  flex-direction: column;
  
  background: white;
  border-radius: 10px;
  padding: 10px;
}
.modal-main {
  flex-grow: 1;
}
</style>