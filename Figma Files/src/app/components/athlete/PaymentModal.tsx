import { useState, useRef } from 'react';
import { X, Upload, CheckCircle, FileText, Copy } from 'lucide-react';

export interface SubmittedPayment {
  amount: number;
  fileName: string;
  fileData: string;
}

interface PaymentModalProps {
  onClose: () => void;
  onSubmit: (payment: SubmittedPayment) => void;
}

const COACH_BANK = {
  Banco: 'Banco Santander',
  'Tipo de cuenta': 'Cuenta Corriente',
  'Número de cuenta': '0072-0001-12-0123456789',
  Titular: 'Tomás Johansson',
  RUT: '12.345.678-9',
  Email: 'coach@athletica.app',
};

export default function PaymentModal({ onClose, onSubmit }: PaymentModalProps) {
  const [amount, setAmount] = useState('');
  const [file, setFile] = useState<{ name: string; data: string } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFile({ name: f.name, data: ev.target?.result as string });
    };
    reader.readAsDataURL(f);
  };

  const handleCopy = (value: string, key: string) => {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(''), 1500);
  };

  const handleSubmit = () => {
    if (!amount || !file) return;
    onSubmit({ amount: parseFloat(amount), fileName: file.name, fileData: file.data });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/60 flex items-end justify-center z-50" onClick={onClose}>
        <div className="bg-card rounded-t-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-lg text-center">¡Comprobante enviado!</h2>
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              Tu comprobante ha sido enviado al coach para su revisión. Te notificaremos cuando sea aprobado.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl"
            >
              Entendido
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end justify-center z-50" onClick={onClose}>
      <div
        className="bg-card rounded-t-2xl p-5 w-full max-w-md max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle bar */}
        <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg">Realizar Pago</h2>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Coach info */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            T
          </div>
          <div>
            <p className="text-sm font-medium">Coach Tomás Johansson</p>
            <p className="text-xs text-muted-foreground">Plan Starter · $29/mes</p>
          </div>
        </div>

        {/* Wire transfer info */}
        <div className="bg-muted/40 rounded-xl p-4 mb-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            Datos de transferencia
          </p>
          <div className="space-y-2.5">
            {Object.entries(COACH_BANK).map(([label, value]) => (
              <div key={label} className="flex items-center justify-between gap-2">
                <span className="text-xs text-muted-foreground shrink-0">{label}</span>
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-xs font-medium truncate">{value}</span>
                  <button
                    onClick={() => handleCopy(value, label)}
                    className="shrink-0 text-muted-foreground hover:text-primary transition-colors"
                  >
                    {copied === label ? (
                      <CheckCircle className="w-3.5 h-3.5 text-primary" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Amount input */}
        <div className="mb-4">
          <label className="text-xs text-muted-foreground mb-1.5 block">Monto a transferir</label>
          <div className="flex items-center gap-2 bg-background border border-border rounded-xl px-4 py-3 focus-within:border-primary transition-colors">
            <span className="text-muted-foreground text-sm">$</span>
            <input
              type="number"
              placeholder="29.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>

        {/* File upload */}
        <div className="mb-5">
          <label className="text-xs text-muted-foreground mb-1.5 block">Comprobante de pago</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          {file ? (
            <div className="flex items-center gap-3 bg-primary/10 border border-primary/30 rounded-xl p-3">
              <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm flex-1 truncate">{file.name}</span>
              <button
                onClick={() => setFile(null)}
                className="text-muted-foreground hover:text-foreground shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-border rounded-xl p-5 flex flex-col items-center gap-2 hover:border-primary/50 transition-colors"
            >
              <Upload className="w-6 h-6 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Adjuntar comprobante</span>
              <span className="text-xs text-muted-foreground">Imagen o PDF</span>
            </button>
          )}
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={!amount || !file}
          className="w-full bg-primary text-primary-foreground py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          Enviar comprobante
        </button>
      </div>
    </div>
  );
}
