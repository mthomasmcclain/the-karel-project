export default function () {
    return {
        onceUponATimeWasCorreclyCompleted: false,


        activeTab: 'Basic',
        blocklyXml: null,
        instructions: '',
        hint: '',
        name: '',
        preWorld: {
            nCols: 3,
            nRows: 3,
            karelRow: 0,
            karelCol: 0,
            karelDir: 'North',
            walls: [],
            stones: [],
            lastClicked: null,
        },
        postWorld: {
            nCols: 3,
            nRows: 3,
            karelRow: 2,
            karelCol: 2,
            karelDir: 'East',
            walls: [],
            stones: [],
            lastClicked: null,
        },
        tags: {
            'customTags': [],
            'systemTags': [],
        }
    }
}
