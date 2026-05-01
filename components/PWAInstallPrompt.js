import { useState, useEffect } from 'react';
import styles from '../styles/PWAInstall.module.css';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Update UI to notify the user they can install the PWA
      setShowInstallButton(true);
    };

    const handleAppInstalled = () => {
      // Hide the install button when the PWA is installed
      setShowInstallButton(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    // Reset the deferred prompt
    setDeferredPrompt(null);
    setShowInstallButton(false);
  };

  if (!showInstallButton) return null;

  return (
    <div className={styles.installPrompt}>
      <div className={styles.installContent}>
        <div className={styles.installIcon}>📱</div>
        <div className={styles.installText}>
          <h3>Install Karmanya</h3>
          <p>Get the full app experience on your device!</p>
        </div>
        <div className={styles.installActions}>
          <button onClick={handleInstallClick} className={styles.installButton}>
            Install
          </button>
          <button onClick={() => setShowInstallButton(false)} className={styles.dismissButton}>
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
