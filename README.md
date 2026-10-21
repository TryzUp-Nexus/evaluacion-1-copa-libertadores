# 🏆 Evaluación 1 — API Copa Libertadores

API REST desarrollada con **Node.js y Express** para consultar 16 clubes de cinco países y sus títulos. Los datos se mantienen en memoria y provienen del enunciado académico.

## Requisitos e instalación

- Node.js 20 o superior
- Yarn

```bash
yarn
yarn dev
```

Servidor: **http://localhost:3000**. `node --watch` reinicia automáticamente al guardar cambios. Para ejecución sin vigilancia: `yarn start`.

## Rutas

| Método | Ruta | Resultado |
|---|---|---|
| GET | `/api/clubes` | Todos los clubes |
| GET | `/api/clubes/9` | Club por ID |
| GET | `/api/clubes?pais=Chile` | Clubes por país (búsqueda anidada) |
| GET | `/api/titulos/colo-colo` | Años de títulos de un club |
| GET | `/api/titulos` | Extra: todos los años ordenados |
| GET | `/api/estadisticas` | Extra: totales y títulos por país |

Las consultas de país y nombre no distinguen mayúsculas y minúsculas. Las tildes sí importan. Los recursos inexistentes responden `404` con `{ "error": "..." }`; un club existente sin títulos responde `200` con `[]`.

## Video de defensa

**Enlace:** https://youtu.be/zgoFrUV7w_g

## Estructura

evaluacion-1-libertadores/
├── .gitignore
├── datos.js
├── package.json
├── README.md
├── server.js
└── yarn.lock

Proyecto académico — Diplomado FullStack IPSS, Módulo 3.
