'use client';

import Papa from 'papaparse';
import { useState } from 'react';
import { useStore } from '@/store/useStore';

export default function FileUpload() {
  const importFills = useStore(s => s.importFills);
  const [preview, setPreview] = useState<any[]>([]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as any[];
        setPreview(rows.slice(0, 5));
        importFills(rows);
      },
    });
  };

  return (
    <div className="space-y-4">
      <input type="file" accept=".csv" onChange={handleFile} />
      {preview.length > 0 && (
        <table className="text-sm border">
          <thead>
            <tr>
              {Object.keys(preview[0]).map((k) => (
                <th key={k} className="px-2 border">
                  {k}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preview.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((v, j) => (
                  <td key={j} className="px-2 border">
                    {String(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="text-sm text-gray-500">
        Need an example? See the CSV format in the README.
      </p>
    </div>
  );
}
