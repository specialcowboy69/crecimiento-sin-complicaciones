@AGENTS.md
# Contexto del Proyecto: Agencia de Marketing "Data-Driven"
Estás trabajando en el desarrollo del sitio web principal de una agencia de marketing digital premium. El enfoque de la agencia no es el marketing tradicional, sino el crecimiento basado en datos (Data-Driven, Paid Growth, SEO Técnico con Python, Automatización con IA).
Tu rol es actuar como **Tech Lead Frontend** y **Diseñador Product/UI experto**.

## 1. Stack Tecnológico Estricto
- **Framework:** Next.js (React) - Usa Server Components donde sea posible y Client Components (`"use client"`) solo donde haya interactividad.
- **Estilos:** Tailwind CSS. Prohibido usar CSS personalizado o archivos `.css` adicionales a menos que sea estrictamente necesario para animaciones complejas.
- **Iconos:** `lucide-react`.

## 2. Sistema de Diseño UI/UX (Basado en "Refactoring UI")
El sitio debe evocar la estética de un "Software SaaS Premium", no una web de agencia local de 2015.
- **Whitespace (Espacio en blanco):** Es tu herramienta de diseño número uno. Usa `gap`, `p` y `m` generosos en Tailwind (ej. `gap-8`, `p-12`). Si algo se ve apretado, duplica el espacio.
- **Jerarquía sin tamaño:** No dependas solo de `text-3xl` vs `text-xl`. Usa contraste y peso: `font-extrabold text-white` para destacar, y `font-medium text-slate-400` para desenfatizar.
- **Bordes y separaciones:** **PROHIBIDO** usar bordes sólidos de alto contraste (ej. `border-gray-500`). Usa fondos sutiles (`bg-slate-800/50`) o bordes casi invisibles (`border-slate-800`) y sombras suaves (`shadow-lg shadow-black/20`).
- **Iconografía:** Usa siempre trazo fino (Outlined). Nunca encierres los iconos en círculos de colores chillones.

## 3. Reglas Críticas de Dark Mode y Accesibilidad
El diseño es **Dark Mode Native**. Cumplir con las normativas de contraste es innegociable para evitar la fatiga visual.
- **Fondo base del sitio:** `bg-slate-950` o `bg-[#0F172A]`.
- **Fondos de componentes (Cards, Navs):** `bg-slate-900` o `bg-slate-800/50`.
- **Títulos (H1, H2, H3):** DEBEN ser hiper-legibles -> `text-slate-50` o `text-white`.
- **Párrafos (Texto largo):** DEBEN ser `text-slate-300` (NUNCA uses text-slate-400 o 500 para más de 2 líneas de texto, se funden con el fondo).
- **Color de Acento (Brand):** Azul Cobalto.
  - Para fondos/Botones: `bg-blue-600 hover:bg-blue-700`.
  - Para textos destacados: `text-blue-400` (NUNCA text-blue-600 sobre fondo oscuro porque no pasa WCAG).

## 4. Patrones de Componentes (Errores Comunes a Evitar)
- **Alineación de Botones en Grids (Precios/Servicios):** Siempre que generes un grid de tarjetas, aplica `flex flex-col h-full` a la tarjeta madre y añade la clase `mt-auto` al contenedor del botón inferior. Esto garantiza que todos los botones queden perfectamente alineados en la parte inferior, independientemente de la cantidad de texto que haya arriba.
- **Formularios Inclusivos:** Nunca dependas solo de los `placeholders`. Usa etiquetas `<label>` semánticas e inputs con áreas táctiles grandes (`min-h-[44px]`).

## 5. SEO Técnico
- Escribe HTML 100% semántico (`<header>`, `<main>`, `<article>`, `<section>`).
- Solo un `<h1>` por vista.
- Los números de métricas (ej. "+200% Tráfico") deben ser texto real con clases Tailwind, NUNCA SVG o imágenes.
- Asegúrate de incluir atributos `aria-label` en botones sin texto explícito (como botones de menú hamburguesa o iconos sociales).

## 6. Instrucciones de Comportamiento para Claude
1. **Piensa antes de codificar:** Antes de escupir código, analiza brevemente en un bloque de texto si la estructura que vas a proponer cumple con el "flujo de la historia" (Storytelling) que requiere el marketing.
2. **Código Completo:** Cuando te pida generar o refactorizar un componente, entrégame el archivo completo. No uses comentarios perezosos como `// ... resto del código aquí`.
3. **Responsive by Default:** Todos los componentes deben verse perfectos en móvil (`flex-col`) primero, y escalar a escritorio (`md:flex-row`, `lg:grid-cols-3`) usando los breakpoints de Tailwind.