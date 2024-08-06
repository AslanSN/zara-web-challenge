# Zara Web Challenge

Prod: <a href="zara-marvelous.vercel.app">zara-marvelous.vercel.app</a>

## Introducción

Esta prueba consiste en la creación de una pequeña aplicación para obtener información sobre diferentes personajes de Marvel. La aplicación deberá contener dos vistas principales: una vista de listado de personajes y una vista de detalle de personaje.

## Ejecuciones

- Framework: `Next.js`
- Package manager: `npm`
- Commands:
  - Init dev mode: `npm run dev`
  - Lint (ESlint): `npm run lint`
  - Test (Vitest): `npm run test`
  - Format (Prettier): `npm run format`

## Arquitectura y Estructura del Proyecto

La arquitectura del proyecto sigue una estructura modular utilizando componentes de React y ContextAPI para la gestión del estado. El uso de Next.js permite el renderizado del lado del servidor (SSR) para mejorar el rendimiento y la SEO.

## Lenguaje

Debido a la importancia que tienen los tests y al breve tiempo para llevarlos a cabo esta app se desarrolla en TS previniendo errores de tipos e incongruencias de forma precompilada.

## Linters y formatters

Se ha utilizado ESlint y Prettier y configurado a gusto personal para estandarizar el código.

## CI

Se han implementado controles de pre-commit y pre-push con Husky para asegurarse de que el código haya sido controlado y los tests existentes no hayan sido malogrados.

### Estructura de Carpetas

```text
Zara Web Challenge
├── /.github
├── /.husky
├── /.vscode
├── /src
│   ├── /app
│   │   ├── (globals.css, favicon.ico)
│   │   ├── layout.tsx (global layout)
│   │   ├── page.module.css
│   │   ├── page.tsx
│   │   └── /character
│   │       └── [id].js
│   ├── /components
│   │   ├── /CharacterDetailsPage
│   │   │   ├── /CharacterHeader
│   │   │   │    └── (CharacterHeader[.tsx, .module.scss])
│   │   │   ├── /ComicCard...
│   │   │   /ComicsList...
│   │   │   ├── CharacterDetailsLayout.tsx
│   │   │   └── CharacterDetailsLayout.module.scss
│   │   ├── CharactersListsPages
│   │   │   ├── /CharacterCard...
│   │   │   ├── /CharactersList...
│   │   │   ├── /Searchbar...
│   │   │   ├── HomePageContainer.tsx
│   │   │   └── HomePageContainer.module.scss
│   │   ├── common
│   │   │   ├── /FavoriteButton...
│   │   │   └── /Navbar...
│   │   ├── /hooks
│   │   │   ├── useDebounce.ts
│   │   │   └── useWindowWidth.ts
│   └── /contexts
│       └── /CharactersContext
│           ├── /hooks
│           │   └── useCharacters.ts
│           ├── /services
|           |   ├── marvelApi.test.ts
│           │   └── marvelApi.ts
│           ├── /tests
|           |   ├── charactersContext.test.ts
│           │   ├── charactersReducer.test.ts
│           │   └── helpers.ts
│           ├── /types
|           |   ├── characterContextTypes.ts
│           │   └── characterTypes.ts
│           ├── /utils
│           │   └── /tests
│           │   │   └── predicates.test.ts
│           │   ├── hash.ts
│           │   └── predicates.ts
│           ├── characterReducer.ts
│           ├── CharactersContext.tsx
│           └── index.ts
├── /public
│   └── (assets, icons, etc.)
├── .eslintrc.js
├── .prettierrc
├── package.json
├── README.md
└── next.config.js
```

Como se puede comprobar la aplicación (src) está principalmente dividida en 3:

1. `app`: Hogar del ruter y según su disposición se crean las distintas páginas gracias a la _opinión_ de Next.js
2. `components`: Hogar de todos los componentes que han sido divididos por su lugar de uso.
3. `contexts`: Hogar del contexto único y principal de la app, characters (personajes).

## App

Se puede distinguir en app la página base (home) y la creación mediante slug de las distintas páginas detalladas de los personajes. Los favoritos son manejados por la home así como se insinuó en las instrucciones de la prueba.

### Vista principal

- Por defecto
  - Muestra un listado de hasta 50 personajes
- Mediante texto en el buscador
  - Si encuentra personajes mediante texto muestra dichos personajes
  - Si no los encuentra los buscará mediante la api con el parámetro `startsWith`
- Al dar al botón en el navbar del corazón:
  - En la misma página se mostrarán los favoritos
    - Al filtrar mediante la barra de búsqueda en ellos se ejecutará la misma lógica sobre estos que con el buscador general mostrando solo los favoritos.
  - Al volver a presionar el corazón de favoritos
    - Se retorna la vista de personajes general
- Le logo de marvel situado en el `navbar` conduce a esta página.

### Detalle del personaje

- Muestra:
  - Header
    - Imagen del personaje
    - Nombre
    - Descripción
    - Botón de selección de favorito
  - Comics
    - Muestra los comics hasta 20
    - En caso de no tener muestra un mensaje al usuario
    - Mientras se carga se cargan 5 placeholders
    - Se muestra en cada uno de ellos:
      - Imagen del cómic
      - Nombre principal del cómic
      - Año de lanzamiento

## Components

Para los componentes se ha llevado a cabo una realización básica de estilados con **`scss`** emparejados en la misma carpeta.

Cabe apuntar que la carpeta common sitúa a los componentes usados en layouts o bien en ambas páginas.

La subcarpeta `hooks` de `components` se dedica a almacenar los hooks utilizados por los mismos.

Se han controlado los casos de error y los casos de carga tanto de comics como de personajes, sendas cargas con animaciones.

### Diseño

El diseño de las vistas es responsive y sigue los diseños definidos en Figma. Los iconos y logotipos se han extraído del mismo.

Se han utilizado variables CSS han sido servidas en `globals.css` y consumidas en `scss`. Algunos componentes (los que requerían de imágenes) tienen también componentes estilados mediante `styled components`.

## Context

Así como fue solicitado no se utiliza otro método que el `ContextApi` de React apoyado con `useReducer` para manejar los estados y hacer las peticiones mediante la API de marvel facilitada. Ésto en el archivo `/contexts/CharactersContext/services/marvelApi.ts`.

Para el contexto se ha generado una especie de store que recuerda a la de redux, utilizando pues `charactersReducer.ts` como puente entre el contexto y los cambios de los estados siendo un action creator.

Para el proveedor del contexto se ha utilizado un hook para facilitar el control de que el provider haya envuelto al componente donde ha sido convocado. Éste se sitúa en `CharactersContext.tsx` donde se almacenan las lógicas principales

Finalmente la capa más superficial está situada en el hook `useCharacters` que será el solicitado por los componentes para acceder a las acciones y estados del contexto.

Se ha decidido persistir los favoritos en localhost para facilitar la recuperación de los mismos al usuario en falta de SWC o autenticación.

### API REST

- Las peticiones se realizan a la URL: `https://gateway.marvel.com/v1`
- La api key, pública y privada, y la url base se sitúan servidas mediante el archivo `.env`. Debido a la naturaleza del propósito de esta web app se mantienen dichas variables de entorno servidas de forma pública.

## Modo Desarrollo y Modo Producción

La aplicación gracias a Next tiene dos modos:

- **Modo Desarrollo**: los assets se sirven sin minimizar
- **Modo Producción**: los assets se ha asegurado de servirlos concatenados y minimizados
