import leven from './leven.js'

const pluck = key => (item, i) => ({ name: item[key], i })
const merge = key => (acc, item) => acc.concat(item.abbrs.map(pluck(key)))
const words = json => json.map(pluck('word'))
const abbrs = json => json.reduce(merge('abbr'), [])

const lteql = cutoff => a => a.score <= cutoff
const other = a => b => b.name !== a.name
const match = ([name, matches], i) => ({ name, i, matches: matches.slice(1) })
const score = a => b => ({ ...b, score: leven(a.name, b.name)})
const groupr = item => item.name
const unique = items => Object.entries(Object.groupBy(items, groupr))

const scoreAsc = (a, b) => (a.score - b.score)
const minMatchScoreAsc = (a, b) => (a.matches[0].score - b.matches[0].score)

const matched = item => item.matches.length
const similar = (items, opts) => matches(items)
  .map(collect(matches(items), opts.cutoff))
const matches = items => unique(items).map(match)
const collect = (groups, cutoff = 5) => group => ({
  ...group, matches: [
    ...group.matches, 
    ...groups
      .map(score(group))
      .sort(scoreAsc)
      .filter(other(group))
      .filter(lteql(cutoff))
  ]
})


const compare = {
  words: (json, opts = { cutoff: 3 }) => similar(words(json), opts)
    .filter(matched)
    .sort(minMatchScoreAsc),

  abbrs: (json, opts = { cutoff: 3 }) => similar(abbrs(json), opts)
    .filter(matched)
    .sort(minMatchScoreAsc),
}

export { compare }
