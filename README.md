# Locadora de Filmes
**Observação importante: esse crud foi feito de uma forma meio que rápida, então não está estruturado de melhor maneira e nem como gostaria.**
- Imagens disponíveis no [**DockerHub**](https://hub.docker.com/r/mateussgt/locadora-de-filmes)

- [**Backend**](https://github.com/mateuss-silva/locadora-de-filmes-backend)

## Porta
 - 3000
## Host
 - localhost
 - Link:  [**Locadora de Filmes**](http://localhost:3000/)

## Compose
- **Atençao**, após executar o comando ```docker compose up```, pode acontecer da API não iniciar de imediato por ter uma dependência do **banco de dados**. Está explícito que a aplicação deve esperar o banco inicializar, ```depends_on: - "database"```. Entretando, pode aconter do banco ser inicializado antes, mas a conexão da API não acontecer e será preciso iniciar ela novamente.
```
version: "3.9"

services:
  api:
    image: mateussgt/locadora-de-filmes:api
    environment:
      - ASPNETCORE_ENVIRONMENT=Development
      - ASPNETCORE_URLS=https://+:443;https://+:5050;http://+:80
      - ASPNETCORE_Kestrel__Certificates__Default__Password=root
      - ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx
    volumes:
      - ~/.aspnet/https:/https:ro
    ports:
      - "5050:5050"
      - "80:80"
      - "443:443"
    depends_on:
      - "database"
  web:
    stdin_open: true
    image: mateussgt/locadora-de-filmes:web
    ports:
      - "3000:3000"
    depends_on:
      - "api"
  database:
    image: mateussgt/locadora-de-filmes:database
    environment:
      MYSQL_ROOT_PASSWORD: 'root'
    ports:
      - "3306:3306"
    volumes:
      - locadora-data:/data/db

volumes:
  locadora-data:
    driver: local

```
