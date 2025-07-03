# Fitness App React

Una aplicación de fitness moderna creada con React y Tailwind CSS que replica el diseño mostrado en la imagen de referencia.

## 🎯 Características

- **4 Pantallas principales:**
  - **Home Screen**: Pantalla de inicio con saludo personalizado, calendario, estadísticas de agua y calorías, y objetivos diarios
  - **Progress Screen**: Pantalla de progreso con gráfico circular de progreso general y gráfico de barras de calorías quemadas
  - **Workout Screen**: Pantalla de entrenamiento con temporizador y lista de ejercicios
  - **Bottom Navigation**: Navegación inferior con iconos interactivos

- **Diseño moderno y responsivo**
- **Colores y gradientes personalizados**
- **Componentes reutilizables**
- **Animaciones suaves**

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework principal
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconos modernos
- **React Circular Progressbar** - Gráficos circulares de progreso
- **React Router DOM** - Navegación (opcional)

## 🚀 Instalación y Ejecución

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de instalación

1. **Clona o descarga el proyecto**
   ```bash
   cd fitness-app-react
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**
   ```bash
   npm start
   ```

4. **Abre tu navegador**
   - Ve a `http://localhost:3000`
   - La aplicación se abrirá automáticamente

## 📱 Estructura del Proyecto

```
src/
├── components/
│   ├── HomeScreen.js          # Pantalla principal con estadísticas y objetivos
│   ├── ProgressScreen.js      # Pantalla de progreso con gráficos
│   ├── WorkoutScreen.js       # Pantalla de entrenamiento con timer
│   └── BottomNavigation.js    # Navegación inferior
├── App.js                     # Componente principal con routing
├── index.js                   # Punto de entrada
└── index.css                  # Estilos globales con Tailwind
```

## 🎨 Características del Diseño

### Colores Personalizados
- **Azul**: `#4A90E2` - `#357ABD` (gradiente)
- **Naranja**: `#FF8A50` - `#FF6B35` (gradiente)
- **Púrpura**: `#6B73FF` - `#9B59B6` (gradiente)
- **Verde**: `#2ECC71` - `#27AE60` (gradiente)

### Componentes Destacados
- **Tarjetas con sombras suaves**
- **Botones con gradientes**
- **Navegación con estados activos**
- **Gráficos circulares animados**
- **Gráficos de barras interactivos**

## 📱 Pantallas

### 1. Home Screen
- Saludo personalizado con avatar
- Calendario semanal con fecha seleccionada
- Estadísticas de agua y calorías
- Tarjetas de objetivos (Running y Cycling)

### 2. Progress Screen
- Gráfico circular de progreso general (75%)
- Gráfico de barras semanal de calorías quemadas
- Estadísticas adicionales en la parte inferior

### 3. Workout Screen
- Temporizador de entrenamiento (0:12:25)
- Lista de ejercicios con iconos
- Botón de play/pause interactivo
- Progreso del entrenamiento

### 4. Bottom Navigation
- 4 iconos de navegación
- Estados activos e inactivos
- Transiciones suaves

## 🔧 Personalización

Para personalizar la aplicación:

1. **Colores**: Modifica `tailwind.config.js`
2. **Componentes**: Edita los archivos en `/src/components/`
3. **Datos**: Cambia los datos mock en cada componente
4. **Estilos**: Ajusta las clases de Tailwind según tus necesidades

## 📦 Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm eject` - Expone la configuración de webpack

## 🤝 Contribución

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🎯 Próximas Características

- [ ] Integración con APIs de fitness
- [ ] Autenticación de usuarios
- [ ] Almacenamiento local de datos
- [ ] Notificaciones push
- [ ] Modo oscuro
- [ ] Más tipos de gráficos
- [ ] Integración con dispositivos wearables 