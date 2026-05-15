# GearGuard Campus

**Campus Equipment Booking & Return Tracker**

GearGuard Campus is a brutalist-themed web application that allows students to book shared campus equipment such as projectors, cameras, microphones, tripods, HDMI cables, and laptops. It prevents double bookings, tracks pickup and return status, and helps administrators oversee equipment lifecycles.

## Key Features

- **Equipment Catalogue**: Browse all available campus resources.
- **Booking Form**: Reserve items with strict temporal and duration constraints.
- **Conflict Prevention**: Mathematical overlap detection prevents double booking of any single asset.
- **Lifecycle Tracking**: Monitor the state of assets: `Booked` -> `Picked Up` -> `Returned`.
- **Overdue Detection**: Automatically identify and flag items not returned by their required end time.
- **Admin Dashboard**: Provide administrators with overarching metrics and status management actions.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- Framer Motion
- Lucide React
- localStorage (State Persistence for Prototype)

## Getting Started

First, install the dependencies using Bun:

```bash
bun install
```

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Architecture

This project is built using a decoupled architecture suitable for a prototype that can easily scale. 
- The `app/` directory handles views and routing.
- The `components/` directory handles reusable UI fragments.
- The `lib/` directory handles core business logic (`bookingLogic.ts`, `dashboard.ts`, `validation.ts`), ensuring UI components are not bloated with state-mutation functions.

## Submission Details

Designed and built for the Shortcut Asia Open Call challenge.

## Image Credits

Equipment images are sourced from Wikimedia Commons. They are used under their respective Creative Commons or CC0 licenses. Full image source pages are listed in the project documentation.
