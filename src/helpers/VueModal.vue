<template>
  <div class="modal-background" @click="$emit('close')" >
    <div @click.stop class="modal-content">

      <div class="modal-header">
        <h3>{{ title }}</h3>
      </div>


      <div class="modal-main">
        <slot />
      </div>


      <!-- If Editing, Show Cance, Save, and Delete Buttons -->
      <div v-if="editing" class="modal-buttons">     
          <button class="mdc-button mdc-button--outlined" @click="confirmCloseModal">
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label">Cancel</span>
        </button>    
          <button class="mdc-button mdc-button--outlined" @click="saveCustomizedContent">
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label">Save</span>
        </button>
          <button class="mdc-button mdc-button--outlined"
            @click="deleteContent"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label">Delete</span>
        </button>
      </div>

      <!-- If Previewing, only Show Close Button -->
      <div v-else class="modal-buttons" style="margin-top: 6px;">
          <button class="mdc-button mdc-button--outlined" @click="$emit('close')">
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label">Close</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'modal',
    props: ['title', 'editing']
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
  top: 80px;
  left:80px;
  right: 80px;
  bottom: 80px;

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