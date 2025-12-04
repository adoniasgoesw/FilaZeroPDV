export default function Header() {
    return (
        <header className="w-full fixed top-0 left-0 right-0 px-10 pt-10 z-40 ">
            <div className="w-full px-6 py-4">
                <div className="flex items-center gap-3">
                    {/* Logo SVG from index.html */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 32 32"
                        className="w-8 h-8"
                    >
                        <rect width="32" height="32" rx="8" fill="#111827" />
                        <path
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            transform="translate(4,4) scale(1)"
                        />
                    </svg>
                    {/* Title */}
                    <h1 className="text-2xl font-bold text-gray-900">FilaZero PDV</h1>
                </div>
            </div>
        </header>
    );
}
