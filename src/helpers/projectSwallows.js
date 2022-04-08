import Swal from 'sweetalert2'

export function howToUseMapCustomizerSwal() {
    return Swal.fire({
        icon: 'info',
        html:
            '<div style="display:flex; flex-direction: column; align-items: flex-start;">' +
                '<h3 style="margin-bottom: -10px;">To Add a Task to Your Map</h3>' +
                '<p>Drag the task from the sidebar onto the map.</p>' +
                
                '<h3 style="margin-bottom: -10px;">To Remove a Task from Your Map</h3>' +
                '<p>Click on a task and press the \'delete\' key.</p>' +

                '<h3 style="margin-bottom: -10px;">To Add a Dependency Arrow</h3>' +
                '<p>Click <em>next to</em>, but not on, a task and start dragging. Try it!</p>' +

                '<h3 style="margin-bottom: -10px;">To Remove a Dependency Arrow</h3>' +
                '<p>Click on an arrow and press the \'delete\' key.</p>' +

            '</div>',

        confirmButtonText: 'Got It!'
    })
}


export function confirmCloseWithoutSaveSwal() {
    return Swal.fire({
        title: 'Confirm Close',
        text: 'Are you sure you want to close without saving? Unsaved changes will be lost.',
        icon: 'question',
        confirmButtonText:'Close without Saving',
        cancelButtonText: 'Continue Editing',
        showCancelButton: true,
    })
}

export function duplicateNameSwal(contentName) {
    return Swal.fire(
        'Choose a Different Name',
        `You already have content named ${contentName}. Choose a different name to save your task. To edit '${contentName}', select it from the gallery.`,
        'warning'
    )
}

export function noBlankNameSwal() {
    return Swal.fire(
        'Content Requires a Name',
        `You must provide a name to save.`,
        'warning'
    )
}

export function copyContentSwal() {
    return Swal.fire({
        title: 'Copy Expert Content?',
        text: `You are cannot edit pre-loaded, expert content. Would you like to create a copy?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Copy Task'
    })
}

export function copyConfirmSwal() {
    return Swal.fire({
        title: 'Copy Complete',
        text: `Your can now edit your copy of this content.`,
        icon: 'success',
        confirmButtonText: 'OK'
    })
}

export function invalidResizeSwal(message) {
    return Swal.fire('Invalid World Resize', message, 'warning')
}
export function invalidResizeStonesSwal() { return invalidResizeSwal('Can\'t change world size. Stone would be outside world boundary.') }
export function invalidResizeWallsSwal() { return invalidResizeSwal('Can\'t change world size. Wall would be outside world or on world edge.') }
export function invalidResizeKarelSwal() { return invalidResizeSwal('Can\'t change world size. Karel would be outside world boundary bounds.') }

export function confirmDeleteSwal(name) {
    return Swal.fire({
        title: 'Are you sure?',
        text: `Confirm deletion${name ? ` of '${name}'` : ''}. You cannot undo this.`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Delete'
    })
}

export function taskSuccessSwal() {
    const bodyOptions = ['Good job!', 'Nice Work.', 'You did it!', 'Well Done!', 'Awesome']
    const body = bodyOptions[Math.floor(Math.random() * bodyOptions.length)]
    const header = ''
    return Swal.fire(header, body, 'success')
}

export function taskIncorrectSwal(errorMessage) {
    if (errorMessage) {
        return Swal.fire(
            'Karel had a problem.', errorMessage, 'warning')
    } else {
        return Swal.fire(
            'Not quite...',
            'Karel\'s world does not exactly match the goal state.',
            'warning'
        )
    }
}

export function mapCompleteSwal() {
    const bodyOptions = ['Good job!', 'Nice Work!', 'You did it!', 'Well Done!', 'Awesome!']
    const bodyStart = bodyOptions[Math.floor(Math.random() * bodyOptions.length)]
    const body = bodyStart + '  All tasks correctly completed.'
    const header = 'Map Complete'
    return Swal.fire(header, body, 'success')
}


export function taskHintSwal(hint) {
    return Swal.fire('Hint:', hint, 'question')
}

export function renameMapSwal(incomingName = '... name your map ...') {
    return Swal.fire({
        title: 'Update Map Name',
        input: 'text',
        inputValue: incomingName,
        showCancelButton: true,
        confirmButtonText: 'Update Map Name',
    })
}

export function importMapSwal() {
    return Swal.fire({
        title: 'Import Map',
        text: 'Paste the id of the map you wish to import.',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Import',
    })
}

export function getCodeSwal(id) {
    return Swal.fire({
        title: 'Share Code',
        html: `Share this code with anyone you want. <br><br> ${id}`,
        type: 'success'
    })
}

export function mapNotFoundSwal() {
    return Swal.fire(
        'Not Found',
        `Unable to find a map with the provided access code.`,
        'warning'
    )
}

// export function importingDisabledSwal() {
//     return Swal.fire({
//         icon: 'success',
//         text: 'Importing content created by other users is currently disabled... but we like the way you\'re thinking!'
//     })
// }

// export function sharingDisabledSwal() {
//     return Swal.fire({
//         icon: 'success',
//         text: 'Sharing your maps with other users is currently disabled... but we like the way you\'re thinking!'
//     })
// }