import { prisma } from '@/libs/prisma/prismaClient';

export default async function StarPage() {
  const users = await prisma.user.findMany();
  const grindSizes = await prisma.grindSize.findMany();
  const processes = await prisma.process.findMany();
  const roasts = await prisma.roast.findMany();

  return (
    <main className={'px-4'}>
      <h1 className={'text-xl font-bold'}>Master Data</h1>

      <section>
        <h2 className={'text-lg font-bold'}>User</h2>
        <div className={'px-5 py-3 bg-gray-600 rounded-md'}>
          <ul>
            {users.map(({ name, userId }) => (
              <li key={userId}>
                <span>{userId}:</span>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className={'text-lg font-bold'}>Grind Size</h2>
        <div className={'px-5 py-3 bg-gray-600 rounded-md'}>
          <ul>
            {grindSizes.map(({ grindSizeId, name }) => (
              <li key={grindSizeId}>
                <span>{grindSizeId}:</span>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className={'text-lg font-bold'}>Process</h2>
        <div className={'px-5 py-3 bg-gray-600 rounded-md'}>
          <ul>
            {processes.map(({ name, processId }) => (
              <li key={processId}>
                <span>{processId}:</span>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <h2 className={'text-lg font-bold'}>Roast</h2>
        <div className={'px-5 py-3 bg-gray-600 rounded-md'}>
          <ul>
            {roasts.map(({ name, roastId }) => (
              <li key={roastId}>
                <span>{roastId}:</span>
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
