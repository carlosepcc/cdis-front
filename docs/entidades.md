## Entidades:

### Usuario

- id\*
- username: String\*
- password: String
- name: String
- lastname: String
- roles: Array (Enum ("Administrador" | "Coordinador de calidad" | "Asesor de calidad" | "Encargado de proyecto" | "Revisor")

### Artefacto

- id\*
- name: String\*
- descripcion: String
- fase: String (Inicio | Ejecución | Cierre)
- disciplina: String (Modelado del negocio | Requisitos | Análisis y diseño | Implementación | Pruebas | Despliegue)

### Hallazgo

- id\*
- producto: String
- ubicacion: String
- descripcion: String
- impacto: String (Bajo | Medio | Alto)
- date: Date

### Minuta de reunión

- id\*
- proyecto: String
- revisor: Usuario
- encargado: Usuario
- descripcion: String

### Reporte técnico

- id\*
- name: String\*
- estado: String (Creado | Abortado | Revisado)
- revisor: Usuario
- local: String
- inicio: Date
- cumplimiento: Date
- descripcion: String
