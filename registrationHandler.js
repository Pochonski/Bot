const connection = require('./database');

async function obtenerDatosUsuario(id_usuario) {
  const [rows] = await connection.query(
    'SELECT * FROM usuarios WHERE id = ?',
    [id_usuario]
  );
  return rows[0];
}

async function registrarUsuarioDirecto(id_usuario, alias) {
  const fecha = new Date().toISOString().slice(0, 10);
  await connection.query(
    'INSERT INTO usuarios (id, alias, fecha_registro) VALUES (?, ?, ?)',
    [id_usuario, alias, fecha]
  );
}

async function aliasYaExiste(alias) {
  const [rows] = await connection.query(
    'SELECT id FROM usuarios WHERE alias = ?',
    [alias]
  );
  return rows.length > 0;
}

module.exports = {
  obtenerDatosUsuario,
  registrarUsuarioDirecto,
  aliasYaExiste,
};
