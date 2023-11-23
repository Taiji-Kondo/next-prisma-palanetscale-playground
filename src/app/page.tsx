import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div>
        <Link href={'/master'} className={'underline'}>
          ▶ Master Data Page
        </Link>
      </div>
      <div>
        <Link href={'/coffee-bean'} className={'underline'}>
          ▶ Coffee Bean Page
        </Link>
      </div>
    </main>
  );
}
