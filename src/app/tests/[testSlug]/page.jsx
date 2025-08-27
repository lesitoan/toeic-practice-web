import TestDetailScreen from '@/views/TestDetailScreen';

export default function TestDetailPage({ params }) {
  return <TestDetailScreen testSlug={params.testSlug} />;
}
