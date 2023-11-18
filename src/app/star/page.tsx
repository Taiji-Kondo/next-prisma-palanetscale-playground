import {prisma} from "@/libs/prisma/prismaClient";

export default async function StarPage() {
  const stars = await prisma.star.findMany()

  return (
    <main>
      <h1>Star Page</h1>
      <ul>
        {stars.map(({id, name, constellation}) => (
          <li key={id}>
            <p>{name}</p>
            <p>{constellation}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}