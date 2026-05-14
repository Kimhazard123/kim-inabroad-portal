export default function ApplyPage() {
  return (
    <main className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto rounded-2xl border border-gray-200 shadow-lg p-8 bg-white">

        <h1 className="text-3xl font-bold text-[#0B5D7A] mb-3">
          Smart Student Application
        </h1>

        <p className="text-gray-600 mb-6">
          Please upload all required academic and personal documents using the secure document upload form below.
        </p>

        <a
          href="https://forms.gle/5vDiUdtjeNtnTbsE8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#0B5D7A] hover:bg-[#094862] text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          Upload Documents
        </a>

      </div>
    </main>
  );
}