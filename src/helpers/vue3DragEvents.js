const DRAG_THRESHOLD = 3

let lastDragPosition = null
let dragListener = null
let dropListener = null
let parentSVG = null
let dragThresholdPassed = false

window.addEventListener('mousedown', function (event) {
    let dragElement = event.composedPath().find(element => element._vei && element._vei.on__drag)

    if (!dragElement) return

    parentSVG = dragElement.closest('svg')

    dragListener = dragElement ? dragElement._vei.on__drag : null
    dropListener = dragElement ? dragElement._vei.on__drop : null

    if (dragListener) document.querySelectorAll('iframe').forEach(iframe => iframe.style.pointerEvents = 'none')

    lastDragPosition = {
        x: event.clientX,
        y: event.clientY,
        dx: 0,
        dy: 0
    }

    if (parentSVG) {
        const p = parentSVG.createSVGPoint();

        p.x = event.clientX
        p.y = event.clientY

        const svgP = p.matrixTransform(parentSVG.getScreenCTM().inverse())
        dragThresholdPassed = false
        lastDragPosition.svg = {
            x: svgP.x,
            y: svgP.y,
            dx: 0,
            dy: 0
        }
    }
})

window.addEventListener('mousemove', function (event) {
    if (lastDragPosition && dragListener) {
        const dx = event.clientX - lastDragPosition.x
        const dy = event.clientY - lastDragPosition.y
        const thisDragPosition = {
            x: event.clientX,
            y: event.clientY,
            dx,
            dy
        }
        if (!dragThresholdPassed && Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD) {
            return
        }

        dragThresholdPassed = true

        if (parentSVG) {
            const p = parentSVG.createSVGPoint();

            p.x = event.clientX
            p.y = event.clientY

            const svgP = p.matrixTransform(parentSVG.getScreenCTM().inverse())
            thisDragPosition.svg = {
                x: svgP.x,
                y: svgP.y,
                dx: svgP.x - lastDragPosition.svg.x,
                dy: svgP.y - lastDragPosition.svg.y
            }
        }
        dragListener(thisDragPosition)
        lastDragPosition = thisDragPosition
    }
})

window.addEventListener('mouseup', function () {
    if (dropListener) dropListener(lastDragPosition)
    if (dragListener) document.querySelectorAll('iframe').forEach(iframe => iframe.style.pointerEvents = 'auto') // TODO: reset to original value
    lastDragPosition = null
    dragListener = null
    dropListener = null
    parentSVG = null
})
