import { getApartmentBySlug } from '@/data/apartments';
import Navbar from '@/components/Navbar';
import ApartmentDetailClient from '@/components/ApartmentDetailClient';

export default async function ApartmentDetail({
  params,
}: {
  params: Promise<{ zona: string; slug: string }>;
}) {
  const { zona, slug } = await params;
  const apartment = getApartmentBySlug(zona, slug);

  if (!apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Apartamento no encontrado</h1>
          <p className="text-gray-600">Lo sentimos, no pudimos encontrar este apartamento.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <ApartmentDetailClient apartment={apartment} />
    </>
  );
}
