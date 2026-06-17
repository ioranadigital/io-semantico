"use client";

import { useEffect, useState } from "react";

const RGPDModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const rgpdDismissed = localStorage.getItem("rgpd-dismissed");
    if (!rgpdDismissed) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("rgpd-dismissed", "true");
    setIsOpen(false);
  };

  const handleReject = () => {
    localStorage.setItem("rgpd-dismissed", "true");
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        backgroundColor: "#fff",
        borderTop: "1px solid #e0e0e0",
        boxShadow: "0 -5px 20px rgba(0, 0, 0, 0.1)",
        padding: "24px",
        zIndex: 9999,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "200px" }}>
          <p
            style={{
              margin: "0",
              lineHeight: "1.5",
              color: "#666",
              fontSize: "14px",
            }}
          >
            Utilizamos cookies para mejorar tu experiencia. Al continuar
            navegando, aceptas nuestro uso de cookies. Lee nuestra{" "}
            <a
              href="/legal"
              style={{
                color: "#4D32A5",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              política de privacidad
            </a>
            .
          </p>
        </div>
        <div style={{ display: "flex", gap: "12px", flexShrink: 0 }}>
          <button
            onClick={handleReject}
            style={{
              padding: "10px 24px",
              backgroundColor: "#f0f0f0",
              color: "#666",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e0e0e0";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f0f0f0";
            }}
          >
            Rechazar
          </button>
          <button
            onClick={handleAccept}
            style={{
              padding: "10px 24px",
              backgroundColor: "#4D32A5",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#3a2580";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#4D32A5";
            }}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default RGPDModal;
