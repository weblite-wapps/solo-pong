// W && R
const { W } = window


export default (vueRoot) => {
  /* Load Data */
  // get user
  W.loadData().then(({ user: { name } }) => { vueRoot.playerName = name })


  /* ShareDB */
  // get votes from shareDB Server
  W.share.getFromServer([]).then(() => W.start())
  // shareDB sunbscription
  W.share.subscribe((leaderBoard) => { vueRoot.leaderBoard = leaderBoard || [] })
}
