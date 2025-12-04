import { useState } from 'react';
import SignUp from '../modals/SignUp.jsx';
import Login from '../modals/Login.jsx';

export default function HeaderSection() {
    const [showSignUp, setShowSignUp] = useState(true);
    const [showLogin, setShowLogin] = useState(false);

    const handleSwitchToLogin = () => {
        setShowSignUp(false);
        setShowLogin(true);
    };

    const handleSwitchToSignUp = () => {
        setShowLogin(false);
        setShowSignUp(true);
    };

    const handleCloseSignUp = () => {
        setShowSignUp(false);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    return (
        <section className="w-full min-h-screen flex flex-col md:flex-row items-center px-4 md:px-10 py-20 md:py-20 relative pt-24 md:pt-20">
            <div className="w-full px-3 md:px-6 flex flex-col md:grid md:grid-cols-[60%_40%] gap-6 md:gap-8 items-stretch h-full min-h-[calc(100vh-8rem)] md:min-h-[calc(100vh-10rem)]">
                {/* Text content - Top on mobile, left on desktop */}
                <div className="flex flex-col justify-start md:justify-end items-start text-left space-y-2 md:space-y-4 order-1 md:order-none">
                    <h2 className="text-xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Seu cliente não espera,<br className="md:hidden" /> seu sistema também não.
                    </h2>
                    <p className="text-sm md:text-sm text-gray-600 leading-relaxed max-w-md">
                        Gerencie suas filas de atendimento de forma inteligente e eficiente.
                    </p>
                </div>

                {/* Panel/Modal - Bottom on mobile, right on desktop */}
                <div className="flex justify-center md:justify-end h-full relative w-full md:col-span-1 order-2 md:order-none">
                    <div className="w-full max-w-md md:max-w-none h-full">
                        {showSignUp && (
                            <SignUp
                                onSwitchToLogin={handleSwitchToLogin}
                                onClose={handleCloseSignUp}
                            />
                        )}
                        {showLogin && (
                            <Login
                                onSwitchToSignUp={handleSwitchToSignUp}
                                onClose={handleCloseLogin}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
