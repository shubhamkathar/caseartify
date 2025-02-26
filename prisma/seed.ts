// prisma/seed.ts

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  await prisma.design.createMany({
    data: [
      {
        title: 'Design',
        imageUrl: '/designs/design1.jpg',
      },
      {
        title: 'Design',
        imageUrl: '/designs/design2.jpg',
      },
      {
        title: 'Design',
        imageUrl: '/designs/design3.jpg',
      },
      {
        title: 'Design',
        imageUrl: '/designs/design4.jpg',
      },
      {
        title: 'Design',
        imageUrl: '/designs/design5.jpg',
      },
      {
        title: 'Design',
        imageUrl: '/designs/design6.jpg',
      },
      {
        title: 'Design',
        imageUrl: '/designs/design7.jpg',
      },
      {
        title: 'Design',
        imageUrl: '/designs/design8.jpg',
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
