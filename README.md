<p align="center">
  <img src="https://github.com/VitorCarvalho67/Boot/assets/102667323/dd1fc8b6-12ac-4b2a-8e20-52145bfac526" alt="Imagem logo" />
</p>

# BOOT

[![GitHub license](https://img.shields.io/github/license/vitorcarvalho67/Boot)](vitorcarvalho67/Boot/blob/master/LICENSE)
![GitHub stars](https://img.shields.io/github/stars/vitorcarvalho67/Boot)
![GitHub languages top](https://img.shields.io/github/languages/top/vitorcarvalho67/Boot)
[![GitHub contributors](https://img.shields.io/github/contributors/VitorCarvalho67/Boot)](https://github.com/VitorCarvalho67/Boot/graphs/contributors)
![CI](https://github.com/vitorcarvalho67/Boot/workflows/CI/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a2356bd7-e1c8-4caf-b0c7-61a5f81b421a/deploy-status)](https://app.netlify.com/sites/boot-website/deploys)

Digital platform tailored for the educational environment, designed to facilitate the dissemination of internship opportunities and promote student engagement. The platform will enable students to develop and update their portfolios and resumes, highlighting their academic and professional experiences to stand out in the job market. Additionally, it will incorporate a scoring system that values user activity on the platform, such as publications and interactions, generating a ranking of students with the top academic and professional profiles.

## Technology

[Vue.js](https://vuejs.org/) -
[Axios](https://axios-http.com/) -
[SCSS](https://sass-lang.com/) -
[Tauri](https://tauri.app/) -
[MariaDB](https://mariadb.org/) -
[TypeScript](https://www.typescriptlang.org/) -
[Prisma](https://www.prisma.io/) -
[MinIO](https://min.io/) -
[Docker](https://www.docker.com/) -
[Nginx](https://nginx.org/) -
[Docker Compose](https://docs.docker.com/compose/) -
[JWT (JSON Web Tokens)](https://jwt.io/) -
[Nodemailer](https://nodemailer.com/) -
[Mixins in Vue](https://vuejs.org/guide/reusability/mixins.html) -
[Vue Router](https://router.vuejs.org/) -
[Express](https://expressjs.com/) -
[Pnpm](https://pnpm.io/) -
[Socket.io](https://socket.io/)

## How To Use

Clone the repository

```bash
git clone https://github.com/VitorCarvalho67/Boot.git
```

Navigate to the project directory on sever side

```bash
cd Boot/server
```

Install dependencies

```bash
npm install
```

Run Prisma migrations

```bash
npx prisma migrate dev
```

Start the API

```bash
npm run dev
```

Navigate to the client directory

```bash
cd Boot/client
```

Install dependencies

```bash
npm install
```

Start the client

```bash
npm run dev
```

> [!WARNING]
> remember to uncomment .env.example and remove .example from the file name and adjust the environment variables as required for your specific setup

## Runnig With Docker

```bash
sudo docker-compose build
sudo docker-compose up
# or 
sudo docker-compose up -d
```
