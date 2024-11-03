// Test the *format* of the result, 
// not the result corrrectness.

import test from 'node:test'
import { compare } from '../index.js'
  
const json = Object.freeze([
  // very similar (score 1-2 ...)
  { "abbrs": [{ "abbr": "cat" }], "word": "kitten"   },
  { "abbrs": [{ "abbr": "mtn" }], "word": "mitten"   },
  { "abbrs": [{ "abbr": "smt" }], "word": "smitten"   },

  // exact duplicates (score = 0)
  { "abbrs": [{ "abbr": "sum" }], "word": "addition" },
  { "abbrs": [{ "abbr": "sum" }], "word": "addition" },
  
  // no similarity assuming reasonable `cutoff`
  { "abbrs": [{ "abbr": "abs"  }], "word": "absolute" },
  { "abbrs": [{ "abbr": "acro" }], "word": "acronym"  }
])

test('#result format', async t => {
  const result = compare.words(json, { cutoff: 1 })

  await t.test('returns an: Array', async t => {
    t.assert.ok(Array.isArray(result), `result is: ${typeof result}`)
  })
  
  await t.test('with some items', async t => {
    t.assert.ok(result.length > 1, `array length is: ${result.length}`)
    
    await t.test('item is an object', async t => {
      result.forEach(item => {
        t.assert.strictEqual(typeof item, 'object')
      })

      await t.test('with a name', async t => {
        result.forEach(item => t.assert.ok(typeof item.name, 'string'))
      })
      
      await t.test('with matches', async t => {
        result.forEach(item => t.assert.ok(typeof item.matches, 'object'))
        result.forEach(item => t.assert.ok(Array.isArray(item.matches)))
      })
    })
  })
})
