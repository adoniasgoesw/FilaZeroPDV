import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import { NotificationProvider } from './contexts/NotificationContext.jsx';

export default function App() {
    return (
        <NotificationProvider>
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </NotificationProvider>
    );
}

