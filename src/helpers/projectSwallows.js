import Swal from 'sweetalert2'

export function howToUseMapCustomizerSwal(t) {
    return Swal.fire({
        icon: 'info',
        html:
            `<div style="display:flex; flex-direction: column; align-items: flex-start;">` +
                `<h3 style="margin-bottom: -10px;">${ t('to-add-a-task-to-your-map') }</h3>` +
                `<p>${ t('drag-the-task-from-the-sidebar-onto-the-map') }</p>` +
                
                `<h3 style="margin-bottom: -10px;">${ t('to-remove-a-task-from-your-map') }</h3>` +
                `<p>${ t('click-on-a-task-and-press-the-delete-key') }</p>` +

                `<h3 style="margin-bottom: -10px;">${ t('to-add-a-dependency-arrow') }</h3>` +
                `<p>${ t('click-next-to-but-not-on-a-task-and-start-dragging-try-it') }</p>` +

                `<h3 style="margin-bottom: -10px;">${ t('to-remove-a-dependency-arrow') }</h3>` +
                `<p>${ t('click-on-an-arrow-and-press-the-delete-key') }</p>` +

            `</div>`,

        confirmButtonText: t('got-it')
    })
}


export function confirmCloseWithoutSaveSwal(t) {
    return Swal.fire({
        title: t('confirm-close'),
        text: t('are-you-sure-you-want-to-close-without-saving-unsaved-changes-will-be-lost'),
        icon: 'question',
        confirmButtonText:t('close-without-saving'),
        cancelButtonText: t('continue-editing'),
        showCancelButton: true,
    })
}

export function copyContentSwal(t) {
    return Swal.fire({
        title: t('copy-expert-content'),
        text: t('you-cannot-edit-pre-loaded-expert-content-would-you-like-to-create-a-copy'),
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: t('cancel'),
        confirmButtonText: t('copy-task')
    })
}

export function copyConfirmSwal(t) {
    return Swal.fire({
        title: t('copy-complete'),
        text: t('you-can-now-edit-your-copy-of-this-content'),
        icon: 'success',
        confirmButtonText: t('ok')
    })
}

export function invalidResizeStonesSwal(t) {
    return Swal.fire(
        t('invalid-world-resize'),
        t('cant-change-world-size-stone-would-be-outside-world-boundary'),
        'warning'
    )
}

export function invalidResizeWallsSwal(t) {
    return Swal.fire(
        t('invalid-world-resize'),
        t('cant-change-world-size-wall-would-be-outside-world-or-on-world-edge'),
        'warning'
    )
}

export function invalidResizeKarelSwal(t) { 
    return Swal.fire(
        t('invalid-world-resize'),
        t('cant-change-world-size-karel-would-be-outside-world-boundary'),
        'warning'
    )
}

export function confirmDeleteSwal(t) {
    return Swal.fire({
        title: t('are-you-sure'),
        text: t('confirm-deletion-you-cannot-undo-this'),
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: t('cancel'),
        confirmButtonText: t('delete')
    })
}

export function taskSuccessSwal(t) {
    const bodyOptions = [
        t('good-job'),
        t('nice-work'),
        t('you-did-it'),
        t('well-done'),
        t('awesome')
    ]
    const body = bodyOptions[Math.floor(Math.random() * bodyOptions.length)]
    const header = ''
    return Swal.fire(header, body, 'success')
}
export function taskIncorrectSwal(t, errorMessage) {
    if (errorMessage) {
        return Swal.fire(
            t('karel-had-a-problem'),
            t(errorMessage),
            'warning'
        )
    } else {
        return Swal.fire(
            t('not-quite'),
            t('karels-world-does-not-exactly-match-the-goal-state'),
            'warning'
        )
    }
}

export function taskPartialSuccessSwal(t) {
    const bodyOptions = [
        t('good-job'),
        t('nice-work'),
        t('you-did-it'),
        t('well-done'),
        t('awesome')
    ]
    var body = bodyOptions[Math.floor(Math.random() * bodyOptions.length)]
    body += "<br> "
    body += t('lets-see-if-the-code-also-solves-the-remaining-scenarios')
    const header = ''
    return Swal.fire(header, body, 'success')
}
export function taskTooManyBlocksSwal(t) {
    var body = t('you-solved-the-task-but-used-too-many-blocks')
    const header = ''
    return Swal.fire(header, body, 'warning')
}

export function mapCompleteSwal(t) {
    const bodyOptions = [
        t('good-job'),
        t('nice-work'),
        t('you-did-it'),
        t('well-done'),
        t('awesome')
    ]
    const bodyStart = bodyOptions[Math.floor(Math.random() * bodyOptions.length)]
    const body = bodyStart + ' ' + t('all-tasks-correctly-completed')
    const header = t('map-complete')
    return Swal.fire(header, body, 'success')
}


export function taskHintSwal(t, hint) {
    return Swal.fire(
        `${t('hint')}:`, // hint label
        hint, // hint contents should alread be translated
        'question'
    )
}

export function renameMapSwal(t, incomingName) {
    if (!incomingName) incomingName = `... ${t('name-your-map')} ...`
    return Swal.fire({
        title: t('update-map-name'),
        input: 'text',
        inputValue: incomingName,
        showCancelButton: true,
        cancelButtonText: t('cancel'),
        confirmButtonText: t('update-map-name'),
    })
}

export function importMapSwal(t) {
    return Swal.fire({
        title: t('import-map'),
        text: t('paste-the-id-of-the-map-you-wish-to-import'),
        input: 'text',
        showCancelButton: true,
        cancelButtonText: t('cancel'),
        confirmButtonText: t('import'),
    })
}

export function getCodeSwal(t, id) {
    return Swal.fire({
        title: t('share-code'),
        html: `${t('share-this-code-with-anyone-you-want')}. <br><br> ${id}`,
        type: 'success'
    })
}

export function mapNotFoundSwal(t) {
    return Swal.fire(
        t('not-found'),
        t('unable-to-find-a-map-with-the-provided-access-code'),
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