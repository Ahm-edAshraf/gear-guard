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

Equipment images are sourced from Wikimedia Commons and `upload.wikimedia.org`. They are used under their respective Creative Commons or CC0 licenses.

- `camera.jpg`: Canon EOS R6 14.jpg, Wikimedia Commons, CC BY-SA 4.0
- `projector.jpg`: Epson EB-U04-5358.jpg, Wikimedia Commons, CC BY-SA 4.0
- `camera2.jpg`: Sony A 7 iii full frame mirrorless camera.jpg, Wikimedia Commons, CC BY 4.0
- `tripod.jpg`: (Photography equipment Tripod Photo Camera Tripod photograph in a studio).jpg, Wikimedia Commons, CC BY-SA 4.0
- `mic.jpg`: Rode Wireless Go II microphones.jpg, Wikimedia Commons, CC BY-SA 4.0
- `hdmi.jpg`: HDMI CableEnd 02.jpg, Wikimedia Commons, CC BY-SA 4.0
- `cord.jpg`: Extension cord.JPG, Wikimedia Commons, CC BY-SA 3.0
- `clicker.jpg`: Logitech Presenter.png, Wikimedia Commons, CC BY-SA 2.0
- `speaker.jpg`: JBL PartyBox On-The-Go.jpg, Wikimedia Commons, CC BY-SA 4.0
- `laptop.jpg`: DELL XPS 13 and 15 (37041682184).jpg, Wikimedia Commons, CC0
- `hub.jpg`: Anker PowerExpand 8-in-1-2186.jpg, Wikimedia Commons, CC BY-SA 4.0
- `ringlight.jpg`: Ring Light 25280737679.jpg, Wikimedia Commons, CC0
