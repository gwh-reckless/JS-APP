const Kyle = {
  name: 'Kyle',
  age: 25,
}

const Tom = {
  name: 'Tom',
  age: 21,
}

function printUser(user) {
  console.log(`${user.name} is ${user.age} years old`)
}

module.exports = {
  Kyle: Kyle,
  Tom: Tom,
  printUser: printUser,
}
