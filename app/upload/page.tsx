import FileUpload from '@/components/FileUpload';

export default function UploadPage() {
  return (
    <main className="p-8 space-y-4">
      <h1 className="text-xl font-bold">Upload Fills</h1>
      <FileUpload />
    </main>
  );
}
