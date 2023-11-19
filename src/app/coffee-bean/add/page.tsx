'use client'

import { prisma, Process, Roast } from "@/libs/prisma/prismaClient";
import {useEffect, useReducer, useState} from "react";

type CoffeeBeanAddFromType = {
  name: string
  origin?: string
  variety?: string
  process?: number
  roast?: number
  rating?: number
  note?: string
  purchaseDate?: string
}

export default function CoffeeBeanAddPage() {
  // TODO: get auth user
  const userId = 2

  const [{processes, roasts}, setMasters] = useState<{ processes: Process[], roasts: Roast[]}>({
    processes: [],
    roasts: [],
  })

  useEffect(() => {
    (async () => {
      try {
        const processesResponse = await fetch('/api/processes')
        const roastsResponse = await fetch('/api/roasts')
        const { body: processesBody } = await processesResponse.json()
        const { body: roastsBody } = await roastsResponse.json()
        if (!processesBody || !roastsBody) return

        setMasters({processes: processesBody.processes, roasts: roastsBody.roasts})
      } catch (error) {
        console.error(`Failed to get master data: ${error}`)
      }
    })()
  }, [])

  const reducer = (state: CoffeeBeanAddFromType, action: { key: keyof CoffeeBeanAddFromType, value: any }) => {
    return {...state, [action.key]: action.value}
  }

  const [form, setForm] = useReducer(
    reducer,
    {
      name: '',
      origin: undefined,
      variety: undefined,
      process: undefined,
      roast: undefined,
      rating: undefined,
      note: undefined,
      purchaseDate: undefined,
    }
  )

  console.log(form)

  return (
    <main className={'px-4'}>
      <h1 className={'text-xl font-bold'}>Add Coffee Bean</h1>

      <section>
        <form>
          <div>
            <label htmlFor="name">名前: </label>
            <input type="text" id="name" name="name" value={form.name} onChange={(event) => {
              const value = event.currentTarget.value
              setForm({key: 'name', value})
            }} />
          </div>
          <div>
            <label htmlFor="origin">原産国: </label>
            <input type="text" id="origin" name="origin" value={form.origin} onChange={(event) => {
              const value = event.currentTarget.value
              setForm({key: 'origin', value})
            }} />
          </div>
          <div>
            <label htmlFor="variety">品種: </label>
            <input type="text" id="variety" name="variety" value={form.variety} onChange={(event) => {
              const value = event.currentTarget.value
              setForm({key: 'variety', value})
            }} />
          </div>
          <div>
            <label htmlFor="process">精製方法: </label>
            <select id={'process'} name={'process'} value={form.process} onChange={(event) => {
              const value = event.currentTarget.value
              setForm({key: 'process', value: Number(value)})
            }}>
              {processes.map(({processId, name}) => (
                <option key={processId} value={processId}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="roast">焙煎度: </label>
            <select id={'roast'} name={'roast'} value={form.roast} onChange={(event) => {
              const value = event.currentTarget.value
              setForm({key: 'roast', value: Number(value)})
            }}>
              {roasts.map(({roastId, name}) => (
                <option key={roastId} value={roastId}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="rating">評価: </label>
            <select name="rating" id="rating" value={form.rating} onChange={(event) => {
              const value = event.currentTarget.value
              setForm({key: 'rating', value: Number(value)})
            }}>
              <option value="1">★</option>
              <option value="2">★★</option>
              <option value="3">★★★</option>
              <option value="4">★★★★</option>
              <option value="5">★★★★★</option>
            </select>
          </div>
          <div>
            <label htmlFor="note">メモ: </label>
            <textarea id="note" name="note" value={form.note} onChange={(event) => {
              const value = event.currentTarget.value
              setForm({key: 'note', value})
            }} />
          </div>
          <div>
            <label htmlFor="purchaseDate">購入日: </label>
            <input type="date" id="purchaseDate" name="purchaseDate" value={form.purchaseDate} onChange={(event) => {
              const value = event.currentTarget.value
              setForm({key: 'purchaseDate', value})
            }} />
          </div>
          <button type="button">送信</button>
        </form>
      </section>
    </main>
  )
}