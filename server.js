import express from "express";
import cors from "cors";
import { paises, clubes } from "./datos.js";

const app = express();
app.use(cors());
const PORT = 3000;

// Normalizar mayúsculas y espacios, manteniendo las tildes.
const normalizar = (texto) => texto.trim().toLowerCase();

// GET /api/clubes y GET /api/clubes?pais=Chile
app.get("/api/clubes", (req, res) => {
  if (req.query.pais === undefined) return res.status(200).json(clubes);
  if (typeof req.query.pais !== "string")
    return res.status(404).json({ error: "No existe el país solicitado" });
  const nombrePais = normalizar(req.query.pais);
  const pais = paises.find((item) => normalizar(item.nombre) === nombrePais);
  if (!pais)
    return res
      .status(404)
      .json({ error: `No existe el país ${req.query.pais}` });
  const clubesDelPais = clubes.filter((club) => club.paisId === pais.id);
  return res.status(200).json(clubesDelPais);
});

// GET /api/clubes/9
app.get("/api/clubes/:id", (req, res) => {
  const id = Number(req.params.id);
  const club = clubes.find((item) => item.id === id);
  if (!club)
    return res
      .status(404)
      .json({ error: `No existe el club ${req.params.id}` });
  return res.status(200).json(club);
});

// Extra opcional: años de todos los títulos, ordenados.
app.get("/api/titulos", (_req, res) => {
  const anios = clubes.flatMap((club) => club.titulos).sort((a, b) => a - b);
  return res.status(200).json(anios);
});

// GET /api/titulos/colo-colo
app.get("/api/titulos/:club", (req, res) => {
  const nombre = normalizar(req.params.club).replaceAll("-", " ");
  const club = clubes.find(
    (item) => normalizar(item.nombre).replaceAll("-", " ") === nombre,
  );
  if (!club)
    return res
      .status(404)
      .json({ error: `No existe el club ${req.params.club}` });
  return res.status(200).json(club.titulos);
});

// Extra opcional: estadísticas usando reduce.
app.get("/api/estadisticas", (_req, res) => {
  const titulosPorPais = paises.map((pais) => ({
    pais: pais.nombre,
    titulos: clubes
      .filter((club) => club.paisId === pais.id)
      .reduce((total, club) => total + club.titulos.length, 0),
  }));
  const totalTitulos = clubes.reduce(
    (total, club) => total + club.titulos.length,
    0,
  );
  return res
    .status(200)
    .json({ totalClubes: clubes.length, totalTitulos, titulosPorPais });
});

app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

app.listen(PORT, () =>
  console.log(`🏆 API escuchando en http://localhost:${PORT}`),
);
