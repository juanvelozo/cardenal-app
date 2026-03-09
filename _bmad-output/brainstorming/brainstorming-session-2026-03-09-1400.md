---
stepsCompleted: [1, 2, 3, 4]
inputDocuments: []
session_topic: 'Cardenal — app web de cancionero digital y herramienta de práctica musical'
session_goals: 'Explorar diferenciadores, ideas no obvias para el editor y herramientas, oportunidades más allá del copy actual, prioridades MVP vs futuro'
selected_approach: 'ai-recommended'
techniques_used: ['Cross-Pollination', 'SCAMPER Method', 'Assumption Reversal']
ideas_generated: 71
session_active: false
workflow_completed: true
facilitation_notes: 'Juan tiene visión muy clara de lo que quiere y lo que no. Prioriza simplicidad, control de scope, y experiencia de usuario. Descarta rápidamente features que agregan complejidad sin valor claro. Fuerte instinto de producto.'
---

# Brainstorming Session Results

**Facilitador:** Juan
**Fecha:** 2026-03-09

## Session Overview

**Tema:** Cardenal — app web de cancionero digital y herramienta de práctica musical (estilo JustChords, Ultimate Guitar, Tus Acordes, La Cuerda)
**Objetivos:** Explorar diferenciadores frente a la competencia, ideas no obvias para el editor y herramientas musicales, oportunidades no contempladas, prioridades MVP vs futuro

### Contexto del Proyecto

- App web mobile-first (cambio respecto al concepto original desktop-first)
- Target: Argentina y Latinoamérica (Spanish/English)
- Estética Co-Star + Excalidraw: minimal, poética, paper-like, hand-drawn
- Mascota: cardenal amarillo argentino como personaje-guía de la experiencia
- Stack: Astro frontend, REST API, PostgreSQL
- Auth: Google OAuth + email+contraseña + magic link
- Software libre y gratuito — monetización por donaciones + sponsors transparentes
- MVP sin features sociales pesadas (posible "seguir" usuarios de forma pasiva)

### Session Setup

Sesión enfocada en expandir y enriquecer el concepto de Cardenal más allá del copy inicial, buscando diferenciación frente a competidores establecidos (Ultimate Guitar, Tus Acordes, La Cuerda, JustChords, Cifra Club) y descubriendo oportunidades no exploradas.

## Selección de Técnicas

**Enfoque:** Técnicas recomendadas por IA
**Contexto de análisis:** Diferenciación competitiva + innovación de producto

**Técnicas seleccionadas:**

- **Cross-Pollination (creative):** Transferir soluciones de otras industrias (apps de escritura, cocina, diseño, estudio)
- **SCAMPER Method (structured):** 7 lentes sistemáticas sobre features existentes y de la competencia
- **Assumption Reversal (deep):** Cuestionar supuestos fundamentales del concepto

## Ejecución de Técnicas — Inventario Completo de Ideas

### Fase 1: Cross-Pollination (12 ideas)

**[Cross-Pollination #1]**: Sintaxis inline de acordes estilo JustChords
_Concepto_: Usar sintaxis `Pal[G]abra` para posicionar acordes sobre sílabas. El editor interpreta los corchetes y renderiza el acorde arriba.
_Novedad_: Elimina el dolor de alinear líneas de acordes con líneas de letra.

**[Cross-Pollination #2]**: Modo Play-Along con auto-scroll
_Concepto_: Modo pantalla completa donde la canción scrollea automáticamente a un BPM configurable. Sincronizable con el metrónomo integrado.
_Novedad_: El scroll sincronizado al tempo del metrónomo.

**[Cross-Pollination #3]**: Canciones similares
_Concepto_: Sección de canciones similares basada en progresión armónica, tonalidad o género. Descubrimiento a nivel canción.
_Novedad_: Diferenciador de discovery que Ultimate Guitar no resuelve bien.

**[Cross-Pollination #4]**: Editor de bloques musicales estilo Notion
_Concepto_: Empezás escribiendo en blanco, podés transformar cualquier bloque en Verso, Coro, Puente, Intro, Solo, Tab, etc. Slash commands o menú contextual.
_Novedad_: Estructura sin imponer formulario rígido.

**[Cross-Pollination #5]**: Bloques reusables / repetición de secciones
_Concepto_: El Coro se referencia, no se copia. Un bloque "Repetir: Coro" que renderiza la sección completa en el preview pero ocupa una línea en el editor.
_Novedad_: Ningún cancionero resuelve bien la repetición.

**[Cross-Pollination #6]**: Notas personales sobre canciones ajenas
_Concepto_: Capa personal de anotaciones sobre canciones públicas (técnica, rasgueo, notas de práctica) sin modificar la original. Como highlights de Kindle.
_Novedad_: Ningún cancionero online tiene esto.

**[Cross-Pollination #7]**: Transposición instantánea de tonalidad
_Concepto_: Botón para subir/bajar medio tono. Los acordes se recalculan automáticamente.
_Novedad_: Table stakes pero mejor implementado con sintaxis inline.

**[Cross-Pollination #8]**: Modo Play-Along con blur progresivo (Apple Music Lyrics)
_Concepto_: Solo la sección/renglón actual se muestra nítido. Lo siguiente está blureado. Transición por sección con animación suave.
_Novedad_: Experiencia de karaoke refinada, no teleprompter.

**[Cross-Pollination #9]**: Sincronización temporal opcional (timestamps)
_Concepto_: El autor puede marcar timestamps en cada sección. Si presentes, el Play-Along sincroniza transiciones con la canción real. Fallback a auto-scroll por BPM.
_Novedad_: Archivos .lrc pero para cancionero con acordes. Totalmente opcional.

**[Cross-Pollination #10]**: Modos de pantalla completa configurables
_Concepto_: Toggles: auto-scroll ON/OFF, blur ON/OFF, metrónomo ON/OFF. El usuario arma su experiencia de práctica.
_Novedad_: Control al músico en vez de imponer un solo modo.

**[Cross-Pollination #11]**: Drag & drop de bloques de sección
_Concepto_: Las secciones se reordenan arrastrándolas. Edición estructural, no textual.
_Novedad_: Ningún cancionero tiene esto.

**[Cross-Pollination #12]**: Estética hand-drawn tipo Excalidraw
_Concepto_: Trazos a mano en bordes, separadores, iconos, diagramas de acordes. Identidad paper-and-pencil.
_Novedad_: Diferenciador visual inmediato. Cardenal se siente artesanal.

### Fase 2: SCAMPER Method (25 ideas)

**S — Sustituir:**

**[SCAMPER-S #13]**: Navegación fluida (sin modelo lineal de JustChords)
_Concepto_: Navegación directa desde cualquier punto. Barra de búsqueda siempre presente, breadcrumbs, accesos directos.
_Novedad_: Navegación web moderna vs. lógica de app móvil vieja.

**[SCAMPER-S #14]**: Modelo donación pura (anti-Ultimate Guitar)
_Concepto_: Cero publicidad, cero tiers pagos, cero features bloqueadas. Todo gratis. Solo donaciones voluntarias.
_Novedad_: Posicionamiento radical como software libre.

**[SCAMPER-S #15]**: Una canción, un dueño (anti-La Cuerda)
_Concepto_: Cada canción tiene un solo autor/transcriptor. Sin versiones múltiples con ratings.
_Novedad_: Simplifica radicalmente el modelo de contenido.

**[SCAMPER-S #16]**: App-como-herramienta (anti-Cifra Club)
_Concepto_: La home es canciones y herramientas, no marketing ni suscripciones. El usuario llega y usa.
_Novedad_: La app existe para el músico, no para monetizar al músico.

**[SCAMPER-S #17]**: Simple con personalidad (anti-Tus Acordes)
_Concepto_: Misma simpleza funcional pero con alma visual. Estética hand-drawn, cardenal amarillo, paleta cálida.
_Novedad_: Simple no significa aburrido.

**C — Combinar:**

**[SCAMPER-C #18]**: Perfil + cancioneros personalizados
_Concepto_: El perfil muestra cancioneros curados ("Fogón", "Set en vivo", "Aprendiendo"). Identidad musical organizada.
_Novedad_: Cancioneros como pieza central del perfil.

**[SCAMPER-C #19]**: Sugerencias de mejora por bloque (Pull Request musical)
_Concepto_: Cualquier usuario sugiere mejoras a bloques específicos. El autor revisa y acepta/rechaza. Colaboración controlada.
_Novedad_: Resuelve el problema de versiones de forma elegante. Una sola fuente de verdad.

**[SCAMPER-C #20]**: Personalización de vista + exportación configurable
_Concepto_: Elegir qué ver: solo letra, letra+acordes, +tabs, +notas. Esa configuración se usa para exportar. Lo que ves = lo que exportás.
_Novedad_: Exportación flexible vs. formato fijo.

**A — Adaptar:**

**[SCAMPER-A #21]**: Historial de cambios de canción
_Concepto_: Cada edición queda registrada. Volver a versiones anteriores. El "git log" de la canción.
_Novedad_: Ningún cancionero tiene versionado.

**[SCAMPER-A #22]**: Modo lectura limpia (Reader Mode)
_Concepto_: Un click y desaparece toda la UI. Solo la canción en pantalla. Para el músico con el celular en el atril.
_Novedad_: Base del Play-Along y también funciona estático.

**[SCAMPER-A #23]**: Cancioneros como setlists
_Concepto_: Orden de temas, tonalidad elegida por tema (transposición automática), notas de performance. Metadata de músico en vivo.
_Novedad_: Playlist digital + hoja de setlist real.

**[SCAMPER-A #24]**: Modo práctica de secciones difíciles (Anki)
_Concepto_: Marcar secciones difíciles y loopear solo esas partes. Práctica focalizada.
_Novedad_: Herramienta de práctica integrada en el cancionero.

**[SCAMPER-A #25]**: Colecciones rápidas de favoritos
_Concepto_: Guardar en sub-colecciones sin crear cancionero formal. "Guardar en..." con etiquetas.
_Novedad_: Capa intermedia entre "me gusta" y "cancionero curado".

**[SCAMPER-A #26]**: Modo offline vía PWA
_Concepto_: Service Workers cachean contenido para acceso sin internet. Crucial en Argentina.
_Novedad_: Cancioneros online son 100% online. Esto es diferenciador enorme.

**M — Modificar:**

**[SCAMPER-M #27]**: Diccionario de acordes con múltiples posiciones + preferencias
_Concepto_: Todas las posiciones en el mástil. El usuario elige y Cardenal recuerda la preferencia.
_Novedad_: Personalización real para el nivel del músico.

**[SCAMPER-M #28]**: Tres estados de publicación (Draft / Link compartido / Publicado)
_Concepto_: Compartir borrador por link antes de publicar. Feedback antes de hacer público.
_Novedad_: Nadie tiene esto en cancioneros.

**[SCAMPER-M #29]**: Compartir sección como imagen (Spotify Share)
_Concepto_: Seleccionar sección → generar imagen estilizada con estética Cardenal para Stories/WhatsApp. Watermark sutil del cardenal.
_Novedad_: Marketing orgánico. Cada imagen compartida lleva la marca.

**P — Poner otro uso:**

**[SCAMPER-P #30]**: Constructor de acordes personalizados
_Concepto_: Editor visual para dibujar posiciones de dedos en el mástil. Acordes custom como bloques insertables. Para afinaciones alternativas y digitaciones propias.
_Novedad_: Diccionario extendible por el usuario.

**E — Eliminar:**

**[SCAMPER-E #31]**: Probar editor sin registro (localStorage)
_Concepto_: Crear canciones sin cuenta, guardadas localmente. Login solo al publicar o sincronizar.
_Novedad_: Cero fricción para probar el editor.

**[SCAMPER-E #32]**: Herramientas como overlay (no sección separada)
_Concepto_: Afinador, metrónomo y diccionario accesibles desde cualquier pantalla como paneles.
_Novedad_: Compañeros constantes, no secciones aisladas.

**[SCAMPER-E #33]**: T&C distribuida (no página separada)
_Concepto_: Info legal donde es relevante. Privacidad junto al login, datos en perfil, licencia en footer.
_Novedad_: La info llega donde importa.

**[SCAMPER-E #34]**: Sin comentarios
_Concepto_: Sugerencias por bloque reemplazan lo útil de comentarios. El resto es ruido.
_Novedad_: Colaboración canalizada, no genérica.

**[SCAMPER-E #35]**: Sin descarga de "solo acordes"
_Concepto_: La personalización de vista (#20) es más flexible que exportaciones parciales.

**[SCAMPER-E #36]**: Sin FAQs
_Concepto_: Si necesitás FAQ, tu diseño falló. Formularios de contacto cubren el resto.

**[SCAMPER-E #37]**: Sin simplificación de acordes
_Concepto_: La canción se respeta como fue transcrita. Postura artística.

**R — Revertir / Reorganizar:**

**[SCAMPER-R #38]**: Home = cancionero personal (para logueados)
_Concepto_: La home muestra tus canciones y actividad. Explorar es secundario. No logueados ven contenido popular.
_Novedad_: "Herramienta personal" vs. "portal de contenido".

**[SCAMPER-R #39]**: Set inicial de canciones curadas
_Concepto_: Catálogo base de clásicos argentinos/latam ya cargados. Valor desde el día uno.
_Novedad_: Resuelve el problema del huevo y la gallina.

**[SCAMPER-R #40]**: Canción primero, artista como metadata
_Concepto_: Navegación prioriza canciones. El artista es un tag, no una categoría.
_Novedad_: El músico piensa en canciones, no en discografías.

**[SCAMPER-R #41]**: Sandbox de canción ajena
_Concepto_: Abrir editor sobre canción pública como copia temporal. Experimentar sin modificar la original.
_Novedad_: Invita a experimentar en vez de solo leer.

**[SCAMPER-R #42]**: Búsqueda siempre visible estilo Spotlight
_Concepto_: Desde cualquier pantalla, empezás a tipear. Canciones, artistas, acordes, herramientas — todo indexado.
_Novedad_: Elimina clicks. 2 segundos para encontrar cualquier cosa.

**[SCAMPER-R #43]**: Canción como objeto vivo
_Concepto_: Historial, sugerencias, notas personales, stats de práctica. La canción crece con el uso.
_Novedad_: Canciones con vida vs. páginas muertas.

**[SCAMPER-R #44]**: Botón "Tocar" prominente
_Concepto_: Al abrir canción, acción principal es el modo Play-Along. Tocar primero, leer después.
_Novedad_: Priorizar la acción del músico.

**[SCAMPER-R #45]**: BPM y compás como metadata de canción
_Concepto_: Cada canción guarda BPM y compás. El metrónomo viene pre-configurado al abrirse desde esa canción.
_Novedad_: Metadata musical útil integrada.

### Fase 3: Assumption Reversal (26 ideas)

**[Assumption Reversal #46]**: Mobile-first
_Concepto_: Invertir de desktop-first a mobile-first. El músico toca con el celular al lado. El editor puede ser más cómodo en desktop pero la experiencia de consumo se diseña para mobile primero.
_Novedad_: Cambia fundamentalmente las decisiones de UI.

**[Assumption Reversal #47]**: Herramientas context-aware con toggle
_Concepto_: Las herramientas detectan qué canción estás viendo y se adaptan. Un click para desactivar el contexto y volver al modo genérico.
_Novedad_: Asistentes de práctica inteligentes sin forzar al usuario.

**[Assumption Reversal #48]**: Auth expandida (Google + email + magic link)
_Concepto_: Tres métodos de autenticación. Más inclusivo, no depende de un solo proveedor.
_Novedad_: Revierte el supuesto de "solo Google".

**[Assumption Reversal #49]**: Seguir usuarios (social mínimo pasivo)
_Concepto_: Seguir sin feed, sin notificaciones push, sin mensajes. Canciones nuevas de seguidos aparecen en home.
_Novedad_: Capa social mínima para descubrimiento.

**[Assumption Reversal #50]**: Transcriptor como autor, sin garantía de fidelidad
_Concepto_: El dueño es quien transcribe. Metadata del artista original pero Cardenal no garantiza fidelidad.
_Novedad_: Postura honesta que ningún cancionero aclara.

**[Assumption Reversal #51]**: Sistema de calidad por calificaciones
_Concepto_: Calificaciones de usuarios. Baja calificación + sugerencias sin resolver = menor visibilidad o notificación al autor. Incentivos de calidad.
_Novedad_: Reputación sobre una sola versión vs. versiones compitiendo.

**[Assumption Reversal #52]**: Exploración por mood/vibe
_Concepto_: Tags de momento: "Fogón", "Melancolía", "Para cantar fuerte". Contextos de uso, no géneros.
_Novedad_: Descubrimiento emocional que nadie tiene.

**[Assumption Reversal #53]**: Exploración por dificultad
_Concepto_: Dificultad calculable automáticamente: cantidad de acordes, cejilla, complejidad. Sin carga manual.
_Novedad_: Inferida de la canción misma.

**[Assumption Reversal #54]**: Botón "Tocame algo" (random)
_Concepto_: Canción al azar de favoritos, cancioneros o populares. Cero fricción para el indeciso.
_Novedad_: Simple, divertido, alineado con la identidad cálida.

**[Assumption Reversal #55]**: Descubrimiento por swipes (Tinder)
_Concepto_: Si hay suficiente metadata, modo de descubrimiento por swipes. Título, artista, acordes, dificultad. Derecha = guardar, izquierda = pasar.
_Novedad_: Gamifica el descubrimiento musical. Nadie lo hizo con canciones.

**[Assumption Reversal #56]**: Sin campo de idioma en canciones
_Concepto_: La canción no tiene idioma asignado. El contenido es texto libre. Sin restricciones.
_Novedad_: Más simple e inclusivo.

**[Assumption Reversal #57]**: Canciones instrumentales / solo tabs
_Concepto_: Una canción puede no tener letra. Solo tabs, solo acordes, o combinaciones. Bloques flexibles.
_Novedad_: Abre al público de guitarristas que practican riffs, solos, fingerpicking.

**[Assumption Reversal #58]**: Exportación a imagen completa
_Concepto_: Canción entera como imagen larga con estética Cardenal. Para carrete, redes, WhatsApp.
_Novedad_: Dos niveles: fragmento (#29) e imagen completa.

**[Assumption Reversal #59]**: Exportación a .txt con sintaxis inline
_Concepto_: Texto plano con sintaxis `Pal[G]abra`. Universal, copiable, funciona como backup.
_Novedad_: Potencial formato estándar de intercambio.

**[Assumption Reversal #60]**: Importar canciones desde .txt
_Concepto_: Importar archivos .txt con sintaxis inline. Migración instantánea.
_Novedad_: Onboarding de contenido para músicos con cancionero en texto.

**[Assumption Reversal #61]**: Popularidad por interacción
_Concepto_: Ranking por favoritos, guardados y calificaciones — no page views. Uso real del músico.
_Novedad_: Surfacea canciones que la gente realmente toca.

**[Assumption Reversal #62]**: Editor WYSIWYG inline
_Concepto_: Sin split-screen ni tabs. Escribís con sintaxis cruda, al salir del bloque se renderiza en vivo. Click para editar. Como Notion.
_Novedad_: Elimina complejidad de split-screen. Experiencia unificada ideal para mobile-first.

**[Assumption Reversal #63]**: Calculadora de tonalidad
_Concepto_: Ingresás progresión → te dice tonalidad. Herramienta educativa simple.
_Novedad_: Acerca la teoría musical sin intimidar.

**[Assumption Reversal #64]**: Generador de progresiones
_Concepto_: Elegís tonalidad → muestra progresiones comunes. Inspiración para composición.
_Novedad_: Conecta cancionero con composición.

**[Assumption Reversal #65]**: Detector de BPM por tap
_Concepto_: Tap al ritmo → calcula tempo → metrónomo arranca a ese tempo. Integrado en el metrónomo.
_Novedad_: Flujo natural: detectar → practicar.

**[Assumption Reversal #66]**: Sponsors transparentes
_Concepto_: Marcas de música sponsorean con crédito visible y no invasivo. Modelo open source sponsorship.
_Novedad_: Monetización alineada con la comunidad. El anti-ads.

**[Assumption Reversal #67]**: SEO agresivo
_Concepto_: Cada canción pública indexable con URL limpia, meta tags, structured data. Astro facilita SSR/SSG nativo.
_Novedad_: Ventaja técnica real sobre SPAs pesadas de competidores.

**[Assumption Reversal #68]**: Widget embebible
_Concepto_: Embed/iframe para sitios externos. Profesores, foros, blogs. Renderiza con estética Cardenal + link de vuelta.
_Novedad_: Distribución fuera de la app. Cada embed es punto de entrada.

**[Assumption Reversal #69]**: Preview rico en WhatsApp/redes
_Concepto_: Open Graph tags bien armados. Card linda al compartir link. Crítico para Argentina donde todo se mueve por WhatsApp.
_Novedad_: Diferencia entre que alguien abra el link o lo ignore.

**[Assumption Reversal #70]**: Tipos de contenido: Canción, Riff, Ejercicio
_Concepto_: Además de canciones, Riffs (fragmentos cortos) y Ejercicios (escalas, patrones, práctica). Mismo editor, distinto tipo.
_Novedad_: Abre Cardenal a toda la práctica musical.

**[Assumption Reversal #71]**: El cardenal como personaje-guía
_Concepto_: La mascota es la voz de la app. Habla en estados vacíos, celebra logros, acompaña cargas, guía onboarding, aparece en errores. Ilustraciones hand-drawn. UI empática y amigable que genera simpatía.
_Novedad_: Diferenciador emocional masivo. Como Duolingo pero para músicos.

## Organización por Temas

### Tema 1: Editor y modelo de contenido
#1, #4, #5, #11, #30, #57, #62, #70

### Tema 2: Experiencia de práctica y Play-Along
#2, #8, #9, #10, #22, #24, #44, #45

### Tema 3: Herramientas musicales
#27, #32, #47, #63, #64, #65

### Tema 4: Navegación y descubrimiento
#3, #13, #40, #42, #52, #53, #54, #55, #61

### Tema 5: Colaboración y calidad
#6, #19, #21, #41, #50, #51

### Tema 6: Personalización y exportación
#7, #20, #25, #29, #58, #59, #60

### Tema 7: Identidad y experiencia emocional
#12, #16, #17, #71

### Tema 8: Modelo de acceso y autenticación
#14, #28, #31, #46, #48, #56, #66

### Tema 9: Distribución y crecimiento
#39, #67, #68, #69

### Tema 10: Perfiles y organización social
#15, #18, #23, #26, #34, #38, #43, #49

### Ideas eliminadas (decisiones de diseño)
#33 (T&C distribuida), #35 (sin "solo acordes"), #36 (sin FAQs), #37 (sin simplificación de acordes)

## Priorización

### Pilares fundamentales de Cardenal (definidos por Juan):

1. **Editor y modelo de contenido** — El diferenciador técnico central
2. **Herramientas musicales** — Valor inmediato para cualquier músico
3. **Software libre y gratuito** — El diferenciador filosófico

### Plan de acción — Prioridad 1: Editor de bloques WYSIWYG musical
**Por qué define a Cardenal:** Es lo que nadie tiene.

**Próximos pasos:**
1. Definir la sintaxis inline `Pal[G]abra` como spec técnica
2. Diseñar el sistema de bloques (Verso, Coro, Puente, Tab, Acorde personalizado, Riff)
3. Prototipar el WYSIWYG: editar en crudo → salir del bloque → renderiza
4. Implementar drag & drop de secciones
5. Implementar bloques reusables (repetir Coro sin copiar)

**Indicador de éxito:** Un músico puede crear una canción completa sin sentir que está llenando un formulario.

### Plan de acción — Prioridad 2: Herramientas musicales integradas
**Por qué define a Cardenal:** Valor desde el día uno, incluso sin cuenta.

**Próximos pasos:**
1. Afinador (Web Audio API + micrófono)
2. Metrónomo con BPM slider + detector de BPM por tap (misma herramienta)
3. Diccionario de acordes multi-instrumento con múltiples posiciones
4. Calculadora de tonalidad y generador de progresiones
5. Herramientas como overlay accesible desde cualquier pantalla
6. Context-aware con toggle opcional

**Indicador de éxito:** Un músico usa las herramientas de Cardenal en vez de apps separadas.

### Plan de acción — Prioridad 3: Software libre y gratuito
**Por qué define a Cardenal:** El anti-Ultimate Guitar.

**Próximos pasos:**
1. Definir licencia open source
2. Modelo de donaciones voluntarias (modal no invasivo con el cardenal)
3. Estructura para sponsors transparentes a futuro
4. Cero ads, cero tiers, cero features bloqueadas — siempre

**Indicador de éxito:** El README dice "gratis para siempre" y el código es público.

### Quick wins para MVP
- Sintaxis inline `[G]` con renderizado
- Transposición de tonalidad
- Búsqueda siempre visible
- Modo lectura limpia
- SEO agresivo (Astro nativo)
- Preview rico en WhatsApp (Open Graph tags)
- Auth con Google + email + magic link
- El cardenal como personaje en estados vacíos y errores

### Breakthrough concepts (diferenciadores a mediano plazo)
- Sugerencias por bloque — El GitHub de las canciones
- Modo Play-Along con blur — Experiencia de práctica premium
- Compartir como imagen — Marketing orgánico viral
- Exploración por mood/dificultad/swipes — Descubrimiento único
- Constructor de acordes personalizados — Para el músico avanzado
- El cardenal como personaje-guía — Identidad emocional inolvidable

## Resumen de Sesión e Insights

### Logros clave:
- 71 ideas generadas en 3 técnicas
- 10 temas organizados cubriendo todos los aspectos del producto
- 3 pilares fundamentales definidos con planes de acción
- Cambios estratégicos respecto al concepto original (mobile-first, WYSIWYG, auth expandida)
- Análisis competitivo profundo (Ultimate Guitar, Tus Acordes, La Cuerda, JustChords, Cifra Club)

### Decisiones de diseño tomadas durante la sesión:
- Mobile-first (no desktop-first)
- Editor WYSIWYG inline (no split-screen)
- Una canción = un dueño (no versiones múltiples)
- Sin comentarios (sugerencias por bloque)
- Sin FAQs, sin simplificación de acordes
- Contenido solo texto enriquecido (no multimedia)
- Transcriptor como autor, sin garantía de fidelidad

### Narrativa de facilitación creativa
Sesión altamente productiva con un usuario que tiene visión clara y fuerte instinto de producto. Juan descarta rápidamente features que agregan complejidad sin valor proporcional. Los mejores insights surgieron de Cross-Pollination (traer modelos de Notion, Apple Music Lyrics, Kindle al cancionero) y Assumption Reversal (mobile-first, WYSIWYG, tipos de contenido). El concepto de Cardenal evolucionó significativamente respecto al copy original, especialmente en editor, experiencia de práctica, y modelo de identidad con la mascota.
