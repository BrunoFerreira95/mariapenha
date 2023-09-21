'use client'

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
          console.log('Usuário aceitou a instalação');
        } else {
          console.log('Usuário recusou a instalação');
        }

        setDeferredPrompt(null);
      });
    }
  };

  return (
    <button onClick={handleInstallClick}>Baixar PWA</button>
  );
}

export default DownloadPWAButton;
