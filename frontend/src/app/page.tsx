import Image from "next/image";
import { getAll } from "@/libs/products";
import { MDXRemote } from 'next-mdx-remote/rsc'
import { serialize } from 'next-mdx-remote/serialize'

export default async function Home() {
  const data = await getAll();
  return (
    <main>
      {data.map(async (el) => {
        return (
        <div>
          <Image width={500} height={500} src={el.portada} alt=""/>
          <h2>{el.name}</h2>
          {MDXRemote({source:el.desc})}
        </div>
        )
      })}
    </main>
  );
}
