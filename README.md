# nq-reports

Static-first Next.js app for turning NQ/MNQ CSV fills into a simple trade dashboard.

## Quickstart

```bash
pnpm install
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000) and upload a CSV on the **Upload** page.

Run tests with:

```bash
pnpm test
```

## CSV format

CSV files should include a header row:

```
timestamp,symbol,side,qty,price,fees,tags
```

- `timestamp` – ISO string (e.g. `2024-01-01T09:30:00Z`)
- `symbol` – contract like `NQZ5` or `MNQZ5`
- `side` – `BUY` or `SELL`
- `qty` – number of contracts
- `price` – fill price
- `fees` – optional, per fill
- `tags` – optional, semicolon separated

To experiment, copy the snippet above into a `.csv` file and upload it on the **Upload** page.

## Next steps

- Per-trade analytics (MAE/MFE, R multiple config)
- Persist uploaded data to a backend
- Import from brokerage APIs
