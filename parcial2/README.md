# Gestor Jerarquico de Carpetas y Archivos

Aplicacion web desarrollada con React + TypeScript + Vite para gestionar un sistema de carpetas y archivos basado en un arbol n-ario implementado desde cero.

## Como ejecutar

```bash
npm install
npm run dev
```

Build de produccion:

```bash
npm run build
```

## Requisitos cubiertos

1. Autenticacion
- Login mock por correo y contrasena.
- Usuario en contexto global con React Context.
- Validacion de usuario registrado para crear carpeta/archivo.

2. Persistencia
- El arbol completo se persiste en base de datos mock usando localStorage.
- Cada nodo guarda correo del creador y fecha de creacion.
- Los datos quedan disponibles para futuras consultas al recargar la pagina.

3. Reglas del arbol n-ario
- Nodo tipo archivo no puede tener hijos.
- Nodo tipo carpeta si puede tener hijos.
- Insercion recursiva tipada e inmutable.

4. Presentacion visual
- Interfaz responsive para escritorio y movil.
- Vista jerarquica de carpetas y archivos.
- Formulario de creacion con seleccion de carpeta padre.

## Usuarios de prueba registrados

- ana@correo.com
- luis@correo.com
- soporte@empresa.com

Puedes iniciar sesion con cualquiera de esos correos y una contrasena no vacia.
