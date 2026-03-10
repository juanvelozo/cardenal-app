---
version: v1
date: 2026-03-09
author: BMad Master + Juan
status: approved
project: Cardenal — Cancionero digital y herramientas de práctica musical
---

# Cardenal — Documento de Arquitectura v1

## 1. Stack Tecnológico

| Capa | Tecnología | Justificación |
|------|-----------|---------------|
| **Framework** | Astro 5.x | SSR/SSG nativo, islands architecture, SEO agresivo |
| **UI Islands** | React 19 | Componentes interactivos (editor, herramientas, play-along) |
| **Lenguaje** | TypeScript (strict) | Type safety en todo el proyecto |
| **Estilos** | Tailwind CSS | Productivo para mobile-first, purge automático |
| **Base de datos** | PostgreSQL 16 | Robusta, relacional, ideal para modelo de contenido |
| **ORM** | Prisma | Schema declarativo, migraciones, type safety |
| **API** | REST (Astro endpoints) | Endpoints nativos en `/api/v1/` |
| **Auth** | Better Auth | TypeScript-first, Google OAuth + email + magic link + Prisma |
| **Estado** | Nanostores | Atómico, tree-shakeable (~1KB), nativo con Astro y React |
| **Monorepo** | Turborepo + npm workspaces | Build pipeline, caching, tareas paralelas |
| **Hosting** | Railway | PostgreSQL managed, deploy simple, pricing predecible |
| **Runtime** | Node.js 20 | Runtime de Astro SSR |

### Bundle optimization strategy

- Astro partial hydration (solo React donde hace falta)
- `client:visible` / `client:idle` por defecto, `client:load` solo para lo crítico
- Dynamic imports para módulos pesados (editor, herramientas de audio)
- Tailwind purge automático
- Nanostores (~1KB) en vez de soluciones más pesadas
- Iconos como componentes SVG, no font icons

---

## 2. Estructura del Proyecto

### Monorepo — 2 deploys

```
cardenal-app/
├── apps/
│   ├── landing/              # Deploy 1: Astro SSG → cardenal.com
│   │   └── src/
│   │       ├── pages/
│   │       ├── layouts/
│   │       └── components/
│   │
│   └── app/                  # Deploy 2: Astro SSR → app.cardenal.com
│       └── src/
│           ├── pages/
│           │   ├── index.astro
│           │   ├── song/
│           │   ├── profile/
│           │   ├── explore.astro
│           │   ├── search.astro
│           │   ├── tools/
│           │   ├── login.astro
│           │   ├── api/
│           │   │   └── v1/
│           │   │       ├── songs/
│           │   │       ├── songbooks/
│           │   │       ├── users/
│           │   │       ├── auth/
│           │   │       ├── search/
│           │   │       └── health.ts
│           │   ├── og/
│           │   ├── sitemap.xml.ts
│           │   └── robots.txt.ts
│           │
│           ├── modules/              # Arquitectura hexagonal por módulo
│           │   ├── songs/
│           │   ├── editor/
│           │   ├── songbooks/
│           │   ├── auth/
│           │   ├── users/
│           │   ├── suggestions/
│           │   ├── profile/
│           │   ├── tuner/
│           │   ├── metronome/
│           │   ├── chord-dictionary/
│           │   └── key-calculator/
│           │
│           ├── layouts/
│           ├── middleware/
│           └── shared/
│
├── packages/
│   ├── shared/               # Tipos TS, validadores Zod, constantes
│   ├── ui/                   # Design system React + Tailwind
│   └── db/                   # Prisma schema + client + migrations
│
├── turbo.json
├── package.json
├── tsconfig.base.json
├── docker-compose.yml
└── .npmrc
```

### Convenciones

- **Naming:** kebab-case para archivos, PascalCase para componentes React
- **Imports:** Path aliases (`@cardenal/shared`, `@cardenal/ui`, `@cardenal/db`)
- **Validación:** Zod en `packages/shared` para compartir schemas entre frontend y API
- **Env vars:** `.env` por app, validadas con Zod al arrancar

---

## 3. Arquitectura Hexagonal por Módulo

### Regla de dependencia

```
┌─────────────────────────────────────────────┐
│                  API / UI                    │  ← Adaptadores de entrada
│         (Astro endpoints / React)            │
├─────────────────────────────────────────────┤
│               APPLICATION                    │  ← Casos de uso
│             (use-cases, hooks)               │
├─────────────────────────────────────────────┤
│                 DOMAIN                       │  ← Núcleo puro, sin dependencias
│    (entities, value-objects, ports)           │
├─────────────────────────────────────────────┤
│             INFRASTRUCTURE                   │  ← Adaptadores de salida
│       (Prisma repos, APIs externas)          │
└─────────────────────────────────────────────┘
```

Las flechas siempre apuntan hacia adentro. `domain/` no importa de nadie. `application/` solo importa de `domain/`. `infrastructure/` y `api/`/`ui/` implementan las interfaces definidas en `domain/`.

### Estructura de un módulo backend (ejemplo: songs)

```
modules/songs/
├── domain/
│   ├── entities/
│   │   ├── song.entity.ts
│   │   ├── block.entity.ts
│   │   └── section.entity.ts
│   ├── value-objects/
│   │   ├── chord.vo.ts
│   │   ├── key.vo.ts
│   │   └── bpm.vo.ts
│   ├── repositories/
│   │   └── song.repository.ts       # Interface (port)
│   └── services/
│       └── transpose.service.ts     # Lógica pura
│
├── application/
│   └── use-cases/
│       ├── create-song.use-case.ts
│       ├── get-song.use-case.ts
│       ├── update-song.use-case.ts
│       ├── delete-song.use-case.ts
│       └── list-songs.use-case.ts
│
└── infrastructure/
    └── persistence/
        └── prisma-song.repository.ts  # Implementación del port
```

### Estructura de un módulo frontend (ejemplo: songs)

```
modules/songs/
├── domain/
│   ├── entities/
│   └── value-objects/
│
├── application/
│   └── use-cases/          # Hooks y acciones
│
├── infrastructure/
│   ├── adapters/           # API calls
│   └── stores/             # Nanostores
│
└── ui/                     # Componentes React
```

### Inyección de dependencias (simple, sin librería)

```typescript
// shared/di/container.ts
import { PrismaSongRepository } from '@/modules/songs/infrastructure/persistence/prisma-song.repository'
import { GetSongUseCase } from '@/modules/songs/application/use-cases/get-song.use-case'
import { prisma } from '@cardenal/db'

const songRepo = new PrismaSongRepository(prisma)

export const container = {
  resolve(key: string) {
    const registry = {
      getSongUseCase: new GetSongUseCase(songRepo),
      // ...otros use cases
    }
    return registry[key]
  }
}
```

---

## 4. Frontend

### Estrategia de renderizado

| Contexto | Estrategia | Razón |
|----------|-----------|-------|
| **Landing** (`cardenal.com`) | SSG | SEO máximo, cero JS, build-time |
| **Canciones públicas** | SSR | SEO + Open Graph dinámico |
| **App autenticada** | SSR + React islands | Interactividad pesada |
| **Herramientas** | SSG + client-only islands | Web Audio API, sin SSR posible |

### Islands — Hydration Strategy

```astro
<!-- Estático, zero JS -->
<SongHeader title={song.title} artist={song.artist} />

<!-- Se hidrata cuando es visible (scroll) -->
<ChordDiagram client:visible chord="Am" />

<!-- Se hidrata al cargar la página -->
<SongEditor client:load song={song} />

<!-- Se hidrata solo en idle (baja prioridad) -->
<MetronomeOverlay client:idle />
```

Regla: `client:load` solo para lo crítico (editor). Todo lo demás `client:visible` o `client:idle`.

### Routing

```
apps/app/src/pages/
├── index.astro                    # Home
├── song/
│   ├── [slug].astro               # Vista de canción (SSR para SEO)
│   ├── [slug]/edit.astro          # Editor
│   └── new.astro                  # Nueva canción
├── songbook/
│   ├── [id].astro
│   └── new.astro
├── profile/
│   └── [username].astro
├── explore.astro
├── search.astro                   # Resultados de búsqueda
├── login.astro
└── tools/
    ├── tuner.astro
    ├── metronome.astro
    ├── chords.astro
    └── key-calculator.astro
```

### Dominios

- `cardenal.com` → Landing (SSG)
- `app.cardenal.com` → App + API (SSR)

### Estado con Nanostores

- Stores por módulo en `modules/<modulo>/infrastructure/stores/`
- Cross-module stores en `shared/stores/` (solo auth user, network status)
- Integración nativa con React via `@nanostores/react`

### Search

- Componente en layout con debounce + dropdown de resultados rápidos
- Link a `/search?q=` para resultados completos ("Ver todos los resultados")
- Sujeto a cambios de UX

---

## 5. API REST

### Convenciones

| Método | Ruta | Acción |
|--------|------|--------|
| `GET` | `/api/v1/songs` | Listar (paginado, filtros) |
| `GET` | `/api/v1/songs/:id` | Detalle |
| `POST` | `/api/v1/songs` | Crear |
| `PUT` | `/api/v1/songs/:id` | Actualizar |
| `DELETE` | `/api/v1/songs/:id` | Eliminar |
| `POST` | `/api/v1/songs/:id/publish` | Acciones específicas |

- Respuestas consistentes: `{ data, error, meta }`
- Paginación: `?page=1&limit=20`
- Validación de input con Zod (schemas desde `@cardenal/shared`)
- Errores tipados con códigos HTTP correctos
- Versionado: `/api/v1/`

### Endpoints por módulo

```
/api/v1/songs/              # GET (list), POST (create)
/api/v1/songs/:id           # GET, PUT, DELETE
/api/v1/songs/:id/publish   # POST
/api/v1/songs/:id/suggestions  # GET, POST
/api/v1/songs/:id/fork      # POST
/api/v1/songbooks/           # GET, POST
/api/v1/songbooks/:id        # GET, PUT, DELETE
/api/v1/users/:username      # GET
/api/v1/users/:username/songs # GET
/api/v1/auth/[...all]        # Better Auth catch-all
/api/v1/search?q=&type=&page= # GET
/api/v1/health               # GET
```

### Notas

- La transposición es client-side (operación pura sobre acordes), no necesita endpoint
- Auth delegada a Better Auth con catch-all handler

---

## 6. Base de Datos

### Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── USERS ───

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  username      String   @unique
  displayName   String?  @map("display_name")
  avatarUrl     String?  @map("avatar_url")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  songs         Song[]
  songbooks     Songbook[]
  favorites     Favorite[]
  suggestions   Suggestion[]
  following     Follow[]     @relation("follower")
  followers     Follow[]     @relation("followed")

  // Better Auth manages its own tables (sessions, accounts)

  @@map("users")
}

// ─── SONGS ───

enum SongStatus {
  DRAFT
  SHARED
  PUBLISHED
}

model Song {
  id            String     @id @default(cuid())
  userId        String     @map("user_id")
  title         String
  artist        String?
  key           String?
  bpm           Int?
  timeSignature String?    @map("time_signature")
  status        SongStatus @default(DRAFT)
  slug          String     @unique

  createdAt     DateTime   @default(now()) @map("created_at")
  updatedAt     DateTime   @updatedAt @map("updated_at")
  publishedAt   DateTime?  @map("published_at")

  user          User       @relation(fields: [userId], references: [id])
  blocks        Block[]
  favorites     Favorite[]
  suggestions   Suggestion[]
  songbookEntries SongbookEntry[]

  @@index([userId])
  @@index([status])
  @@index([slug])
  @@map("songs")
}

// ─── BLOCKS ───

enum BlockType {
  VERSE
  CHORUS
  BRIDGE
  INTRO
  OUTRO
  SOLO
  TAB
  INSTRUMENTAL
  CUSTOM
  REPEAT
}

model Block {
  id            String    @id @default(cuid())
  songId        String    @map("song_id")
  type          BlockType
  label         String?
  content       String
  order         Int
  refBlockId    String?   @map("ref_block_id")

  song          Song      @relation(fields: [songId], references: [id], onDelete: Cascade)
  refBlock      Block?    @relation("BlockRepeat", fields: [refBlockId], references: [id])
  repeatedBy    Block[]   @relation("BlockRepeat")
  suggestions   Suggestion[]

  @@index([songId])
  @@map("blocks")
}

// ─── SUGGESTIONS ───

enum SuggestionStatus {
  PENDING
  ACCEPTED
  REJECTED
}

model Suggestion {
  id            String           @id @default(cuid())
  songId        String           @map("song_id")
  blockId       String           @map("block_id")
  userId        String           @map("user_id")
  content       String
  comment       String?
  status        SuggestionStatus @default(PENDING)

  createdAt     DateTime         @default(now()) @map("created_at")
  resolvedAt    DateTime?        @map("resolved_at")

  song          Song             @relation(fields: [songId], references: [id], onDelete: Cascade)
  block         Block            @relation(fields: [blockId], references: [id], onDelete: Cascade)
  user          User             @relation(fields: [userId], references: [id])

  @@index([songId])
  @@index([blockId])
  @@map("suggestions")
}

// ─── SONGBOOKS ───

model Songbook {
  id            String   @id @default(cuid())
  userId        String   @map("user_id")
  name          String
  description   String?
  isPublic      Boolean  @default(false) @map("is_public")

  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  user          User     @relation(fields: [userId], references: [id])
  entries       SongbookEntry[]

  @@index([userId])
  @@map("songbooks")
}

model SongbookEntry {
  id            String   @id @default(cuid())
  songbookId    String   @map("songbook_id")
  songId        String   @map("song_id")
  order         Int
  transposeKey  String?  @map("transpose_key")
  notes         String?

  songbook      Songbook @relation(fields: [songbookId], references: [id], onDelete: Cascade)
  song          Song     @relation(fields: [songId], references: [id], onDelete: Cascade)

  @@unique([songbookId, songId])
  @@map("songbook_entries")
}

// ─── FAVORITES ───

model Favorite {
  id            String   @id @default(cuid())
  userId        String   @map("user_id")
  songId        String   @map("song_id")
  createdAt     DateTime @default(now()) @map("created_at")

  user          User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  song          Song     @relation(fields: [songId], references: [id], onDelete: Cascade)

  @@unique([userId, songId])
  @@map("favorites")
}

// ─── FOLLOWS ───

model Follow {
  id            String   @id @default(cuid())
  followerId    String   @map("follower_id")
  followedId    String   @map("followed_id")
  createdAt     DateTime @default(now()) @map("created_at")

  follower      User     @relation("follower", fields: [followerId], references: [id], onDelete: Cascade)
  followed      User     @relation("followed", fields: [followedId], references: [id], onDelete: Cascade)

  @@unique([followerId, followedId])
  @@map("follows")
}
```

### Decisiones de diseño

- **`Block.content`** almacena sintaxis inline: `"Pal[G]abra del al[Am]ma"`. Parsing en frontend.
- **`Block.refBlockId`** para REPEAT: referencia sin duplicar contenido.
- **`SongbookEntry.transposeKey`** permite tonalidad diferente por setlist.
- **`Song.slug`** único para URLs limpias y SEO.
- **Hard delete** (no soft delete) para MVP.
- **IDs con `cuid()`** — seguros para URLs públicas, más cortos que UUID.
- **Song-Songbook es many-to-many** — una canción no necesita pertenecer a ningún cancionero.
- **Better Auth** maneja sus propias tablas (sessions, accounts, verification tokens).

---

## 7. Editor de Bloques WYSIWYG Musical

### Flujo de experiencia

1. El usuario ve la canción renderizada (acordes arriba de las sílabas)
2. Click en un bloque → se convierte en texto editable con sintaxis `[G]`
3. Click fuera / blur → se renderiza de nuevo
4. Transición instantánea y suave (estilo Notion)

### Sintaxis Inline — Spec

```
Entrada:    "Hoy es[G] un buen dí[Am]a para can[C]tar"

Parseado:   { text: "Hoy es un buen día para cantar",
              chords: [{ chord: "G", position: 6 },
                       { chord: "Am", position: 17 },
                       { chord: "C", position: 25 }] }

Renderizado:        G              Am          C
             Hoy es  un buen día para  can tar
```

### Tipos de bloque

- VERSE, CHORUS, BRIDGE, INTRO, OUTRO, SOLO, TAB, INSTRUMENTAL, CUSTOM, REPEAT
- Bloques de solo acordes como tipo separado (INTRO, SOLO, INSTRUMENTAL)
- TAB: ASCII preformateado, sin parsing de acordes
- REPEAT: referencia a otro bloque, no duplica contenido

### Features del editor

- **Slash commands:** `/` en bloque vacío abre menú para cambiar tipo, referenciar secciones, insertar custom content
- **Drag & drop:** @dnd-kit para reordenar bloques (mobile-friendly)
- **Undo/Redo:** Command pattern con pila de commands
- **Autosave con cuenta:** Debounced (2s) al backend via API
- **Autosave sin cuenta:** localStorage. Al registrarse, migra borradores.

### Módulo editor — Estructura

```
modules/editor/
├── domain/
│   ├── entities/
│   │   ├── editor-block.entity.ts
│   │   └── editor-document.entity.ts
│   ├── value-objects/
│   │   ├── inline-chord.vo.ts
│   │   ├── chord-position.vo.ts
│   │   └── block-type.vo.ts
│   └── services/
│       ├── chord-parser.service.ts
│       ├── chord-serializer.service.ts
│       └── transpose.service.ts
│
├── application/
│   ├── use-cases/
│   │   ├── add-block.use-case.ts
│   │   ├── remove-block.use-case.ts
│   │   ├── reorder-blocks.use-case.ts
│   │   ├── update-block-content.use-case.ts
│   │   ├── change-block-type.use-case.ts
│   │   ├── create-repeat-block.use-case.ts
│   │   └── save-song.use-case.ts
│   └── commands/
│       └── editor-commands.ts
│
├── infrastructure/
│   ├── stores/
│   │   ├── editor-state.store.ts
│   │   ├── draft.store.ts
│   │   └── undo-redo.store.ts
│   ├── adapters/
│   │   └── song-api.adapter.ts
│   └── persistence/
│       └── local-draft.adapter.ts
│
└── ui/
    ├── EditorContainer.tsx
    ├── BlockList.tsx
    ├── BlockItem.tsx
    ├── BlockEditor.tsx
    ├── BlockRenderer.tsx
    ├── BlockTypeSelector.tsx
    ├── ChordOverlay.tsx
    ├── AddBlockButton.tsx
    ├── EditorToolbar.tsx
    └── DragHandle.tsx
```

---

## 8. Herramientas Musicales

Cada herramienta es un módulo independiente, funciona sin auth, 100% client-side.

### Acceso dual

- **Páginas standalone** (`/tools/*`): acceso directo, sin login, indexable
- **Overlay flotante**: mini-panel en desktop, bottom sheet en mobile, accesible desde cualquier pantalla

### Context-aware

Cuando el usuario tiene una canción abierta, las herramientas se pre-configuran con sus datos (BPM, tonalidad, acordes). Toggle para desactivar contexto.

### Módulos

| Herramienta | Módulo | Tecnología | Datos |
|-------------|--------|-----------|-------|
| Afinador | `tuner/` | Web Audio API + getUserMedia | Afinaciones estáticas + custom |
| Metrónomo | `metronome/` | Web Audio API + AudioContext scheduling | - |
| Diccionario de acordes | `chord-dictionary/` | SVG rendering | JSON estático (guitarra, ukelele, piano) |
| Calculadora de tonalidad | `key-calculator/` | Lógica pura | Teoría musical hardcoded |

### Detalles por herramienta

**Afinador:**
- Solo guitarra para MVP
- Afinaciones preset: Standard, Drop D, Half step down, Open G, Open D
- Afinación custom configurable por el usuario
- Detección via algoritmo autocorrelation (YIN)

**Metrónomo:**
- BPM slider + input numérico
- Tap tempo (tap → calcula BPM promedio)
- Selector de compás (4/4, 3/4, 6/8, etc.)
- Web Audio API scheduling (no setInterval — impreciso)

**Diccionario de acordes:**
- Multi-instrumento: guitarra, ukelele, piano
- Múltiples posiciones por acorde
- Diagramas SVG con estética hand-drawn
- Búsqueda por nombre

**Calculadora de tonalidad:**
- Input: progresión de acordes → Output: tonalidad probable
- Input: tonalidad → Output: progresiones comunes
- Todo client-side, sin backend

---

## 9. PWA / Offline

### Estrategia de caching

| Recurso | Estrategia | TTL |
|---------|-----------|-----|
| App shell (HTML, CSS, JS) | Precache | Build-time |
| Herramientas + chord DB | Precache | Build-time |
| Canciones vistas (auto) | Stale-while-revalidate | 7 días, máx 100 |
| Canciones descargadas (manual) | Cache first | Sin límite |
| Imágenes/avatars | Cache first | 24h |
| API search/list | Network first, fallback cache | 24h |
| API mutaciones | Background sync | 24h retención |

### Implementación

- **Workbox** via Astro integration
- **Service Worker** con precaching + runtime caching
- **Web App Manifest** con standalone display
- **Background sync** para mutaciones offline (ediciones, favoritos)

### Qué funciona offline

| Feature | Offline |
|---------|---------|
| Herramientas (afinador, metrónomo, etc.) | SI |
| Ver canciones cacheadas/descargadas | SI |
| Editar canciones propias | SI (sync posterior) |
| Crear canción nueva | SI (borrador local) |
| Buscar canciones nuevas | NO |
| Publicar | NO |
| Login | NO |

### UX Writing

- UX writing intencional y abundante sobre capacidades offline
- El usuario debe ser consciente de que puede usar la app sin conexión
- Call to action para instalar PWA (bottom sheet)
- El cardenal como guía de la comunicación offline (ej: cardenal con paragüitas cuando no hay red)
- Banner sutil al perder conexión: "Sin conexión — trabajando con datos guardados"

---

## 10. SEO / SSR

### Estrategia por ruta

| Ruta | Método | Indexable |
|------|--------|-----------|
| `cardenal.com/*` | SSG | SI |
| `app.cardenal.com/song/:slug` | SSR | SI |
| `app.cardenal.com/profile/:username` | SSR | SI |
| `app.cardenal.com/explore` | SSR | SI |
| `app.cardenal.com/tools/*` | SSG | SI |
| `app.cardenal.com/search` | SSR | NO (noindex) |
| `app.cardenal.com/*/edit` | SSR | NO (noindex) |
| `app.cardenal.com/login` | SSG | NO (noindex) |

### URLs limpias

```
app.cardenal.com/song/wonderwall-oasis
app.cardenal.com/profile/juanveloz
app.cardenal.com/songbook/fogon-de-verano
app.cardenal.com/explore?mood=fogon
app.cardenal.com/tools/tuner
```

### SEO checklist

- URLs limpias con slug descriptivo
- Meta tags dinámicos por página
- Open Graph optimizado para WhatsApp (crítico Argentina)
- OG images dinámicas con estética hand-drawn de Cardenal (Satori/sharp)
- Structured data JSON-LD (schema.org MusicComposition)
- Sitemap dinámico
- robots.txt
- Canonical URLs
- `lang="es"` en HTML
- SSR para contenido público, noindex para privado

### Open Graph images

Generadas por canción en `/og/song/:slug.png` con estética Cardenal. Cacheadas 24h. Incluyen título, artista, acordes principales, tonalidad y BPM.

### Performance targets (Core Web Vitals)

| Métrica | Target |
|---------|--------|
| LCP | < 1.5s |
| FID/INP | < 100ms |
| CLS | < 0.05 |
| TTFB | < 200ms |

---

## 11. Deploy e Infraestructura

### Arquitectura Railway

```
Railway Project
├── cardenal-landing (Astro SSG, Node 20) → cardenal.com
├── cardenal-app (Astro SSR, Node 20) → app.cardenal.com
└── PostgreSQL 16 (managed)
```

### CI/CD

- GitHub Actions en push a `main`
- Pipeline: lint → typecheck → test → deploy
- Deploy condicional: solo deploya el servicio que cambió
- Turborepo para builds incrementales

### Entornos

| Entorno | Branch | URLs | DB |
|---------|--------|------|-----|
| Production | `main` | `cardenal.com` / `app.cardenal.com` | PostgreSQL Railway (prod) |
| Staging | `develop` | `staging.cardenal.com` / `app-staging.cardenal.com` | PostgreSQL Railway (staging) |
| Local | cualquiera | `localhost:4321` / `localhost:4322` | PostgreSQL Docker |

### Desarrollo local

- Docker Compose para PostgreSQL local
- `npm run dev` levanta todo via Turborepo
- `npm run dev:landing` / `npm run dev:app` para desarrollo individual

### Monitoreo (MVP)

- Health check: `/api/v1/health`
- Logs: Railway built-in
- Errors: Sentry free tier (cuando haya usuarios)
- Uptime: UptimeRobot free tier

---

## Apéndice: Decisiones de diseño del brainstorming

Decisiones tomadas durante la sesión de brainstorming que impactan la arquitectura:

- **Mobile-first** (no desktop-first)
- **Editor WYSIWYG inline** (no split-screen)
- **Una canción = un dueño** (no versiones múltiples)
- **Sin comentarios** (sugerencias por bloque)
- **Sin FAQs, sin simplificación de acordes**
- **Contenido solo texto enriquecido** (no multimedia)
- **Transcriptor como autor**, sin garantía de fidelidad
- **Software libre y gratuito** — cero ads, cero tiers, cero features bloqueadas
