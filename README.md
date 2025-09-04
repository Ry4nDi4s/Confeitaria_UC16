npx prisma generate

npx prisma migrate dev --name init

npx prisma db push --force-reset

npx prisma studio

// cors seria uma liberação de quem pode chamar a variavel, por hora todo mundo pode chamar até que eu coloque alguma propriedade que possa chamar
