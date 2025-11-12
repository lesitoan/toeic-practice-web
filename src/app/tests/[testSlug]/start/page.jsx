import StartTestScreen from '@/views/StartTestScreen';

export default async function StartTestPage({ params }) {
  const { testSlug } = await params;
  return <StartTestScreen testSlug={testSlug} />;
}
