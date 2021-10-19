const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

getUser('gwh-reckless')

async function getUser(username) {
  const resp = await fetch(APIURL + username)
  const respData = await resp.json()

  //   createUserCard(respData)
  console.log(respData)

  getRepos(username)
}

async function getRepos(username) {
  const resp = await fetch(APIURL + username + '/repos', { mode: 'cors' })
  const respData = await resp.json()
  //   addReposToCard(respData)
  console.log(resp)
}
