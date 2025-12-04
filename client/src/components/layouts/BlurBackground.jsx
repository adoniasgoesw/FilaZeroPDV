export default function BlurBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated blur balls - smaller sizes for mobile and desktop */}
            <div className="absolute top-10 right-1/4 w-32 h-32 md:w-48 lg:w-64 bg-emerald-500 rounded-full blur-2xl md:blur-3xl opacity-12 md:opacity-18 animate-float"></div>
            <div className="absolute bottom-10 left-1/5 w-40 h-40 md:w-56 lg:w-72 bg-emerald-600 rounded-full blur-2xl md:blur-3xl opacity-14 md:opacity-20 animate-float-reverse"></div>
            <div className="absolute top-1/3 right-10 w-28 h-28 md:w-40 lg:w-52 bg-emerald-700 rounded-full blur-2xl md:blur-3xl opacity-16 md:opacity-22 animate-float-slow"></div>
            <div className="absolute bottom-1/4 left-1/3 w-32 h-32 md:w-44 lg:w-56 bg-emerald-500 rounded-full blur-2xl md:blur-3xl opacity-12 md:opacity-16 animate-float-slow-reverse"></div>
            <div className="absolute top-2/3 left-1/2 w-36 h-36 md:w-52 lg:w-64 bg-emerald-600 rounded-full blur-2xl md:blur-3xl opacity-14 md:opacity-19 animate-float"></div>
            <div className="absolute bottom-1/3 right-1/3 w-24 h-24 md:w-36 lg:w-44 bg-emerald-800 rounded-full blur-2xl md:blur-3xl opacity-18 md:opacity-24 animate-float-reverse"></div>
            
            {/* Additional smaller blur effects */}
            <div className="absolute top-1/4 right-2/3 w-20 h-20 md:w-32 lg:w-40 bg-emerald-500 rounded-full blur-xl md:blur-2xl opacity-12 md:opacity-17 animate-float-slow"></div>
            <div className="absolute bottom-2/3 left-10 w-18 h-18 md:w-28 lg:w-36 bg-emerald-700 rounded-full blur-xl md:blur-2xl opacity-15 md:opacity-21 animate-float-slow-reverse"></div>
            <div className="absolute top-1/2 right-1/5 w-24 h-24 md:w-36 lg:w-48 bg-emerald-600 rounded-full blur-xl md:blur-2xl opacity-13 md:opacity-18 animate-float"></div>
            <div className="absolute bottom-1/5 right-1/2 w-16 h-16 md:w-28 lg:w-32 bg-emerald-500 rounded-full blur-xl md:blur-2xl opacity-14 md:opacity-20 animate-float-reverse"></div>
            <div className="absolute top-3/4 left-1/4 w-28 h-28 md:w-40 lg:w-52 bg-emerald-700 rounded-full blur-xl md:blur-2xl opacity-13 md:opacity-19 animate-float-slow"></div>
            <div className="absolute bottom-1/2 right-2/5 w-20 h-20 md:w-32 lg:w-40 bg-emerald-600 rounded-full blur-xl md:blur-2xl opacity-12 md:opacity-16 animate-float-slow-reverse"></div>
        </div>
    );
}
