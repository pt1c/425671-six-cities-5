# Личный проект «Шесть городов»


---
## Docker

```
docker-compose -f docker-compose-test.yml down
```

---
## .env
Необходимо создать .env в корне.
```
PORT=5000
SALT=HACKER
DB_USER=admin
DB_PASSWORD=test
DB_NAME=six-cities
```

---

## Сидирование

```
npm run ts ./src/main.cli.ts -- --import ./mocks/mock-data.tsv admin test localhost six-cities HACKER
```

---

## Shebang
Чтобы работал запуск CLI из консоли нужно:
1. собрать проект (`npm run build`)
2. сделать скрипт исполняемым `chmod u+x ./dist/main.cli.js`
3. profit. запускаем...

---
