## Entidades

### Usuario

- username\*: String
- rol: Enum ("Administrador" | "Coordinador de calidad" | "Asesor de calidad" | "Encargado de proyecto" | "Revisor")

## Artefacto

- id\*
- name: String
- descripcion: String
- fase: String (Inicio | Ejecución | Cierre)
- disciplina: String (Modelado del negocio | Requisitos | Análisis y diseño | Implementación | Pruebas | Despliegue)

## Hallazgo

- id\*
- producto: String
- ubicacion: String
- descripcion: String
- impacto: Int (1 | 2 | 3)
- date: Date

## Minuta de reunión

- id\*
- proyecto: String
- revisor: Usuario
- encargado: Usuario
- descripcion: String

## Reporte técnico

- id\*
- name: String
- estado: String (Creado | Abortado | Revisado)
- local: String
- inicio: Date
- cumplimiento: Date
- descripcion: String
