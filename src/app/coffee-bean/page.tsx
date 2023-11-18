import {prisma} from "@/libs/prisma/prismaClient";

export default async function CoffeeBeanPage() {
  // TODO: get auth user
  const userId = 2

  const beans = await prisma.coffeeBean.findMany({where: {userId}, include: {roast: true, process: true}})

  return (
    <main className={'px-4'}>
      <h1 className={'text-xl font-bold'}>Coffee Bean</h1>

      <section>
        <table className={'w-full'}>
          <thead>
            <tr>
              <th>ID</th>
              <th>名前</th>
              <th>原産国</th>
              <th>品種</th>
              <th>精製方法</th>
              <th>焙煎度</th>
              <th>評価</th>
              <th>メモ</th>
              <th>購入日</th>
              <th>作成日</th>
            </tr>
          </thead>
          <tbody>
            {beans.map(({coffeeBeanId, productionArea, name, breed, taste, memo, purchasDate, createdAt, roast, process}) => (
              <tr key={coffeeBeanId}>
                <td>{coffeeBeanId}</td>
                <td>{name}</td>
                <td>{productionArea}</td>
                <td>{breed}</td>
                <td>{process?.name ?? '-'}</td>
                <td>{roast?.name ?? '-'}</td>
                <td>{taste}</td>
                <td>{memo}</td>
                <td>{purchasDate?.toDateString() ?? '-'}</td>
                <td>{createdAt?.toDateString() ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  )
}