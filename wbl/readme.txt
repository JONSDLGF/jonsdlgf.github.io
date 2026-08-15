# Project: Web Browser Local
by: jon

Un navegador web local que busca usando índices SQLite descargados con **P2P servers**.
El buscador funciona en local con una base de datos estática y “metabuscadores” (packs) que se pueden descargar/actualizar mediante P2P.

## Idea general
- La comunidad / nodos P2P ofrecen archivos/índices (por ejemplo `searchmain.db`).
- El core del buscador lee el índice SQLite local.
- Las búsquedas se hacen contra los registros del esquema definido abajo.

## Esquema SQLite (meta-search de SQL)

### Tabla `more`
Contiene metadatos que apuntan a “mains”.

- `sqlmweb` (string)
- `hipermetadata` (string)
- `mains` (string -> referencia a `"main"` con relación [1])

Ejemplo conceptual:
- Una fila en `more` describe un pack/meta-index y señala a cuál `main` pertenece.

### Tabla `main` ([1])
Contiene los resultados indexados.

Campos:
- `title` (string)
- `url` (string)
- `text` (string)
- `topics` (string[json])

`topics` guarda un JSON como string (por ejemplo):
`[ "linux", "gnu", "gnu/linux" ]`

## Ejemplo de datos

| title      | url                              | text                                     | topics                           |
|------------|----------------------------------|------------------------------------------|----------------------------------|
| linuxchad  | https://foro.linuxchad.org/      | a web to talk of linux and more          | [ "linux", "gnu", "gnu/linux" ]  |
| youtube    | https://youtube.com/             | you can see videos and music             | [ "youtube", "videos", "meme" ]  |

## Búsqueda
La UI permite escribir una consulta (input).
El motor busca dentro de `title`, `text` y/o `topics` (según implementes el ranking).
Los resultados se muestran como tarjetas/enlaces usando `url`.

## P2P
Se usan servidores P2P para descargar/actualizar los índices (por ejemplo packs `searchmain.db`).
Cada pack debe mantener el mismo esquema o declarar compatibilidad.

