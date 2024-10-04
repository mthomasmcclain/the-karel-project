import _ from 'lodash'

const copy = data => _.cloneDeep(data)

function Karel(world) {
    world = copy(world)
    if(!world.pickedStones) world.pickedStones = { blue: 0, red: 0 }
    this.world = world

    this.leftArrowPressed = false
    this.rightArrowPressed = false
    this.upArrowPressed = false
    this.downArrowPressed = false
    
    this.leftNextStep = false
    this.rightNextStep = false
    this.upNextStep = false
    this.downNextStep = false

    this.variables = {}
    this.eventFunctions = {}

    this.blue = 'blue'
    this.red = 'red'

    if (!world.karelRoom) world.karelRoom = { row: 0, col: 0 }

    window.addEventListener('keydown', (e) => {
        // e.preventDefault()

        if (e.key === 'ArrowLeft') {
            if (!this.leftArrowPressed) this.leftNextStep = true
            this.leftArrowPressed = true
        }
        if (e.key === 'ArrowRight') {
            if (!this.rightArrowPressed) this.rightNextStep = true
            this.rightArrowPressed = true
        }
        if (e.key === 'ArrowUp') {
            if (!this.upArrowPressed) this.upNextStep = true
            this.upArrowPressed = true
        }
        if (e.key === 'ArrowDown') {
            if (!this.downArrowPressed) this.downNextStep = true
            this.downArrowPressed = true
        }
    })

    window.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowLeft') this.leftArrowPressed = false
        if (e.key === 'ArrowRight') this.rightArrowPressed = false
        if (e.key === 'ArrowUp') this.upArrowPressed = false
        if (e.key === 'ArrowDown') this.downArrowPressed = false
    })

    this.isKeyPressed = (key) => {
        switch (key) {
            case 'ArrowLeft':
                return this.leftArrowPressed
            case 'ArrowRight':
                return this.rightArrowPressed
            case 'ArrowUp':
                return this.upArrowPressed
            case 'ArrowDown':
                return this.downArrowPressed
            default:
                return false
        }
    }

    const stonesAtLocation = (r, c, color, room) => world.stones.find(s => s.r === r && s.c === c && (s.color ? s.color === color : color === 'blue') && (s.room && room ? s.room.row === room.row && s.room.col === room.col : true))
    const wallAtLocation = (r, c, d) => world.walls.find(w => {
        //  equivalent wall location, but with West and South transformed to North and East
        const eq = {
            r: d === 'South' ? r + 1 : r,
            c: d === 'West' ? c - 1 : c,
            d: { West: 'East', South: 'North' }[d] || d
        }
        return w.r === eq.r && w.c === eq.c && w.d === eq.d
    })
    const stonesUnderKarel = (color) => stonesAtLocation(world.karelRow, world.karelCol, color, world.karelRoom)

    this.move = () => {
        if (!this.frontIsClear()) this.error = 'Front is blocked!'
        else if (world.karelDir === 'North') world.karelRow -= 1
        else if (world.karelDir === 'South') world.karelRow += 1
        else if (world.karelDir === 'East') world.karelCol += 1
        else if (world.karelDir === 'West') world.karelCol -= 1

        if (world.karelRow < 0) {
            world.karelRow = world.nRows - 1
            world.karelRoom.row -= 1
        }
        if (world.karelRow >= world.nRows) {
            world.karelRow = 0
            world.karelRoom.row += 1
        }
        if (world.karelCol < 0) {
            world.karelCol = world.nCols - 1
            world.karelRoom.col -= 1
        }
        if (world.karelCol >= world.nCols) {
            world.karelCol = 0
            world.karelRoom.col += 1
        }
    }

    this.turnLeft = () => world.karelDir = { North: 'West', West: 'South', South: 'East', East: 'North' }[world.karelDir]

    this.pickStone = (color) => {
        if (!this.stonesPresent(color)) this.error = 'No ' + color + ' stones to pick!'
        else {
            world.pickedStones[color] += 1
            stonesUnderKarel(color).n -= 1
            // don't allow stones when n < 1
            world.stones = world.stones.filter(s => s.n > 0)
        }
    }

    this.placeStone = (color) => {
        if (world.pickedStones[color] === 0) this.error = 'Karel has no ' + color + ' stones to place!'
        else {
            world.pickedStones[color] -= 1
            const stones = stonesUnderKarel(color)
            if (!stones) world.stones.push({ r: world.karelRow, c: world.karelCol, n: 1, color, room: {...world.karelRoom} })
            else stones.n += 1
        }
    }

    this.spawnStone = (color, row, column, room) => {
        row = row - 1
        column = column - 1
        if (!color) color = 'blue'
        if (!room) room = world.karelRoom
        if (row < 0 || row >= world.nRows) this.error = 'Row out of bounds!'
        else if (column < 0 || column >= world.nCols) this.error = 'Column out of bounds!'
        else {
            const stones = stonesAtLocation(row, column, color, room)
            if (!stones) world.stones.push({ r: row, c: column, n: 1, color, room })
            else stones.n += 1
        }
    }

    this.frontIsClear = () => {
        if (world.karelDir === 'South' && world.karelRow === world.nRows - 1) {
          if (world.doors && world.doors.find(d => d.r === world.nRows && d.c === world.karelCol && d.d === 'North' && d.room.row === world.karelRoom.row && d.room.col === world.karelRoom.col)) {
            return true
          }

          return false
        }
        if (world.karelDir === 'East' && world.karelCol === world.nCols - 1) {
          if (world.doors && world.doors.find(d => d.r === world.karelRow && d.c === world.nCols && d.d === 'East' && d.room.row === world.karelRoom.row && d.room.col === world.karelRoom.col)) {
            return true
          }

          return false
        }
        if (world.karelDir === 'North' && world.karelRow === 0) {
          if (world.doors && world.doors.find(d => d.r === 0 && d.c === world.karelCol && d.d === 'North' && d.room.row === world.karelRoom.row && d.room.col === world.karelRoom.col)) {
            return true
          }

          return false
        }
        if (world.karelDir === 'West' && world.karelCol === 0) {
          if (world.doors && world.doors.find(d => d.r === world.karelRow && d.c === 0 && d.d === 'East' && d.room.row === world.karelRoom.row && d.room.col === world.karelRoom.col)) {
            return true
          }

          return false
        }
        return !wallAtLocation(world.karelRow, world.karelCol, world.karelDir)
    }

    this.stonesPresent = (color) => !!stonesUnderKarel(color)

    this.error = null

    return this
}

export default function KarelWorld(world, source, highlight) {
    const steps = [copy({
        openBlocks: {},
        world,
        error: null,
        isDone: false,
        step: 0,
        pythonText: ''
    })]
    let finalStep = Infinity

    //  TODO: validate world
    const openBlocks = {}
    const startBlock = id => openBlocks[id] = openBlocks[id] ? openBlocks[id] + 1 : 1
    const endBlock = id => openBlocks[id] -= 1
    const done = () => finalStep = steps.length //  this is called before the last step is added to steps since our implementation looks to the step ahead

    let textAccumulator = '';
    const appendText = text => textAccumulator += text;

    let resolveCurrentPromise = []
    const step = () => new Promise(resolve => resolveCurrentPromise.push(resolve))
    const karel = new Karel(world)

    // Expose karel for variable inspector
    this.karel = karel

    //  functions is expected to be an object with keys corresponding to properly named
    //  async function definitions
    const runner = new Function('karel', 'start_block', 'end_block', 'step', 'done', 'highlight', 'appendText', source)

    //  start runner, will execute first step so that state is ready for the caller
    runner(karel, startBlock, endBlock, step, done, highlight, appendText)

    this.step = async (index) => {
        // return previously computed step
        if (steps[index]) return steps[index]

        if (index > steps.length) throw Error('New steps must be called for sequentialy')
        if (index > finalStep) throw Error('Cannot get step after the program has concluded')
        if (steps[steps.length - 1].error) throw Error('Cannot get step after an error!')

        const currentKarelWorldState = copy({
            openBlocks,
            activeBlocks: Object.keys(openBlocks).filter(k => openBlocks[k] > 0),
            world: karel.world,
            error: karel.error,
            isDone: karel.world.endConditions ? await karel.world.endConditions(karel) : finalStep === index,
            step: index,
            pythonText: textAccumulator
        })

        //  resolve current promise so the next KarelWorldState is ready for next call to step
        for (const resolve of resolveCurrentPromise) resolve()
        resolveCurrentPromise = []

        steps[index] = currentKarelWorldState
        
        if ('ArrowLeft' in karel.eventFunctions && !karel.eventFunctions.ArrowLeft.called && karel.leftNextStep) {
            karel.eventFunctions.ArrowLeft.called = true
            karel.eventFunctions.ArrowLeft.f()
        }
        if ('ArrowRight' in karel.eventFunctions && !karel.eventFunctions.ArrowRight.called && karel.rightNextStep) {
            karel.eventFunctions.ArrowRight.called = true
            karel.eventFunctions.ArrowRight.f()
        }
        if ('ArrowUp' in karel.eventFunctions && !karel.eventFunctions.ArrowUp.called && karel.upNextStep) {
            karel.eventFunctions.ArrowUp.called = true
            karel.eventFunctions.ArrowUp.f()
        }
        if ('ArrowDown' in karel.eventFunctions && !karel.eventFunctions.ArrowDown.called && karel.downNextStep) {
            karel.eventFunctions.ArrowDown.called = true
            karel.eventFunctions.ArrowDown.f()
        }

        karel.leftNextStep = false
        karel.rightNextStep = false
        karel.upNextStep = false
        karel.downNextStep = false

        return currentKarelWorldState
    }

    return this
}