
module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  addUser: addUser
}

function getUsers (connection) {
  return connection('users').select()
}

function getUser (id, connection) {
  return connection('users').where('id', id)
}

function addUser (data, connection) {
  return connection('users')
    .insert({
      name: data.name,
      email: data.email
    })
}
