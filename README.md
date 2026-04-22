# COE-5024 Course Site (Local)

Local-first interactive course site for:
- AI Finance Training Series 2026
- PDF into Excel into SAP

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run preview
```

Build output is generated in `dist/`.

## Publishing strategy

1. Develop and iterate locally in this project.
2. Sync progress to backup repo: `poriestr_amadeus/cfa-training-2026`.
3. At release time, publish only sanitized/public-safe content to the final personal GitHub Pages repository.

## Notes

- Vite production base path is configured to `/cfa-training-2026/`.
- Replace placeholder contact details before final delivery.
