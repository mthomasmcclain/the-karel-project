//<script>//hack for syntax
import Blockly from 'blockly/browser'
import * as en from 'blockly/msg/en'
import * as pt from 'blockly/msg/pt'
import * as th from 'blockly/msg/th'
import matchNavigatorLanguage from '../../../../matchNavigatorLanguage.js'
import initializeKarelBlocklyGenerators from './initializeKarelBlocklyGenerators'
import karelTranslations from '../../../../helpers/karelTranslations.js'
import initializeKarelBlocks from '../../../../helpers/initializeKarelBlocks'

import KarelWorld from "./KarelWorld"

const blocklyLocales = { en, pt, th } // blockly general, not karel blockly
const langChoices = Object.keys(karelTranslations) // choices for KAREL
const lang = matchNavigatorLanguage(langChoices)
  
Blockly.setLocale({ ...blocklyLocales[lang], ...karelTranslations[lang] })
initializeKarelBlocks(Blockly)
initializeKarelBlocklyGenerators(Blockly)

const KarelBlocklyWorld = (world, { toolbox, workspace }) => {

    // initialize new blockly instance with given workspace and toolbox
    // TODO find way to initialize blockly w/o DOM element
    const detachedDOMElement = document.createElement('div')
    detachedDOMElement.style.display = 'none'
    document.body.appendChild(detachedDOMElement)
    const blocklyInstance = Blockly.inject(detachedDOMElement, { toolbox })
    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(workspace), blocklyInstance)

    Blockly.JavaScript.init(blocklyInstance) // required to use blockToCode... intuitive isn't it?
    // these workds are used internally and need to be switched out
    Blockly.JavaScript.addReservedWords('start_block,end_block,step,karel_move,karel,done')
    Blockly.JavaScript.STATEMENT_PREFIX = 'start_block(%1);'

    // arbitrary code to attach to beginning of each line.
    // %1 is the corresponding block id
    Blockly.JavaScript.STATEMENT_SUFFIX = ';await step(); end_block(%1);'

    // TODO:  Instead of requiring the stable identifier "main", get/use first block of type "karel_main"
    const functions = {
        main: `async function main() {${Blockly.JavaScript.blockToCode(blocklyInstance.getBlockById('main'))}}`
    }

    const procedureNames = Blockly.Procedures.allProcedures(blocklyInstance)[0].map(([name]) => name)
    // Blockly internals and externals are jank: https://groups.google.com/g/blockly/c/C5MMgkU48S8
    procedureNames.forEach(name => {
        const block = Blockly.Procedures.getDefinition(name, blocklyInstance)
        // does not return expected, because... check jank note above
        // but is still required to run (if you want to run this somewhere else)
        // make sure to call the generator ".init(blocklyInstance)" caveat code mentioned above
        // or this won't do what you expect...
        Blockly.JavaScript.blockToCode(block)
    })

    // must access internal property... did I mention the jankness?
    // what is this % prefix you say? that is how the blockly folks decided
    // to keep user defined names from overwriting intenals... jjjjjj...ank
    Object
        .entries(Blockly.JavaScript.definitions_)
        .forEach(([name, source]) => {
            if (name[0] === '%') {
                functions[name.substring(1)] = `async ${source}`
            }
        })

    const source = Object.values(functions).join(';') + '; main().then(done);'
    return new KarelWorld(world, source)
}

export default KarelBlocklyWorld