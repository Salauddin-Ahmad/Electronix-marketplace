# VOLTRONIX Electrical Marketplace

Frontend-only Next.js App Router implementation derived from the supplied Stitch screens and design system.

## Stack
- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Lucide React
- Local presentation components styled in a shadcn/ui-inspired pattern

## Included flows
- Homepage
- Category Explorer
- Search Results
- Product Detail
- Cart
- Checkout
- Home & Building Solutions
- Price Challenge
- Wholesale
- Account
- Admin Dashboard

## Backend boundary
No database, Prisma, server actions, or backend integrations are included. Mock product/category arrays and React client state are intentionally isolated so a future NestJS/Node REST API can replace them.

## Run
```bash
npm install
npm run dev
```

The supplied Stitch reference screenshots are kept outside the application logic; local cropped product imagery is included under `public/products/crops/` only to make the demo visually concrete.
