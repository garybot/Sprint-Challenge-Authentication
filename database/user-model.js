const db = require('../database/dbConfig.js');

async function add(user) {
  console.log(user);
  const [id] = await db('users').insert(user, 'id');
  return findById(id);
}

function findBy(filter) {
  console.log(filter);
	return db('users')
		.select('id', 'username', 'password')
		.where(filter);
}

function findById(id) {
  return db('users')
    .select('id', 'username')
    .where({ id });
}

module.exports = {
  add,
  findById,
  findBy
}
