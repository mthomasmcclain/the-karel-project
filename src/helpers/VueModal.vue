<template>
  <div class="modal-background" @click="$emit('close')" >
    <div @click.stop class="modal-content">
      <div class="modal-main">
        <slot />
      </div>

      <div class="modal-buttons-wrapper">     
        <button class="karel-button modal-button" @click="$emit('close')">
          {{ editing ? t('cancel') : t('close') }}
        </button>
        <button class="karel-button modal-button"
          v-if="editing && id !== 'newTask' && id !== 'newMap'"
          @click="$emit('delete')"
        >
          Delete
        </button>
        <button class="karel-button modal-button" v-if="editing" @click="$emit('save')">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'modal',
    props: ['id', 'editing'],
    methods: {
      t(target) { return this.$store.getters.translation(target) }
    }
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
.modal-buttons-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
}
.karel-button.modal-button {
  margin: 0 8px;
  background: #7066e0;
}
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
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