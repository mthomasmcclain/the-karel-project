export default function generateKarelTaskCustomizerStateFromRunState(runState) {
    return {
        activeTab: 'Basic',
        karelBlockly: runState.karelBlockly,
        instructions: runState.instructions,
        hint: runState.hint,
        name: runState.name,
        preWorld: runState.preWorld,
        postWorld: runState.postWorld,
        tags: runState.tags,
    }
}
