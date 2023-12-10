'use client';

import Link from 'next/link';
import { useEffect, useReducer, useState } from 'react';

import { CreateCoffeeBeanRequestType } from '@/app/api/coffee-bean/route';
import { Process, Roast } from '@/libs/prisma/prismaClient';

type CoffeeBeanAddFromType = {
  name: string;
  note?: string;
  origin?: string;
  process?: number;
  purchaseDate?: string;
  rating?: number;
  roast?: number;
  variety?: string;
};

export default function CoffeeBeanAddPage() {
  // TODO: get auth user
  const userId = 2;

  const [{ processes, roasts }, setMasters] = useState<{ processes: Process[]; roasts: Roast[] }>({
    processes: [],
    roasts: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const processesResponse = await fetch('/api/processes');
        const roastsResponse = await fetch('/api/roasts');
        const { body: processesBody } = await processesResponse.json();
        const { body: roastsBody } = await roastsResponse.json();
        if (!processesBody || !roastsBody) return;

        setMasters({ processes: processesBody.processes, roasts: roastsBody.roasts });
      } catch (error) {
        console.error(`Failed to get master data: ${error}`);
      }
    })();
  }, []);

  const reducer = (state: CoffeeBeanAddFromType, action: { key: keyof CoffeeBeanAddFromType; value: any }) => {
    return { ...state, [action.key]: action.value };
  };

  const [form, setForm] = useReducer(reducer, {
    name: '',
    note: undefined,
    origin: undefined,
    process: undefined,
    purchaseDate: undefined,
    rating: undefined,
    roast: undefined,
    variety: undefined,
  });

  const handleSubmit = async () => {
    try {
      const requestBody = {
        name: form.name,
        note: form.note,
        origin: form.origin,
        processId: form.process,
        purchaseDate: form.purchaseDate,
        rating: form.rating,
        roastId: form.roast,
        userId,
        variety: form.variety,
      } satisfies CreateCoffeeBeanRequestType;

      const response = await fetch('/api/coffee-bean', {
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });
      const { body } = await response.json();
      console.log(body);
    } catch (error) {
      console.error(`Failed to add coffee bean: ${error}`);
    }
  };

  return (
    <>
      <section>
        <form>
          <div>
            <label htmlFor="name">名前: </label>
            <input
              className={'text-black'}
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={(event) => {
                const value = event.currentTarget.value;
                setForm({ key: 'name', value });
              }}
            />
          </div>
          <div>
            <label htmlFor="origin">原産国: </label>
            <input
              className={'text-black'}
              type="text"
              id="origin"
              name="origin"
              value={form.origin}
              onChange={(event) => {
                const value = event.currentTarget.value;
                setForm({ key: 'origin', value });
              }}
            />
          </div>
          <div>
            <label htmlFor="variety">品種: </label>
            <input
              className={'text-black'}
              type="text"
              id="variety"
              name="variety"
              value={form.variety}
              onChange={(event) => {
                const value = event.currentTarget.value;
                setForm({ key: 'variety', value });
              }}
            />
          </div>
          <div>
            <label htmlFor="process">精製方法: </label>
            <select
              className={'text-black'}
              id={'process'}
              name={'process'}
              value={form.process}
              onChange={(event) => {
                const value = event.currentTarget.value;
                setForm({ key: 'process', value: Number(value) });
              }}
            >
              {processes.map(({ name, processId }) => (
                <option key={processId} value={processId}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="roast">焙煎度: </label>
            <select
              className={'text-black'}
              id={'roast'}
              name={'roast'}
              value={form.roast}
              onChange={(event) => {
                const value = event.currentTarget.value;
                setForm({ key: 'roast', value: Number(value) });
              }}
            >
              {roasts.map(({ name, roastId }) => (
                <option key={roastId} value={roastId}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="rating">評価: </label>
            <select
              className={'text-black'}
              name="rating"
              id="rating"
              value={form.rating}
              onChange={(event) => {
                const value = event.currentTarget.value;
                setForm({ key: 'rating', value: Number(value) });
              }}
            >
              <option value="1">★</option>
              <option value="2">★★</option>
              <option value="3">★★★</option>
              <option value="4">★★★★</option>
              <option value="5">★★★★★</option>
            </select>
          </div>
          <div>
            <label htmlFor="note">メモ: </label>
            <textarea
              className={'text-black'}
              id="note"
              name="note"
              value={form.note}
              onChange={(event) => {
                const value = event.currentTarget.value;
                setForm({ key: 'note', value });
              }}
            />
          </div>
          <div>
            <label htmlFor="purchaseDate">購入日: </label>
            <input
              className={'text-black'}
              type="date"
              id="purchaseDate"
              name="purchaseDate"
              value={form.purchaseDate}
              onChange={(event) => {
                const value = event.currentTarget.value;
                setForm({ key: 'purchaseDate', value });
              }}
            />
          </div>
          <button type="button" onClick={handleSubmit}>
            送信
          </button>
        </form>
      </section>

      <Link href={'/coffee-bean'}>◀ BACK</Link>
    </>
  );
}
