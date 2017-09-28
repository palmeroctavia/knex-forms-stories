
module.exports = {
  getUser: getUser,
  getUsers: getUsers,
  addUser: addUser,
  editUser: editUser
}

function getUsers (connection) {
  return connection('users').select()
}

function getUser (id, connection) {
  return connection('users').where('id', id).first()
}

function addUser (data, connection) {
  return connection('users')
    .insert({
      name: data.name,
      email: data.email
    })
}

function editUser (data, id, connection) {
  return connection('users')
    .where('id', id)
    .update({
      name: data.name,
      email: data.email
    })
}
