const { PrismaClient } = require('@prisma/client')

export default async function Home() {
  const prisma = new PrismaClient();
  // await prisma.user.create({
  //   data: {
  //     name: 'Alice',
  //     email: 'alice@prisma.io',
  //     posts: {
  //       create: { title: 'Hello World' },
  //     },
  //     profile: {
  //       create: { bio: 'I like turtles' },
  //     },
  //   },
  // });
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
      profile: true,
    },
  });
  console.dir(allUsers, { depth: null })


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {allUsers.map((user) => (
        <div key={user.id}>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          {/* Render other user properties as needed */}
        </div>
      ))}
    </main>
  );
}
