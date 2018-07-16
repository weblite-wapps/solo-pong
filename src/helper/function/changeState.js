const { W } = window


const dispatch = qlite => W.share.dispatch([], qlite, [])


export const addToLeaderboard = (name, score) => dispatch(
  ['__compose', [
    ['__unless', [
      ['__compose', [['__gte', [5]], ['__length']]],
      ['__dropLast', [1]],
    ]],
    ['__reverse'],
    ['__sortBy', [['__prop', ['score']]]],
    // if name exist and lesser than score
    ['__reject', [['__both', [
      ['__compose', [['__equals', [name]], ['__prop', ['name']]]],
      ['__compose', [['__gt', [score]], ['__prop', ['score']]]],
    ]]]],
    // if name exist and greater than score
    ['__unless', [
      ['__compose', [['__not'], ['__find', [['__both', [
        ['__compose', [['__equals', [name]], ['__prop', ['name']]]],
        ['__compose', [['__gt', [score]], ['__prop', ['score']]]],
      ]]]]]],
      ['__append', [{ name, score }]],
    ]],
    // if name not exist
    ['__unless', [
      ['__find', [['__compose', [['__equals', [name]], ['__prop', ['name']]]]]],
      ['__append', [{ name, score }]],
    ]],
  ]],
)
