export default function Home() {
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">nq-reports</h1>
      <p className="text-gray-600">Upload NQ/MNQ fills and view simple trade metrics.</p>
      <ul className="list-disc pl-6">
        <li><a className="underline" href="/upload">Upload CSV</a></li>
        <li><a className="underline" href="/dashboard">Dashboard</a></li>
      </ul>
    </main>
  );
}
