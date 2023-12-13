// replace user defined methods with uuid translation targets (in the workspace
// and toolbox).  Return the new kb AND a map of uuids => method name strings
import { Parser, Builder } from 'xml2js'
import { v4 as uuid, validate as isUUID } from 'uuid'

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value)
}

function copy(x) { return JSON.parse(JSON.stringify(x)) }

function findElementsByProperty(parsedXml, property) {
  const elements = []

  const traverse = (obj) => {
    if (obj instanceof Object) {
      if (obj[property]) {
        elements.push(obj[property])
      }
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          traverse(obj[key])
        }
      }
    }
  }

  traverse(parsedXml)
  return elements
}


export async function karelBlocklyUserMethodsToUUID(kb) {
    const targets = {} // uuid => name string
    const parser = new Parser()
    const ws = await parser.parseStringPromise(kb.workspace)
    const tb = await parser.parseStringPromise(kb.toolbox)


    const workspaceBlocks = findElementsByProperty(ws,'block').flat()
    workspaceBlocks.forEach(bl => {
      if (bl.$.type === 'procedures_callnoreturn') {
        const methodName = bl.mutation[0].$.name
        let uuidKey = getKeyByValue(targets, methodName)
        if (uuidKey) {
          bl.mutation[0].$.name = uuidKey
        } else {
          uuidKey = uuid()
          targets[uuidKey] = methodName
          bl.mutation[0].$.name = uuidKey
        }
      } else if (bl.$.type === 'procedures_defnoreturn') {
        const methodName = bl.field[0]._
        let uuidKey = getKeyByValue(targets, methodName)
        if (uuidKey) {
          bl.field[0]._ = uuidKey
        } else {
          uuidKey = uuid()
          targets[uuidKey] = methodName
          bl.field[0]._ = uuidKey
        }
      }
    })

    const toolboxBlocks = findElementsByProperty(tb,'Block').flat()
    toolboxBlocks.forEach(bl => {  // Achtung 'B'lock here versus 'b'lock above
      if (bl.$.type === 'procedures_callnoreturn' && bl.mutation)  { // the final one is a placeholder for new, no mutation w/name
        const methodName = bl.mutation[0].$.name
        let uuidKey = getKeyByValue(targets, methodName)
        if (uuidKey) {
          bl.mutation[0].$.name = uuidKey
        } else {
          uuidKey = uuid()
          targets[uuidKey] = methodName
          bl.mutation[0].$.name = uuidKey
        }
      }
    })
    const builder = new Builder()
    const kbCopy = copy(kb)
    kbCopy.workspace = builder.buildObject(ws)
    kbCopy.toolbox = builder.buildObject(tb)
    return { 
    	karelBlockly: kbCopy,
    	targets
    }
}

export async function karelBlocklyTranslateUUIDs(kb, map) {
	const parser = new Parser()
    const ws = await parser.parseStringPromise(kb.workspace)
    const tb = await parser.parseStringPromise(kb.toolbox)



    const workspaceBlocks = findElementsByProperty(ws,'block').flat()
    workspaceBlocks.forEach(bl => {
      if (bl.$.type === 'procedures_callnoreturn') {
        const target = bl.mutation[0].$.name
        if (isUUID(target) && map[target]) bl.mutation[0].$.name = map[target]
        else console.warn(`unable to translate user method ${target}`)
      } else if (bl.$.type === 'procedures_defnoreturn') {
        const target = bl.field[0]._
        if (isUUID(target) && map[target]) bl.field[0]._ = map[target]
        else  console.warn(`unable to translate user method ${target}`) 
      }
    })

    const toolboxBlocks = findElementsByProperty(tb,'block').flat()
    toolboxBlocks.forEach(bl => {
      if (bl.$.type === 'procedures_callnoreturn' && bl.mutation)  { // the final one is a placeholder for new, no mutation w/name
        const target = bl.mutation[0].$.name
        if (isUUID(target) && map[target]) bl.mutation[0].$.name = map[target]
        else console.warn(`unable to translate user method ${target}`)
      }
    })
    const builder = new Builder()
    const kbCopy = copy(kb)
    kbCopy.workspace = builder.buildObject(ws)
    kbCopy.toolbox = builder.buildObject(tb)

    return kbCopy

}