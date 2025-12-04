import Header from '../components/layouts/Header.jsx';
import HeaderSection from '../components/layouts/HeroSection.jsx';
import BlurBackground from '../components/layouts/BlurBackground.jsx';
import FoodIcons from '../components/layouts/FoodIcons.jsx';

export default function LandingPage() {
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 relative overflow-hidden">
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2U1ZTdlYiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-15 blur-sm"></div>
            
            {/* Blur balls background */}
            <BlurBackground />
            
            {/* Food icons background */}
            <FoodIcons />
            
            {/* Content */}
            <div className="relative z-10 w-full">
                <Header />
                <HeaderSection />
            </div>
        </div>
    );
}
