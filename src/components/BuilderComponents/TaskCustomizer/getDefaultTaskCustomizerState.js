export default function () {
    return {
        onceUponATimeWasCorreclyCompleted: false,
        activeTab: 'Basic',

        name: 'Default Task Name',
        instructions: 'Default Instructions',
        hint: '',
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
        karelBlockly: {
            toolbox: null,
            workspace: `
                <xml>
                <Block
                    type="karel_main"
                    id="main"
                    deletable="false"
                    x="16"
                    y="16"
                />
                </xml>
            `,
            settings: {
                blocks: {
                    karel_move: { active: true, limit: -1 },
                    karel_turn: { active: true, limit: -1 },
                    karel_place: { active: true, limit: -1 },
                    karel_pickup: { active: true, limit: -1 },
                    karel_if: { active: false, limit: -1 },
                    karel_repeat: { active: false, limit: -1 },
                    karel_while: { active: false, limit: -1 },
                    karel_define: { active: false, limit: -1 },
                },
                showToolbox: true,
                disabled: false,
                maxBlocks: -1,
                customizerMode: true,
            },
            highlighted: []
        },
        
        tags: {
            'customTags': [],
            'systemTags': [],
        }
    }
}
