export default function LoadingScreen() {
    return (
        <div className="fixed inset-0 bg-emerald-600 flex items-center justify-center z-[9999]">
            <div className="text-center">
                <h1 className="text-2xl md:text-3xl font-bold text-white animate-pulse">
                    FilaZero
                </h1>
            </div>
        </div>
    );
}

