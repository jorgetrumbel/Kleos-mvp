import { useState } from 'react';
import { X, CheckCircle, XCircle, FileText, Eye, DollarSign } from 'lucide-react';

export interface PendingPayment {
  id: string;
  athleteName: string;
  athleteInitial: string;
  amount: number;
  date: string;
  fileName: string;
  fileData: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface CoachPaymentApprovalModalProps {
  payment: PendingPayment;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onClose: () => void;
}

export default function CoachPaymentApprovalModal({
  payment,
  onApprove,
  onReject,
  onClose,
}: CoachPaymentApprovalModalProps) {
  const [showProof, setShowProof] = useState(false);
  const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null);

  const handleApprove = () => {
    setDecision('approved');
    setTimeout(() => {
      onApprove(payment.id);
      onClose();
    }, 1400);
  };

  const handleReject = () => {
    setDecision('rejected');
    setTimeout(() => {
      onReject(payment.id);
      onClose();
    }, 1400);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-end justify-center z-50" onClick={onClose}>
        <div
          className="bg-card rounded-t-2xl p-5 w-full max-w-md"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Handle bar */}
          <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />

          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg">Aprobar pago</h2>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {decision ? (
            <div className="flex flex-col items-center gap-4 py-8">
              {decision === 'approved' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-center">Pago aprobado exitosamente</p>
                  <p className="text-sm text-muted-foreground text-center">
                    Se ha notificado a {payment.athleteName}
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                    <XCircle className="w-8 h-8 text-red-400" />
                  </div>
                  <p className="text-center">Pago rechazado</p>
                  <p className="text-sm text-muted-foreground text-center">
                    Se ha notificado a {payment.athleteName}
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              {/* Athlete + amount summary */}
              <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/30 flex items-center justify-center font-medium text-lg">
                  {payment.athleteInitial}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{payment.athleteName}</p>
                  <p className="text-xs text-muted-foreground">{payment.date}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-primary">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-xl font-medium">{payment.amount}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">transferencia</p>
                </div>
              </div>

              {/* Proof document */}
              <div className="mb-5">
                <p className="text-xs text-muted-foreground mb-2">Comprobante adjunto</p>
                <button
                  className="w-full flex items-center gap-3 bg-muted/50 rounded-xl p-3 hover:bg-muted transition-colors"
                  onClick={() => setShowProof(true)}
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm truncate">{payment.fileName}</p>
                    <p className="text-xs text-muted-foreground">Toca para ver</p>
                  </div>
                  <Eye className="w-4 h-4 text-muted-foreground shrink-0" />
                </button>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleReject}
                  className="flex-1 py-3 rounded-xl border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  Rechazar
                </button>
                <button
                  onClick={handleApprove}
                  className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground"
                >
                  Aprobar
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Proof viewer overlay */}
      {showProof && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] p-4"
          onClick={() => setShowProof(false)}
        >
          <div className="relative max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowProof(false)}
              className="absolute -top-10 right-0 text-white p-2"
            >
              <X className="w-6 h-6" />
            </button>
            {payment.fileData.startsWith('data:image') ? (
              <img
                src={payment.fileData}
                alt="Comprobante de pago"
                className="w-full rounded-xl shadow-2xl"
              />
            ) : (
              <div className="bg-card rounded-xl p-8 flex flex-col items-center gap-4">
                <FileText className="w-16 h-16 text-primary" />
                <p className="text-sm text-center text-muted-foreground">
                  Vista previa no disponible para PDF
                </p>
                <p className="text-xs text-muted-foreground">{payment.fileName}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
