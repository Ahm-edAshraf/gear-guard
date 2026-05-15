import { FileText, Cpu, Target, Scale, Database, Zap } from 'lucide-react';

export default function AboutPage() {
  const sections = [
    {
      icon: <Target className="text-accent" size={32} />,
      title: "1. The Problem",
      content: "Campus equipment tracking is frequently disorganized. Managing assets like projectors, cameras, and microphones through fragmented channels (spreadsheets or chat apps) leads to double bookings, untracked damage, and unreturned items."
    },
    {
      icon: <Zap className="text-accent" size={32} />,
      title: "2. The Solution",
      content: "GearGuard Campus provides a unified, brutalist, high-utility interface for operators (students) to view real-time availability and secure reservations, while administrators oversee lifecycle states (Booked -> Dispatched -> Returned)."
    },
    {
      icon: <Cpu className="text-accent" size={32} />,
      title: "3. Tech Stack & Architecture",
      content: "Built on Next.js 15 (App Router), React 19, and Tailwind CSS. The state layer utilizes browser localStorage to fulfill prototype constraints while simulating a server-less backend. Logic is strictly decoupled into `/lib` files (`bookingLogic.ts`, `validation.ts`) separate from UI components."
    },
    {
      icon: <Scale className="text-accent" size={32} />,
      title: "4. Conflict Prevention Math",
      content: "The core reservation logic mathematically guarantees no overlaps for a given asset. Evaluated via: (newStart < existingEnd AND newEnd > existingStart). If true, the system explicitly rejects the request."
    },
    {
      icon: <Database className="text-accent" size={32} />,
      title: "5. Trade-offs & Future Expansion",
      content: "The current implementation relies on localStorage for immediate demonstrability. The architecture anticipates a future migration to a PostgreSQL database (e.g. Prisma + Supabase) and NextAuth for persistent user identity and role-based access control."
    }
  ];

  return (
    <div className="py-8 max-w-4xl">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4 flex items-center gap-4 uppercase">
          <FileText size={40} className="text-accent" /> System Manifest
        </h1>
        <p className="font-mono text-gray-400 border-l-2 border-accent pl-4">
          Architectural decisions, rationale, and technical disclosures.
        </p>
      </div>

      <div className="space-y-12">
        {sections.map((section, idx) => (
          <section key={idx} className="card-brutal">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#0a0a0a] border border-border">
                {section.icon}
              </div>
              <h2 className="text-2xl font-black uppercase">{section.title}</h2>
            </div>
            <p className="font-mono text-gray-300 leading-relaxed pl-[4.5rem]">
              {section.content}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
