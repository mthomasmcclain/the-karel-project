import Swal from 'sweetalert2'

export function confirmCloseWithoutSaveSwal() {
    return Swal.fire({
        title: 'Confirm Close',
        text: 'Are you sure you want to close without saving? Unsaved changes will be lost.',
        icon: 'question',
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

export function forkContentSwal() {
    return Swal.fire({
        title: 'Copy Other User\'s Content?',
        text: `You are not the owner of this content. Create new using it as a template?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Copy Task'
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
        text: `Confirm deletion ${name ? `of '${name}'` : ''}.  You cannot undo this.`,
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

export function setMapFlowSwal(incomingMode) {
    return Swal.fire({
        title: 'Task Availablility',
        input: 'radio',
        inputValue: incomingMode ? 'prereq' : 'all',
        inputOptions: {
            all: 'All Available',
            prereq: 'When Priors Complete'
        }
    })
}

export function setMapTimeLimitSwal(incomingTime) {
    return Swal.fire({
        title: 'Set Time Limit',
        icon: 'question',
        input: 'range',
        inputLabel: 'How Many Minutes Will Learners Have?',
        inputAttributes: { min: 1, max: 60, step: 1 },
        inputValue: incomingTime ? incomingTime : 20,
        showCancelButton: true,
        confirmButtonText: 'Set Limit',
        cancelButtonText: 'No Time Limit',
    })
}

export function createAssignmentSwal(id) {
    return Swal.fire({
        title: 'Assignment Created',
        text: `Share the following link with anyone you would like to complete your assignment.`,
        icon: 'success',
        footer: `
      <div style="text-align:center;">
        <a href="https://run.knowlearning.systems/${id}" target="_blank">run.knowlearning.systems/${id}</a>
      </div>
    `
    })
}

export function surveySwal() {
    return Swal.fire(
        'Survey',
        'Placeholder for end of activity survey!',
        'question'
    )
}