import type { SiteStatus } from "@/lib/site-status";

export default function ComingSoon({ status }: { status: SiteStatus }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 px-6 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary-200/40 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-primary-300/30 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-2xl">
        <div className="inline-block mb-8 text-7xl md:text-8xl">🌿</div>
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
          {status.heading}
        </h1>
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed whitespace-pre-line">
          {status.message}
        </p>
      </div>
    </div>
  );
}
