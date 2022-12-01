<template>
    <div class="world-from-json">
        <div class="json-column">
            <h3>Json for World:</h3>
            <textarea v-model="json" />
        </div>
        <KarelWorldRenderer
            class="karel-world-renderer"
            v-if="parsedJson"
            :world="parsedJson"
        />
        <div v-else>Json parse failed</div>
    </div>
</template>

<script>
import KarelWorldRenderer from '../components/KarelWorldRenderer.vue'

const DEFAULT_JSON = `{
    "nRows": 5,
    "nCols": 3,
    "stones": [
        {
            "r": 0,
            "c": 0,
            "n": 1
        }
    ],
    "walls": [],
    "karelDir": "East",
    "karelRow": 2,
    "karelCol": 0
}`

function isJson(x) {
    try { JSON.parse(x) }
    catch (e) { return false; }
    return true;
}

export default {
    name: 'world-from-json',
    components: { KarelWorldRenderer },
    data: () => ({
        json: DEFAULT_JSON
    }),
    computed: {
        parsedJson() {
            return isJson(this.json) ? JSON.parse(this.json) : null
        }
    }
}
</script>

<style scoped>
.world-from-json {
    display: flex;
    margin: 8px;
}

.world-from-json h3 {
    margin: 0 0 6px 0;
}
.world-from-json textarea {
    width: 300px;
    height: 300px;
    margin-right: 12px;
}
.world-from-json .karel-world-renderer {
    max-width: 600px;
    max-height: 600px;
}
</style>