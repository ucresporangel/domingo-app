# Hice algo para ti 💌

Mini-app interactiva para invitar a alguien a una cita — React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion. Estática, sin backend, pensada para GitHub Pages.

## Correr el proyecto en local

```bash
npm install
npm run dev
```

Abre la URL que te muestre la terminal (normalmente `http://localhost:5173`). Para probar bien en iPhone/Safari, usa la IP de tu red local que Vite también imprime (algo como `http://192.168.x.x:5173`) y ábrela desde el iPhone conectado al mismo WiFi.

## ⚠️ Antes de desplegar: un solo detalle importante

En `vite.config.ts` hay esta línea:

```ts
base: '/domingo-app/',
```

**Debe coincidir exactamente con el nombre de tu repositorio de GitHub.** Si tu repo se va a llamar distinto (por ejemplo `invitacion-domingo`), cambia esa línea a `base: '/invitacion-domingo/'` antes de hacer el build. Si no coinciden, la página se verá "rota" (sin estilos, sin fuentes) al publicarse.

## Cómo subirlo a GitHub y publicarlo con GitHub Pages

### 1. Crea el repositorio en GitHub

Ve a [github.com/new](https://github.com/new), ponle un nombre (ej. `domingo-app`) y créalo **vacío** (sin README, sin .gitignore — ya los tenemos aquí). Puede ser público o privado; con cuenta gratuita el repo debe ser público para que Pages funcione sin plan de pago.

### 2. Sube tu código

Desde la carpeta del proyecto (`domingo-app/`), en la terminal:

```bash
git init
git add .
git commit -m "Primer commit: la invitación"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
git push -u origin main
```

Reemplaza `TU-USUARIO/TU-REPO` por tu usuario y el nombre real del repositorio.

### 3. Instala la herramienta de despliegue

```bash
npm install -D gh-pages
```

Y agrega este script a tu `package.json`, dentro de `"scripts"`:

```json
"deploy": "npm run build && gh-pages -d dist"
```

### 4. Despliega

```bash
npm run deploy
```

Esto compila el proyecto y sube automáticamente la carpeta `dist/` a una rama especial llamada `gh-pages` en tu repositorio.

### 5. Activa GitHub Pages

1. En GitHub, entra a tu repositorio → **Settings** → **Pages** (en el menú de la izquierda).
2. En **"Build and deployment" → Source**, selecciona **"Deploy from a branch"**.
3. En **Branch**, elige `gh-pages` y la carpeta `/ (root)`. Guarda.
4. Espera 1-2 minutos. Tu link quedará en:

```
https://TU-USUARIO.github.io/TU-REPO/
```

Ese es el link que le compartes a ella. Ábrelo tú primero desde tu propio iPhone para revisar que todo se vea y se sienta bien antes de mandarlo.

### Actualizar después de un cambio

Cada vez que edites algo y quieras republicar:

```bash
git add .
git commit -m "Ajuste al texto de la pantalla 6"
git push
npm run deploy
```

## Estructura del proyecto

```
src/
├── App.tsx                 # Máquina de estados de las 8 escenas
├── flow/                   # Control del flujo y transición entre escenas
├── scenes/                 # Las 8 pantallas (Greeting, Confession, juegos, etc.)
├── components/
│   ├── ui/                    # Botones, tarjetas, texto animado, corazones de fondo
│   ├── game/                   # Piezas de los mini-juegos
│   └── EscapingNoButton.tsx    # El botón "No" que huye
├── hooks/                   # useReducedMotion, useViewportBounds
├── lib/                     # confetti.ts, audio.ts, safeArea.ts
└── data/planCards.ts        # Las 6 actividades del domingo — edítalas aquí
```

Si en algún momento cambia algo del plan del domingo (agregas o quitas una actividad), solo edita `src/data/planCards.ts` — no hace falta tocar ningún componente.

## Accesibilidad y detalles técnicos ya cubiertos

- Respeta `prefers-reduced-motion`: con esa opción activa en el iPhone, el botón "No" deja de huir (solo tiembla y avisa) y las animaciones colapsan a fades simples.
- Foco visible por teclado/VoiceOver en todos los botones.
- Todo el layout respeta el notch/Dynamic Island vía `env(safe-area-inset-*)`.
- El progreso de la historia se guarda en `sessionStorage`: si ella recarga la página a la mitad, no tiene que rejugar los mini-juegos.
