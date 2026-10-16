INSTALACION PRISMA 7
CODMANDO: npm install prisma@7 --save-dev

INSTALACION CLIENTE DE PRISMA
CODMANDO: npm install @prisma/client@7 --save-dev

INSTALAMOS EL ADAPTADOR
CODMANDO: npm install @prisma/adapter-node@7 --save-dev

INSTALAR LIBRERIA PARA ARCHIVOS EXTENCION ts tsx
CODMANDO: npm install -D prisma@7 tsx

NOTA: "--save-dev" esigual a "-D" para instalar en el proyecto

DESPUES DE INSTALAR LAS DEPENDENCIAS INICIAR PRISMA
esto crea la carpeta "prisma" y la configuración de prisma
CODMANDO: npx prisma init --datasource-provider postgresql


EDITAR EL ARCHIVO .env DE VARIABLES DE ENTORNO, LA URL DE POSTGRES
DATABASE_URL=postgresql://postgres@localhost:5432/bd3407186?schema=public

AHORA CREAR LAS TABLAS Y EL CLIENTE
CODMANDO: npx prisma migrate dev --name init

CLIENTE DE PRISMA
npx prisma generate
