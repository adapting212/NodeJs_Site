export default function TeamMemberPage({ params }: { params: { slug: string } }) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold capitalize">{params.slug.replace('-', ' ')}</h1>
      <p className="mt-4 text-lg text-gray-600">Profile details coming soon.</p>
    </main>
  );
}