# geolocalizacion_meli

![image](https://user-images.githubusercontent.com/33238193/217149952-6aab210d-ded9-4c18-be4e-a97aa2ad792a.png)


## Levantar Proyecto:
1. Instalar docker.
2. Clonar el proyecto.
3. Pararse en la carpeta raiz donde se encuentran web, api, docker-compose y create-table.
4. Usar el comando `docker-compose up`.
5. Una vez levantado el servicio se puede acceder mediante la url: http://localhost:3000/ (Directo al frontend)

## Información del proyecto:

El proyecto cuenta con 4 servicios:
  - Frontend (web) hecho en React + Typescript (Puerto: 3000)
  - Backeend (api) hecho en Node 16 + Express (Puerto: 30001)
  - Redis (cache) (Puerto: 6379)
  - MySQL (base de datos) (Puerto: 3306)

La información de la IP, una vez obtenida mediante el uso de 3 apis, se cachea todo a excepción de la moneda (debido a su fluctuación del valor). 
Se realiza el caché en primera instancia de TODOS los países guardándolos `país_code: país`.
Además se cachea la información básica de la ip. También se guarda en caché las estadísticas de uso del servicio. 

Todos los registros en caché tienen una duración de 5 minutos. 
En caso de no encontrar la información necesaria en caché la busca en la base de datos o en apis dependiendo lo que corresponda.

Las estadísticas sobre el uso del servicio se almacenan en la base de datos y se cachean, pero al insertarse un nuevo registro en la base de datos se limpian las estadísticas de caché para poder calcularlas nuevamente. 

Se colocaron las conexiones y keys desde variables de entorno directamente en el archivo docker-compose.yml. 
En un ambiente productivo esto no se debe realizar ya que se estarían exponiendo datos de acceso, los cuales deben ser inyectados al contenedor de forma segura

## Apis externas utilizadas:
- Geolocalización de IPs: https://ip2country.info/
- Información de paises: https://restcountries.com/#api-endpoints-v3-all
- Información sobre monedas: http://fixer.io/

## Api: 
```
/api/statistics (GET)
- Descripción: Devuelve las estadísticas
- Response: 
  {
    min_distance: number;
    max_distance: number;
    average_distance: string;
    quantity: number;
  }
  
/api/ip (POST)
- Descripción: Devuelve información sobre una dirección IP
- Response:
  { 
    ip: string;
    currentDate: string;
    country: string;
    isoCode: string;
    languages: string;
    currency: string;
    zoneTimes: string;
    distance: number;
    distanceMessage: string;
   }
  ```
