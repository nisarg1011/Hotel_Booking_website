# Cloudflare Pages Deployment Guide - Hotel Booking Platform

This full-stack luxury hotel booking application has been configured for high-performance, zero-cost deployment on **Cloudflare Pages** with native Edge Functions.

---

## 1. Cloudflare Architecture Overview

- **Frontend**: React SPA (`client/build`) served globally via Cloudflare CDN with instantaneous routing via `_redirects`.
- **API Backend**: Native Cloudflare Pages Functions (`/functions`) executing at the edge in V8 isolates:
  - `/hotels` — Filtered hotel search (by city, price min/max, category, featured status)
  - `/hotels/countByCity` — Real-time luxury stay counters by city
  - `/hotels/countByType` — Stay counts by property classification (Hotels, Apartments, Resorts, Villas, Cabins)
  - `/hotels/find/:id` — Detailed property specifications and image galleries
  - `/hotels/room/:id` — Suite and room breakdown for booking
  - `/rooms/availability/:id` — Date blocking and room reservation logic
  - `/auth/login` & `/auth/register` — User authentication and session management
  - `/api/*` — Backward-compatible catch-all API proxy

---

## 2. Option A: Automatic Git Deployments via Cloudflare Dashboard

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your repository: `nisarg1011/Hotel_Booking_website`
4. Set the build parameters:
   - **Framework preset**: `None`
   - **Build command**: `npm run build`
   - **Build output directory**: `client/build`
   - **Root directory**: `/`
5. Click **Save and Deploy**.

---

## 3. Option B: Instant CLI Deployment via Wrangler

From the root of this repository:

```bash
# 1. Build the production client
npm run build

# 2. Deploy directly to Cloudflare Pages
npx wrangler pages deploy client/build --project-name=hotel-booking-nisarg
```

---

## 4. Environment Configuration (Optional)

If connecting to an external MongoDB Atlas cluster instead of edge memory:
1. In Cloudflare Dashboard > **Workers & Pages** > `hotel-booking` > **Settings** > **Environment variables**.
2. Add:
   - `MONGO`: `mongodb+srv://<username>:<password>@cluster0.mongodb.net/hotelbooking?retryWrites=true&w=majority`
   - `JWT`: `<your-random-jwt-secret>`
