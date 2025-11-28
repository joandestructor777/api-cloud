const express = require('express');
const cors = require('cors');
const pool = require('./database/database_connection.js');
require('dotenv').config();

const app = express();
app.use(cors());
app.disable('x-powered-by');
app.use(express.json());

const PORT = process.env.PORT ?? 1234;

// RUTAS PARA OBTENER INFORMACION DE LA BASE DE DATOS
app.get('/libros', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM public."Libros"');
    res.status(200).json(rows);
  } catch (e) {
    console.error('Error al obtener libros:', e.message);
    res.status(500).json({ error: 'Error al obtener libros' });
  }
});

app.get('/libros/:id', async (req, res)=>{
  const { id } = req.params;
  try{
      const libro = await pool.query('SELECT * FROM public."Libros" WHERE id =$1 ',[id]);
      res.status(200).json(libro.rows[0]);
  }catch(e){
      res.status(404).json({message: e.message})
  }

})

app.post('/libros', async (req, res)=>{
  try{
    const { titulo, ano_publicacion, id_autor } = req.body;
    const queryCreate = await pool.query('INSERT INTO public."Libros"(titulo, año_publicacion, id_autor) VALUES($1, $2, $3) RETURNING *',[titulo,ano_publicacion,id_autor]);
    res.status(200).json(queryCreate.rows[0]);
  }catch(e){
    res.status(500).json({ message: e.message});
  }
})

app.put('/libros/:id', async(req, res)=>{
    const {id} = req.params;
    const { titulo, ano_publicacion, id_autor } = req.body;
    const actualizar = await pool.query(`
      UPDATE public."Libros"
      SET titulo= $1, año_publicacion=$2, id_autor=$3
      WHERE id = $4 RETURNING *
    `,[titulo, ano_publicacion, id_autor, id]);
    res.status(200).json(actualizar.rows[0]);
})

app.delete('/libros/:id', async(req, res)=>{
  const { id }= req.params;
  const libroEliminado = await pool.query('DELETE FROM public."Libros" WHERE id = $1 RETURNING *',[id]);
  res.status(200).json(libroEliminado.rows[0]); 
})

app.get('/autores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM public."Autores"');
    res.status(200).json(result.rows);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.get('/autores/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM public."Autores" WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.post('/autores', async (req, res) => {
  const { nombre, nacionalidad } = req.body;

  if (!nombre || !nacionalidad) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO public."Autores"(nombre, nacionalidad) VALUES($1, $2) RETURNING *',
      [nombre, nacionalidad]
    );

    res.status(201).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.put('/autores/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, nacionalidad } = req.body;

  try {
    const result = await pool.query(
      'UPDATE public."Autores" SET nombre=$1, nacionalidad=$2 WHERE id=$3 RETURNING *',
      [nombre, nacionalidad, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.delete('/autores/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM public."Autores" WHERE id=$1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Autor no encontrado' });
    }

    res.status(200).json(result.rows[0]);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
