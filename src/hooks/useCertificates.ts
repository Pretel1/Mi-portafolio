import { useState, useMemo, useCallback } from 'react';
import { certificates, categories, type Certificate, type CertificateCategory } from '@/data/certificates';

export function useCertificates() {
  const [activeCategory, setActiveCategory] = useState<CertificateCategory>('Todos');
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => {
    if (activeCategory === 'Todos') return certificates;
    return certificates.filter((c) => c.category === activeCategory);
  }, [activeCategory]);

  const openModal = useCallback((cert: Certificate) => {
    setSelectedCert(cert);
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => setSelectedCert(null), 300);
  }, []);

  const navigateCert = useCallback(
    (direction: 'prev' | 'next') => {
      if (!selectedCert) return;
      const currentIndex = filtered.findIndex((c) => c.id === selectedCert.id);
      const nextIndex =
        direction === 'next'
          ? (currentIndex + 1) % filtered.length
          : (currentIndex - 1 + filtered.length) % filtered.length;
      setSelectedCert(filtered[nextIndex]);
    },
    [selectedCert, filtered]
  );

  // BUGFIX: Changed parameter to accept a string filename instead of a Certificate object
  const getCertUrl = useCallback((filename: string) => {
    return `/certificates/${filename}`;
  }, []);

  return {
    certificates: filtered,
    allCertificates: certificates,
    categories,
    activeCategory,
    setActiveCategory,
    selectedCert,
    modalOpen,
    openModal,
    closeModal,
    navigateCert,
    getCertUrl,
  };
}
