<template>
  <div class="modal-background" @click="$emit('close')" >
    <div @click.stop class="modal-content">
      <div class="modal-main">
        <slot />
      </div>

      <div class="modal-buttons">     
        <button class="mdc-button mdc-button--outlined" @click="$emit('close')">
          <span class="mdc-button__ripple"></span>
          <span class="mdc-button__label">{{ editing ? 'Cancel' : 'Close'}}</span>
        </button>
        <button class="mdc-button mdc-button--outlined"
          v-if="editing && id !== 'newTask' && id !== 'newMap'"
          @click="$emit('delete')"
        >
          <span class="mdc-button__ripple"></span>
          <span class="mdc-button__label">Delete</span>
        </button>
        <button class="mdc-button mdc-button--outlined"
          v-if="editing"
          @click="$emit('save')"
        >
          <span class="mdc-button__ripple"></span>
          <span class="mdc-button__label">Save</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'modal',
    props: ['id', 'editing'],
}
</script>

<style scoped>
#modal-wrapper
{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.modal-buttons
{
  text-align: right;
}
.modal-buttons button {
  margin: 0 8px;
}
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
  top: 42px;
  left:42px;
  right: 42px;
  bottom: 42px;

  display: flex;
  flex-direction: column;
  
  background: white;
  border-radius: 10px;
  padding: 10px;
}
.modal-header {
  text-align: center;
}

.modal-main {
  flex-grow: 1;
  position: relative;
  overflow: auto;
}
</style>