import { useState, useCallback, useRef, useEffect } from 'react';

export type ModalType = 'signIn' | 'signUpStep1' | 'signUpStep2' | 'forgotPassword' | null;

interface UseModalReturn {
  currentModal: ModalType;
  showModal: (modalType: ModalType) => void;
  hideModal: () => void;
  showSignUpStep1: () => void;
  showSignUpStep2: () => void;
  showForgotPassword: () => void;
  showSignIn: () => void;
  isModalOpen: boolean;
}

export const useModal = (): UseModalReturn => {
  const [currentModal, setCurrentModal] = useState<ModalType>(null);
  const previousModal = useRef<ModalType>(null);

  const showModal = useCallback((modalType: ModalType) => {
    previousModal.current = currentModal;
    setCurrentModal(modalType);
  }, [currentModal]);

  const hideModal = useCallback(() => {
    previousModal.current = currentModal;
    setCurrentModal(null);
  }, [currentModal]);

  const showSignUpStep1 = useCallback(() => {
    showModal('signUpStep1');
  }, [showModal]);

  const showSignUpStep2 = useCallback(() => {
    showModal('signUpStep2');
  }, [showModal]);

  const showForgotPassword = useCallback(() => {
    showModal('forgotPassword');
  }, [showModal]);

  const showSignIn = useCallback(() => {
    showModal('signIn');
  }, [showModal]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && currentModal) {
        hideModal();
      }
    };

    if (currentModal) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [currentModal, hideModal]);

  // Handle body scroll
  useEffect(() => {
    if (currentModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [currentModal]);

  return {
    currentModal,
    showModal,
    hideModal,
    showSignUpStep1,
    showSignUpStep2,
    showForgotPassword,
    showSignIn,
    isModalOpen: currentModal !== null
  };
}; 