<template>
    <div class="modal-background" @click="$emit('closeModal')" >
        <div @click.stop class="modal-content">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal',
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
  background: white;
  border-radius: 10px;
  padding: 10px;
}
</style>