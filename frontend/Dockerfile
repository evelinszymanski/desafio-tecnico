FROM node:20
WORKDIR /app
# Copia apenas os arquivos de dependências primeiro (otimiza o cache)
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]