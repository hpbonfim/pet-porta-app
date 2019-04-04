# pet-porta-app
Projeto criado para o PET(Programa de Educacao Tutorial) - Ministério da Educação, para ativar um relay eletronico via PWA (Progressive Web App). Consiste em 5 microserviços suportados via Docker Compose.

```sh
 - PET_AUTH
 - PET_GATEWAY
 - PET_ARDUINO
 - PET_DATABASE.
 - PET_PORTA
```
# Principais Ferramentas:
* [VueJS] - Vue.js é uma estrutura JavaScript de código aberto para criar interfaces com o usuário e aplicativos de página única

* [node.js] -  Node.js é um ambiente de tempo de execução JavaScript de plataforma aberta e código aberto que executa o código JavaScript fora de um navegador.
 
* [Express] - Concebido para construir aplicações web e APIs. Ele foi chamado de estrutura de servidor padrão de fato para o Node.js

* [Docker] - Docker é um programa de computador que executa virtualização no nível do sistema operacional

* [Nginx] - O Nginx é um servidor da Web que também pode ser usado como reverse proxy, load balancer, mail proxy and HTTP cache.

...


### Instalação do Docker
Por padrão, o Docker irá expor na porta 8080, portanto, altere isso no Dockerfile, se necessário. Quando estiver pronto, basta usar o Dockerfile para construir a imagem.
```sh
cd pet-porta-app
docker-compose up
```

Verifique o Portainer, implantação navegando até o endereço do servidor no seu navegador preferido.

```sh
127.0.0.1:9000
```


License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [node.js]: <http://nodejs.org>
   [jQuery]: <http://jquery.com>
   [express]: <http://expressjs.com>
   [VueJS]: <http://vuejs.org>
   [Docker]: <http://docker.com>
   [Nginx]: <http://nginx.com>
