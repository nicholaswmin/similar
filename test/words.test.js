// Test result corrrectness 
// when comparing against `words` outer prop.

import test from 'node:test'
import { compare } from '../src/index.js'
  
const json = Object.freeze([
  // very similar (score 1-2 ...)
  { "abbrs": [{ "abbr": "foo" }], "word": "kitten"   },
  { "abbrs": [{ "abbr": "foo" }], "word": "mitten"   },
  { "abbrs": [{ "abbr": "foo" }], "word": "smitten"   },

  // exact duplicates (score = 0)
  { "abbrs": [{ "abbr": "foo" }], "word": "addition" },
  { "abbrs": [{ "abbr": "foo" }], "word": "addition" },
  { "abbrs": [{ "abbr": "foo" }], "word": "addition" },
  
  // no similarity assuming reasonable `cutoff`
  { "abbrs": [{ "abbr": "foo"  }], "word": "foofoo"  },
  { "abbrs": [{ "abbr": "foo"  }], "word": "barbar"  }
])

test('#compare.words()', async t => {
  const result = compare.words(json, { cutoff: 2 })

  await t.test('lists words with identical matches', async t => {
    const match = result.find(item => item.name === 'addition')
    t.assert.ok(match, 'did not find match with identical matches')
    
    await t.test('lists the correct match count', t => {
      t.assert.strictEqual(match.matches.length, 2)
    })
    
    await t.test('all are correct', t => {
      const match = result.find(v => v.name === 'addition')
      const names = match.matches.map(v => v.name)
      
      t.assert.deepStrictEqual(['addition', 'addition'], names)
    })
  })
  
  await t.test('lists words with similar matches', async t => {
    const identical = result.find(item => item.name === 'mitten')
    t.assert.ok(identical, 'did not find match with similar matches')
    
    await t.test('lists the correct match count', t => {
      const match = result.find(item => item.name === 'mitten')
      t.assert.ok(match, 'did not find match with similar matches')
      t.assert.strictEqual(match.matches.length, 2)
    })

    await t.test('all are correct', t => {
      const match = result.find(v => v.name === 'mitten')
      const names = match.matches.map(v => v.name)
      
      t.assert.deepStrictEqual(['kitten', 'smitten'], names)
    })
  })
  
  await t.test('does not list dissimilar entries', async t => {
    const dissimilar = result.filter(v => ['foofoo', 'barbar'].includes(v.name))

    t.assert.strictEqual(dissimilar.length, 0)
  })
})
