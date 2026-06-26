"use client";
import { FC, useState } from "react";

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CallModal: FC<CallModalProps> = ({ isOpen, onClose }) => {
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone && consent) {
      console.log("Teléfono enviado:", phone);
      setPhone("");
      setConsent(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="call-modal-overlay" onClick={onClose}>
      <div className="call-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* Botón Cerrar */}
        <button className="call-modal-close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Título */}
        <h2 className="call-modal-header">Te llamamos gratis</h2>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="call-modal-form">
          <div className="call-modal-input-group">
            <label htmlFor="phone" className="call-modal-label">
              Número de teléfono*
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Número de teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="call-modal-input"
              required
            />
          </div>

          {/* Checkbox Consentimiento */}
          <div className="call-modal-checkbox-group">
            <input
              id="consent"
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="call-modal-checkbox"
              required
            />
            <label htmlFor="consent" className="call-modal-checkbox-label">
              Autorizo a contactarme comercialmente por email, teléfono y/o via
              Whatsapp sobre los servicios y productos relativos al marketing
              digital y directorios. Ver información sobre protección de datos
            </label>
          </div>

          {/* Botón Submit */}
          <button type="submit" className="call-modal-submit-btn">
            Te llamamos
          </button>
        </form>

        {/* Divisor */}
        <div className="call-modal-divider"></div>

        {/* Sección Información */}
        <div className="call-modal-info-section">
          <h3 className="call-modal-info-title">
            Si lo prefieres puedes llamarnos
          </h3>

          <div className="call-modal-info-item">
            <p className="call-modal-info-label">Llama ahora</p>
            <p className="call-modal-phone-number">91 177 60 35</p>
          </div>

          <div className="call-modal-info-item">
            <p className="call-modal-info-label">Horario</p>
            <p className="call-modal-info-text">
              de lunes a viernes <strong>de 9:00 a 19:00</strong>
            </p>
            <p className="call-modal-info-note">
              *servicio exclusivo para España
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallModal;
