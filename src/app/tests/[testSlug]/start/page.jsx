import StartTestScreen from '@/views/StartTestScreen';

export default async function TestDetailPage({ params }) {
  const { testSlug } = await params;
  return <StartTestScreen testSlug={testSlug} />;
}
