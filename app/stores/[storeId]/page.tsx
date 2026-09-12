import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StorefrontExperience } from "@/components/stores/StorefrontExperience";
import { STORES } from "@/lib/data/stores";

type Props = { params: Promise<{ storeId: string }> };

export function generateStaticParams() { return STORES.map((store) => ({ storeId: store.id })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { storeId } = await params;
  const store = STORES.find((item) => item.id === storeId);
  if (!store) return {};
  return { title: `${store.name} Official Store | LNDRY`, description: store.shortDescription, alternates: { canonical: `/stores/${store.id}` }, openGraph: { title: `${store.name} Official Store | LNDRY`, description: store.shortDescription, images: [store.heroImage] } };
}

export default async function StorePage({ params }: Props) {
  const { storeId } = await params;
  const store = STORES.find((item) => item.id === storeId);
  if (!store) notFound();
  return <StorefrontExperience store={store} />;
}
