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
        <section className="w-full min-h-screen flex items-center px-10 py-20 relative">
            <div className="w-full px-6 grid md:grid-cols-[60%_40%] gap-8 items-stretch h-full min-h-[calc(100vh-10rem)]">
                {/* Left side - Text content aligned to end */}
                <div className="flex flex-col justify-end items-start text-left space-y-4">
                    <h2 className="text-xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                        Seu cliente não espera, seu sistema também não.
                    </h2>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-md">
                        Gerencie suas filas de atendimento de forma inteligente e eficiente.
                    </p>
                </div>

                {/* Right side - Panel/Modal */}
                <div className="flex justify-end h-full relative">
                    <div className="w-full h-full">
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
