# AI-ChatBot: Sistema Multi-Agente con CrewAI

Este proyecto implementa un sistema multi-agente utilizando CrewAI para realizar investigaciones automatizadas sobre tecnologías y áreas de negocio específicas.

## 🏗️ Estructura del Proyecto

```
.
├── backend/                 # Servidor Flask y lógica de agentes
│   ├── agents.py           # Definición de agentes de investigación
│   ├── api.py              # Endpoints de la API REST
│   ├── crews.py            # Configuración de crews de agentes
│   ├── log_manager.py      # Sistema de logging y eventos
│   ├── models.py           # Modelos de datos
│   ├── tasks.py            # Definición de tareas para los agentes
│   └── tools/              # Herramientas personalizadas para los agentes
│       └── youtube_search_tools.py
│
├── frontend/               # Aplicación Next.js
│   ├── app/               # Páginas y rutas
│   ├── components/        # Componentes React
│   │   ├── EventLog.tsx
│   │   ├── FinalOutput.tsx
│   │   ├── Header.tsx
│   │   └── InputSection.tsx
│   ├── hooks/             # Custom hooks
│   │   └── useCrewOutput.tsx
│   └── public/            # Archivos estáticos
│
└── requirements.txt        # Dependencias de Python
```

## 🚀 Características Principales

- **Sistema Multi-Agente**: Utiliza CrewAI para coordinar múltiples agentes de IA
- **Investigación Automatizada**: Búsqueda de artículos y videos sobre tecnologías específicas
- **API REST**: Backend en Flask con endpoints para gestionar las investigaciones
- **Interfaz Web**: Frontend en Next.js con Tailwind CSS para una experiencia de usuario moderna
- **Logging en Tiempo Real**: Sistema de eventos para monitorear el progreso de las investigaciones

## 🛠️ Tecnologías Utilizadas

### Backend
- Python 3.x
- Flask
- CrewAI
- LangChain
- OpenAI GPT-4

### Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS

## 🚀 Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/arklon1975/AI-ChatBot.git
cd AI-ChatBot
```

2. Configurar el backend:
```bash
cd backend
pip install -r requirements.txt
```

3. Configurar el frontend:
```bash
cd frontend
npm install
```

4. Configurar variables de entorno:
Crear un archivo `.env` en el directorio `backend` con:
```
OPENAI_API_KEY=tu_api_key
SERPER_API_KEY=tu_api_key
```

## 🏃‍♂️ Ejecución

1. Iniciar el backend:
```bash
cd backend
python api.py
```

2. Iniciar el frontend:
```bash
cd frontend
npm run dev
```

## 📝 Uso

1. Accede a la aplicación en `http://localhost:3000`
2. Ingresa las tecnologías y áreas de negocio que deseas investigar
3. El sistema coordinará los agentes para:
   - Buscar artículos relevantes
   - Encontrar videos de YouTube relacionados
   - Compilar los resultados en un formato estructurado

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📧 Contacto

Para preguntas o sugerencias, por favor abre un issue en el repositorio.
