[![Codecoverage badge](https://img.shields.io/badge/100%25-coverage-green)](#tests)

# similar 

> finds similar `words`/`abbreviations` in the 
> [abbreviations-in-code][abbrs-in-code] project lists.
>
> meant to avoid duplicate or near-duplicate entries.

Uses the [Damerau-Levenshtein distance][leven-algo] to calculate   
similarities between entries of the machine-readable [JSON abbreviations][json].    

- words with `score < 3` are included in the results.
- a `score: 0` means it's an *exact* duplicate.  
- results are sorted by *lowest* score, ascending.  

> The lower the `score`, the more *similar* the words are.      
>
> The score is the number of additions/deletions/edits required to change 
> a word into another.
>
> e.g: "cat" and "car" distance is `1`.

## install 

```bash
npm i https://github.com/nicholaswmin/similar.git
```

> theres no deps, neither `prod` nor `dev`/`test`.

## usage

Example usage:

```js
import { compare } from '@nicholaswmin/similar'

const json = await fetch('https://raw.githubusercontent.com/abbrcode/abbreviations-in-code/refs/heads/main/data/abbrs/.json')
  .then(res => res.json())

const similarWords = compare.words(json, { cutoff: 3 })
const similarAbbrs = compare.abbrs(json, { cutoff: 3 })

console.dir(similarWords, { depth: 3 })
// console.dir(similarAbbrs, { depth: 3 })
```

returns:

```js
{
  name: 'predication',
  i: 202,
  matches: [
    { name: 'prediction', i: 203, matches: [], score: 1 },
    { name: 'production', i: 208, matches: [], score: 3 }
  ]
},
{
   name: 'time',
   i: 260,
   matches: [
     { name: 'timer', i: 261, matches: [], score: 1 },
     { name: 'sine', i: 239, matches: [], score: 2 },
     { name: 'type', i: 266, matches: [], score: 2 },
     { name: 'active', i: 4, matches: [], score: 3 },
     { name: 'image', i: 131, matches: [], score: 3 },
     { name: 'link', i: 156, matches: [], score: 3 },
     { name: 'node', i: 177, matches: [], score: 3 },
     { name: 'pixel', i: 197, matches: [], score: 3 },
     { name: 'text', i: 259, matches: [], score: 3 },
     { name: 'to', i: 263, matches: [], score: 3 }
   ]
 },
}

// and so on...
```

The above example can be run via `node example.js`

## Test

> no need for `npm i`, 
> its a native test runner

```js
node --run test
```

## Authors

Nik. Kyriakides, [@nicholaswmin][nicholaswmin]


[MIT "No attribution" License][mit-0]

[nicholaswmin]: https://github.com/nicholaswmin
[abbrs-in-code]: https://github.com/abbrcode/abbreviations-in-code
[json]: https://raw.githubusercontent.com/abbrcode/abbreviations-in-code/refs/heads/main/data/abbrs/.json
[leven-algo]: https://en.wikipedia.org/wiki/Damerau%E2%80%93Levenshtein_distance
[mit-0]: https://spdx.org/licenses/MIT-0.html
