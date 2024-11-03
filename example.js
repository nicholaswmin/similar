import { compare } from '@nicholaswmin/similar'

const json = await fetch('https://raw.githubusercontent.com/abbrcode/abbreviations-in-code/refs/heads/main/data/abbrs/.json')
  .then(res => res.json())

const similarWords = compare.words(json, { cutoff: 3 })
const similarAbbrs = compare.abbrs(json, { cutoff: 3 })

console.dir(similarWords, { depth: 3 })
// console.dir(similarWords, { depth: 3 })
