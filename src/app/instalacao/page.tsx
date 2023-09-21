'use client'

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

function DownloadPWAButton() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        // Evento disparado quando o navegador detecta que o PWA é instalável.
        window.addEventListener('beforeinstallprompt', (event) => {
            event.preventDefault(); // Evita que o prompt seja exibido automaticamente.
            setDeferredPrompt(event);
        });
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            // Exibe o prompt quando o botão é clicado.
            deferredPrompt.prompt();

            // Aguarda o usuário responder ao prompt.
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                } else {
                }

                setDeferredPrompt(null);
            });
        }
    };

    return (
        <div className='w-screen min-h-screen max-h-fit'>

            <div className='flex items-center justify-center h-screen'>
                <Button onClick={handleInstallClick} className=''>Baixar Aplicativo</Button>
            </div>
        </div>
    );
}

export default DownloadPWAButton;
