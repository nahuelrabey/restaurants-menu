import { serialize } from "next-mdx-remote/serialize";

type plato = {
  id: number;
  slug: string;
  name: string;
  desc: string;
  portada: string;
};

export async function getAll(): Promise<plato[]> {
  console.log("IN GET ALL");
  const rawdata = await (
    await fetch("http://localhost:1337/api/productos?populate=*", {cache:'no-cache'})
  ).json();
  const data = (rawdata as any).data;
  if (!Array.isArray(data)) {
    throw Error("data must be array");
  }
  const platos = data.map((product: any) => {
    const data = product.attributes;
    const portada = data.portada.data.attributes.url;
    return {
      id: product.id,
      slug: data.slug,
      name: data.nombre,
        // desc: serialize(data.descripcion),
      desc: data.descripcion,
      portada: `http://localhost:1337${portada}`,
    };
  });

  return platos;
}
