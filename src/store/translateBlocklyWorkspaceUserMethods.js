import et from 'elementtree'
import { v4 as uuid } from 'uuid'

export function extractTranslationsForBlocklyWorkspaceUserMethods(workspace) {
    // return:
    // 1. the workspace with uuids (for translation targets) in place of the method name strings.
    // 2. the method names, so we can write the initial translation assertions
    // {
    //    [translationTargetId] : 'method name 1',
    //    [translationTargetId] : 'method name 2',
    // }

    const workspaceTree = et.parse(workspace)

    const userDefinedFnNodes = workspaceTree.findall(`.//block[@type='procedures_defnoreturn']`)
    const userMethods = {}
    userDefinedFnNodes.forEach(n => {
        const translationTargetId = uuid()
        userMethods[translationTargetId] = n._children[0].text // to populate fn calls and return
        n._children[0].text = translationTargetId
    })

    const userCalledFnNodes = workspaceTree.findall(`.//block[@type='procedures_callnoreturn']`)
    userCalledFnNodes.forEach(n => {
        const userMethodName = n._children[0].attrib.name
        const uuidForName = Object.keys(userMethods).find(key => userMethods[key] === userMethodName)
        n._children[0].attrib.name = uuidForName
    })

    return {
        workspace: workspaceTree.write(),
        userMethods
    }
}

export function injectTranslationsForBlocklyWorkspaceUserMethods(workspace, translationMap) {
    // workspace has uuids for method names.
    // translationMap is { [uuid] : StringToInject }
    // do replacements and return
    const workspaceTree = et.parse(workspace)

    const userDefinedFnNodes = workspaceTree.findall(`.//block[@type='procedures_defnoreturn']`)
    userDefinedFnNodes.forEach(n => {
        const uuid = n._children[0].text
        const translation = translationMap[uuid]
        if (translation) n._children[0].text = translation
    })

    const userCalledFnNodes = workspaceTree.findall(`.//block[@type='procedures_callnoreturn']`)
    userCalledFnNodes.forEach(n => {
        const uuid = n._children[0].attrib.name
        const translation = translationMap[uuid]
        if (translation) n._children[0].attrib.name = translation
    })

    return workspaceTree.write()

}