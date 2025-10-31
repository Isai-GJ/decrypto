# Decrypto - Aplicación de Ayuda

¡Bienvenido a la aplicación de ayuda para Decrypto! Una adaptación digital de los componentes del popular juego de mesa de deducción y comunicación, perfecto para jugar con amigos. Este proyecto está construido con HTML, CSS y JavaScript puro, ofreciendo una experiencia fluida directamente en tu navegador.

**👉 [¡Juega ahora!](https://isai-gj.github.io/decrypto/) 👈**

## Resumen del Proyecto

Esta es una herramienta web interactiva diseñada para facilitar las partidas del juego de mesa Decrypto. La aplicación gestiona automáticamente la generación de palabras clave, la creación de códigos secretos y el seguimiento de los puntos de intercepción y mala comunicación, todo a través de una interfaz sencilla y amigable.

## 룰 Reglas del Juego (y cómo usar la app)

El objetivo en Decrypto es dar pistas a tus compañeros de equipo para que adivinen un código numérico secreto, sin que el equipo contrario intercepte el mensaje.

### Modo Palabras (Pantalla Principal del Equipo)

Este modo simula la pantalla de un equipo.

1.  **Configuración**: Al iniciar, haz clic en **"Generar Nuevas Palabras"**. La aplicación mostrará 4 palabras, cada una asociada a un número del 1 al 4. Estas son las palabras clave de tu equipo para toda la partida.

2.  **Rondas**: En cada ronda, un miembro de tu equipo (el "Codificador") recibe un código secreto de 3 números (ej. 2-4-1). El codificador debe dar una pista para cada número del código, intentando que sus compañeros adivinen el código correcto.

3.  **Contadores**:
    *   **Mala Comunicación**: Si tu equipo no adivina el código correcto, suma un punto de "Mala Comunicación" usando el botón `+`. Con 2 de estos, pierdes la partida.
    *   **Intercepción**: Si el equipo contrario adivina tu código, suma un punto de "Intercepción" para ellos. Con 2 de estos, el equipo contrario gana la partida.

4.  **Temporizador**: Usa el botón **"Timer"** en cuanto tu equipo termina de escribir sus pistas (30 segundos), tal como en el juego de mesa.

5.  **Cambio de Equipo**: El botón **"Equipo: Negro/Blanco"** en el menú principal te permite cambiar el tema de la interfaz para que coincida con el color de tu equipo.

### Modo Código (Generador de Códigos)

Este modo reemplaza las cartas de código del juego físico.

1.  **Generar Código**: Haz clic en **"Generar Nuevo Código"**. Se creará un código de 3 dígitos (del 1 al 4).

2.  **Revelar Código**: El codificador de turno debe mantener presionada la tarjeta con el signo `?` para ver el código secreto que debe comunicar a su equipo. Al soltar, el código se ocultará de nuevo.

### Flujo de una Partida

1.  Cada equipo abre la aplicación en su propio dispositivo.
2.  Ambos equipos van a **"Palabras"** y generan sus 4 palabras clave.
3.  En el turno del Equipo Blanco, su codificador usa un tercer dispositivo en modo **"Código"** para ver el código secreto de la ronda.
4.  El codificador del Equipo Negro da sus 3 pistas.
5.  Ambos equipos intentan adivinar el código.
6.  Se resuelven los aciertos y fallos, y se actualizan los contadores de **"Intercepción"** o **"Mala Comunicación"** si es necesario.
7.  Se pasa el turno al Equipo Negro, repitiendo el proceso.

**Fin del Juego**: La partida termina cuando un equipo acumula 2 fichas de Intercepción (y gana) o 2 fichas de Mala Comunicación (y pierde).

---

Desarrollado por Isai-GJ.