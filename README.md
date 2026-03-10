# Desafio
Quadro de funcionários com CRUD simples.

### Instalações necessárias
- NodeJs - [Clique aqui para acessar a documentação](https://nodejs.org/en/download)
- MongoDB Compass - [Clique aqui para acessar a documentação](https://www.mongodb.com/try/download/compass)
- Docker - [Clique aqui para acessar a documentação](https://www.docker.com/get-started/)

Obs: Caso não venha instalado o Docker Compose, será necessário instalá-lo. O guia oficial você encontra [aqui](https://docs.docker.com/compose/install/).

### Como rodar o projeto
1. Verifique se as instalações necessárias listadas acima foram concluídas.

2. Clone o repositório do projeto:
```bash
git clone https://github.com/evelinszymanski/desafio-tecnico.git
```
Você encontra a documentação completa sobre como clonar um repositório [aqui](https://docs.github.com/pt/repositories/creating-and-managing-repositories/cloning-a-repository).

4. Abra o terminal na pasta raiz do projeto e rode o comando:
```bash
docker compose build
```
   
6. Após a conclusão do build, rode o comando abaixo para iniciar o projeto:
```bash
docker compose up
```
   
8. Abra o navegador e acesse `http://localhost:3000` para visualizar o frontend.

### Como acessar o banco de dados

1. Abra o MongoDB Compass.
2. Clique em "Add new connection".
3. Verifique se a URI é `mongodb://localhost:27017`.
4. Clique em "Save & Connect".

### Como encessar o projeto
- Para encerrar o docker use o comando:
```bash
docker compose down
```

### Pré-visualização da tela de funcionários
<img width="1904" height="959" alt="image" src="https://github.com/user-attachments/assets/94e1ab30-e698-45e2-9d7e-cafc77676ade" />




