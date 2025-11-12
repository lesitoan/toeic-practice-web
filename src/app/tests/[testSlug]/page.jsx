import TestDetailScreen from '@/views/TestDetailScreen';

export default async function TestDetailPage({ params }) {
  const { testSlug } = await params;
  return <TestDetailScreen testSlug={testSlug} />;
}
