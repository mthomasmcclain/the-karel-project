<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

import * as monaco from 'monaco-editor';

/*
 * Task ids:
 * 3057cf71-42be-4ead-ab20-683f8e085efb
 * 3d001131-390b-4165-8f3b-6a931155c34d
 * 762deb0b-7746-471f-b654-352db9063b4f
 * f854542e-2b21-4d4c-bdae-1efa2a2be3a3
 * 36bf25a6-8b78-46f9-a727-5c445687a780
 * a4584446-8ec9-4cc6-8a2c-88f298dfbaed
 * a9b2a855-76ac-4851-9c7c-4fad804c6cb8
 * 61cb8143-4c52-4e65-bc59-6b28b2999f8a
 */

const props = defineProps({
  consoleText: String,
  highlight: Object,
  error: Object
});

const consoleFinalText = computed(() => {
  return `Karel output:\n${props.consoleText ?? ''}`;
});

const code = defineModel();

const editorDiv = ref();

let editor;
let decorations = null;
onMounted(() => {
  editor = monaco.editor.create(editorDiv.value, {
    value: code.value,
    language: 'python'
  });

  editor.getModel().onDidChangeContent(() => {
    code.value = editor.getValue();
  });

  if (props.error.line !== 0) {
    monaco.editor.setModelMarkers(editor.getModel(), 'python', [{
      startLineNumber: props.error.line,
      startColumn: 1,
      endLineNumber: props.error.line,
      endColumn: editor.getModel().getLineMaxColumn(props.error.line) + 1,
      message: props.error.message,
      severity: monaco.MarkerSeverity.Error
    }]);
  }
});

watch(() => props.error, (error) => {
  if (editor) {
    if (error.line === 0) {
      monaco.editor.setModelMarkers(editor.getModel(), 'python', []);
      return;
    }

    monaco.editor.setModelMarkers(editor.getModel(), 'python', [{
      startLineNumber: error.line,
      startColumn: 1,
      endLineNumber: error.line,
      endColumn: editor.getModel().getLineMaxColumn(error.line) + 1,
      message: error.message,
      severity: monaco.MarkerSeverity.Error
    }]);
  }
}, { deep: true });

watch(() => props.highlight, (highlight) => {
  if (editor) {
    if (decorations) {
      decorations.clear();
      decorations = null;
    }

    if (highlight.line === 0) {
      return;
    }

    decorations = editor.createDecorationsCollection([{
      range: new monaco.Range(highlight.line, 1, highlight.line, 1),
      options: {
        isWholeLine: true,
        className: 'line-highlight'
      }
    }]);
  }
}, { deep: true });

onUnmounted(() => {
  monaco.editor.getModels()[0].dispose();
});
</script>

<template>
  <div class="container">
    <div ref="editorDiv" class="editor"></div>
    <pre class="console">{{ consoleFinalText }}</pre>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
}

.editor {
  width: 100%;
  height: 80%;
}

.console {
  width: 100%;
  height: 20%;

  box-sizing: border-box;
  padding: 5px;

  white-space: pre-wrap;
  overflow-y: auto;

  background-color: black;
  color: white;
}
</style>

<!-- Style for line highlighting in the editor. Needs to be global. -->
<style>
.line-highlight {
  background-color: deepskyblue;
}
</style>
