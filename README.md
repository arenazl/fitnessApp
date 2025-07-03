# 🏋️ FitnessApp - React Fitness Tracker

Una aplicación de fitness moderna y completamente funcional creada con React y Tailwind CSS. Replica el diseño de aplicaciones fitness profesionales con animaciones fluidas y funcionalidad completa.

![Fitness App](https://img.shields.io/badge/React-18.2.0-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.3.2-blue) ![Status](https://img.shields.io/badge/Status-Complete-green)

## 🎯 Características Principales

### 📱 **4 Pantallas Completamente Funcionales:**

- **🏠 Home Screen**: Pantalla principal con estadísticas en tiempo real, calendario interactivo y objetivos diarios
- **📊 Progress Screen**: Seguimiento de progreso con gráficos circulares animados y estadísticas semanales
- **💪 Workout Screen**: Temporizador funcional, lista de ejercicios interactiva y seguimiento de progreso
- **👤 Profile Screen**: Perfil de usuario con estadísticas personales y configuraciones

### ✨ **Funcionalidades Avanzadas:**

- ⏱️ **Timer en tiempo real** con controles play/pause/reset
- 📈 **Gráficos animados** con datos interactivos
- 🎨 **Animaciones fluidas** en todas las transiciones
- 📱 **Navegación completa** con historial y botón de retroceso
- 🎯 **Seguimiento de objetivos** con progreso visual
- 💧 **Contador de agua** interactivo
- ✅ **Sistema de ejercicios** con marcado de completados

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework principal con hooks modernos
- **Tailwind CSS** - Framework de estilos utilitarios
- **Lucide React** - Iconos modernos y escalables
- **React Circular Progressbar** - Gráficos circulares animados
- **CSS Animations** - Animaciones personalizadas

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Clonar e Instalar

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/fitnessApp.git

# Navegar al directorio
cd fitnessApp

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm start
```

### Scripts Disponibles

```bash
npm start          # Inicia el servidor de desarrollo
npm build          # Construye para producción
npm test           # Ejecuta las pruebas
npm run eject      # Expone configuración de webpack
```

## 📱 Uso de la Aplicación

### 🏠 **Pantalla Principal (Home)**
- **Calendario**: Toca las fechas para seleccionar días
- **Contador de agua**: Haz clic en la tarjeta azul para añadir 0.1L
- **Objetivos**: Presiona "Start Now" para iniciar entrenamientos
- **Navegación rápida**: 3 botones de acceso directo

### 📊 **Pantalla de Progreso**
- **Gráfico circular**: Se anima automáticamente al 75%
- **Selector de período**: Dropdown para cambiar vista temporal
- **Gráfico de barras**: Hover para ver calorías específicas
- **Estadísticas**: Clickeables para navegación

### 💪 **Pantalla de Entrenamiento**
- **Timer**: Botón central para play/pause
- **Reset**: Botón superior derecho para reiniciar
- **Ejercicios**: Toca el círculo para marcar como completado
- **Progreso**: Anillo visual que se actualiza en tiempo real

### 👤 **Pantalla de Perfil**
- **Estadísticas personales**: Peso, altura, BMI
- **Historial**: Entrenamientos completados y calorías quemadas
- **Configuración**: Botones para editar y ajustes

## 🎨 Características de Diseño

### Paleta de Colores
```css
Azul Principal: #4A90E2 → #357ABD
Naranja: #FF8A50 → #FF6B35
Púrpura: #6B73FF → #9B59B6
Verde: #2ECC71 → #27AE60
```

### Animaciones
- **Transiciones de pantalla**: Fade + slide (300ms)
- **Hover effects**: Scale y shadow en botones
- **Progress animations**: Barras y círculos animados
- **Micro-interactions**: Feedback visual inmediato

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── HomeScreen.js          # Pantalla principal
│   ├── ProgressScreen.js      # Pantalla de progreso
│   ├── WorkoutScreen.js       # Pantalla de entrenamiento
│   ├── ProfileScreen.js       # Pantalla de perfil
│   └── BottomNavigation.js    # Navegación inferior
├── App.js                     # Componente principal
├── index.js                   # Punto de entrada
└── index.css                  # Estilos y animaciones
```

## 🔧 Personalización

### Modificar Colores
Edita `tailwind.config.js` para cambiar la paleta de colores:

```javascript
colors: {
  'blue-gradient-start': '#TU_COLOR',
  'blue-gradient-end': '#TU_COLOR',
  // ...más colores
}
```

### Añadir Ejercicios
En `WorkoutScreen.js`, modifica el array `exercises`:

```javascript
const exercises = [
  { name: 'Tu Ejercicio', reps: 'x20 Reps', icon: '🏋️', duration: 90 },
  // ...más ejercicios
];
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -m 'Añadir nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🎯 Roadmap

- [ ] Integración con APIs de fitness
- [ ] Autenticación de usuarios
- [ ] Base de datos para persistencia
- [ ] Notificaciones push
- [ ] Modo oscuro
- [ ] Más tipos de ejercicios
- [ ] Integración con wearables
- [ ] Compartir en redes sociales

## 📞 Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue o contactarme.

---

⭐ **¡Si te gusta este proyecto, dale una estrella!** ⭐ 