<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->


# Config Module

- Permite trabajar con variables de ambientes
- Permite trabajar en diferentes ambientes

1. Instalar

```bash
# Instalar Config
$ npm i @nestjs/config
```
2. Crear archivos de variables de entorno  [. env ] 

```bash
API_KEY = XXXX
```

3. Excluir el archivo de variables de entorno  [ .gitignore ]

```bash
*.env
```

4. Configurar archivo modules [ app.modules.ts ]

```bash
# Importar ConfigModule
import { ConfigModule } from '@nestjs/config'
```

```bash
# Configuración de archivo de entorno y de manera global
@Module ({
    imports:[
      ConfigModule.forRoot({
          envfilePath: '.env'
          isGlobal: true
      })
    ]
})
```

5. Configurar servicio

```bash
# Importar ConfigService
import { ConfigService } from '@nestjs/config'
```

```bash
#Inyección de variables de entorno
constructor ( 
  private configService: ConfigService,
)
```

```bash
#Consumo de variable de entorno
metodo ( ) {
  this.configService.get('API_KEY');
}
```

# Configuración Ambientes

- Permite trabajar con variables de ambientes de desarrollo, pruebas, producción

1. Crear archivos por ambientes [ .env, .stag.env , .pro.env]

2. Crear achivo configuracion [ src/enviroments.ts]

```bash
export const enviroment = {
  dev='.env',
  stag='.stag.env',
  pro='.pro.env',
}
```
3. Editar [app.modules.ts]

```bash
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
  }),
    UsersModule,
  ],
})
```

4. Configuración servicio

```bash
# Importar ConfigService
import { ConfigService } from '@nestjs/config'
```

```bash
#Inyección de variables de entorno
constructor ( 
  private configService: ConfigService,
)
```

```bash
#Consumo de variable de entorno
metodo ( ) {
  const apikey = this.configService.get<string>('API_KEY');
}
```

5. Ejecutar de acuerdo al ambiente


```bash
NODE_ENV=stag npm run start:dev

```


# Tipado en la configuración

- Permite evitar errores de tipado en variables de configuración

1. Crear el archivo de configuración [ src/config.ts ]

2. Editar el arhivo de configuración 

```bash

import { registerAs } from '@nestjs/config'

export default registerAs('config', () => {
    return {
    database: {
        name: process.env.DATABASE_NAME,
        port: process.env.DATABASE_PORT,
    },
        apiKey: process.env.API_KEY,
    }
});
```

3. Configurar servicio para hacer uso de variables tipadas

3.1 Importar Inject

```bash
# Importar Inject
import { Injectable, Inject } from '@nestjs/common';
```

3.2 Importar archivo config.ts

```bash
# Importar archivo config
import config from './config';
```

3.3 Importar ConfigType

```bash
# Importar ConfigType
import { ConfigType } from '@nestjs/config';
```

3.4 Crear configService en el constructor

```bash
# Inyectar config.KEY al paramero configService
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ){}
```


3.5 Usar variable de ambiente tipada

```bash
# Acceder al valor de la variable mediante el atributo configService
  getHello(): string {
    const apikey = this.configService.apiKey;
    return `ApiKey = ${apikey}`;
  }
```



4. Cargar configuración en el modulo

```bash
# Añadir load para cargar la configuración config
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
  }),
```

# Validación variables ambientes
-Validacion de Tipado
-Validacion de archivos .env desde el exterior

1. Instalar el paquete Joi

```shell
npm install --save joi
```

2. Importar el Joi en el módulo de la aplicación a través de la propiedad validationShema.

```shell
import * as Joi from 'joi';  

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({ 
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    ...
  ],
  ...
})
```