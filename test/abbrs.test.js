// Test result corrrectness 
// when comparing against `abbrs` inner prop.

import test from 'node:test'
import { compare } from '../index.js'
  
const json = Object.freeze([
  // very similar (score 1-2 ...)
  { "abbrs": [{ "abbr": "fox"  }], "word": "foo"   },
  { "abbrs": [{ "abbr": "f "   }], "word": "foo"   },
  { "abbrs": [{ "abbr": "fooo" }], "word": "foo"   },

  // exact duplicates (score = 0)
  { "abbrs": [{ "abbr": "bar" }], "word": "foo" },
  { "abbrs": [{ "abbr": "bar" }], "word": "foo" },
  { "abbrs": [{ "abbr": "bar" }], "word": "foo" },
  
  // no similarity assuming reasonable `cutoff`
  { "abbrs": [{ "abbr": "quxxeb"  }], "word": "foo" },
  { "abbrs": [{ "abbr": "foobaz"  }], "word": "foo"  }
])

test('#compare.abbrs()', async t => {
  const result = compare.abbrs(json, { cutoff: 2 })

  await t.test('lists abbrs with identical matches', async t => {
    const match = result.find(item => item.name === 'bar')
    t.assert.ok(match, 'did not find match with identical matches')
    
    await t.test('lists the correct match count', t => {
      t.assert.strictEqual(match.matches.length, 2)
    })
    
    await t.test('all are correct', t => {
      const match = result.find(v => v.name === 'bar')
      const names = match.matches.map(v => v.name)
      
      t.assert.deepStrictEqual(['bar', 'bar'], names)
    })
  })
  
  await t.test('lists entries with similar matches', async t => {
    const identical = result.find(item => item.name === 'fox')
    t.assert.ok(identical, 'did not find match with similar matches')
    
    await t.test('lists the correct match count', t => {
      const match = result.find(item => item.name === 'fox')
      t.assert.ok(match, 'did not find match with similar matches')
      t.assert.strictEqual(match.matches.length, 2)
    })

    await t.test('all are correct', t => {
      const match = result.find(v => v.name === 'fox')
      const names = match.matches.map(v => v.name)
      
      t.assert.deepStrictEqual(['f ', 'fooo'], names)
    })
  })
  
  await t.test('does not list dissimilar entries', async t => {
    const dissimilar = result.filter(v => ['quxxeb', 'foobaz'].includes(v.name))

    t.assert.strictEqual(dissimilar.length, 0)
  })
})
