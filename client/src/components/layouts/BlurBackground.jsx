export default function BlurBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Animated blur balls - repositioned with varied green tones */}
            <div className="absolute top-10 right-1/4 w-80 h-80 bg-emerald-500 rounded-full blur-3xl opacity-18 animate-float"></div>
            <div className="absolute bottom-10 left-1/5 w-96 h-96 bg-emerald-600 rounded-full blur-3xl opacity-20 animate-float-reverse"></div>
            <div className="absolute top-1/3 right-10 w-64 h-64 bg-emerald-700 rounded-full blur-3xl opacity-22 animate-float-slow"></div>
            <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-emerald-500 rounded-full blur-3xl opacity-16 animate-float-slow-reverse"></div>
            <div className="absolute top-2/3 left-1/2 w-88 h-88 bg-emerald-600 rounded-full blur-3xl opacity-19 animate-float"></div>
            <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-emerald-800 rounded-full blur-3xl opacity-24 animate-float-reverse"></div>
            
            {/* Additional smaller blur effects - repositioned */}
            <div className="absolute top-1/4 right-2/3 w-52 h-52 bg-emerald-500 rounded-full blur-2xl opacity-17 animate-float-slow"></div>
            <div className="absolute bottom-2/3 left-10 w-48 h-48 bg-emerald-700 rounded-full blur-2xl opacity-21 animate-float-slow-reverse"></div>
            <div className="absolute top-1/2 right-1/5 w-60 h-60 bg-emerald-600 rounded-full blur-2xl opacity-18 animate-float"></div>
            <div className="absolute bottom-1/5 right-1/2 w-44 h-44 bg-emerald-500 rounded-full blur-2xl opacity-20 animate-float-reverse"></div>
            <div className="absolute top-3/4 left-1/4 w-68 h-68 bg-emerald-700 rounded-full blur-2xl opacity-19 animate-float-slow"></div>
            <div className="absolute bottom-1/2 right-2/5 w-50 h-50 bg-emerald-600 rounded-full blur-2xl opacity-16 animate-float-slow-reverse"></div>
        </div>
    );
}
