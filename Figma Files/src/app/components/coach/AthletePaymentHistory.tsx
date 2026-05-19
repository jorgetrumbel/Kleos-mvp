import { ArrowLeft, CheckCircle, Clock, XCircle, CreditCard } from 'lucide-react';

interface Payment {
  id: string;
  amount: number;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  fileName?: string;
  fileData?: string;
}

interface AthletePaymentHistoryProps {
  athleteName: string;
  payments: Payment[];
  onBack: () => void;
  onOpenApproval?: () => void;
}

export default function AthletePaymentHistory({
  athleteName,
  payments,
  onBack,
  onOpenApproval,
}: AthletePaymentHistoryProps) {
  const hasPendingPayment = payments.some(p => p.status === 'pending');

  return (
    <div className="h-full overflow-y-auto pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b border-border p-4 flex items-center gap-3 z-10">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-muted transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-medium">Historial de pagos</h1>
          <p className="text-sm text-muted-foreground">{athleteName}</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Pending payment alert */}
        {hasPendingPayment && onOpenApproval && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="w-5 h-5 text-amber-400" />
              <div className="flex-1">
                <p className="text-sm font-medium text-amber-300">Pago pendiente de aprobación</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  El atleta ha enviado un comprobante para revisión
                </p>
              </div>
            </div>
            <button
              onClick={onOpenApproval}
              className="w-full py-2.5 bg-amber-500 text-white rounded-lg hover:bg-amber-400 transition-colors font-medium"
            >
              Revisar comprobante
            </button>
          </div>
        )}

        {/* Payment History */}
        <div>
          <h3 className="text-sm font-medium mb-3 text-muted-foreground uppercase tracking-wider">
            Historial
          </h3>
          {payments.length === 0 ? (
            <div className="bg-muted/50 rounded-xl p-6 text-center">
              <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No hay pagos registrados</p>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="bg-card rounded-xl p-4 border border-border"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        payment.status === 'approved'
                          ? 'bg-green-500/20'
                          : payment.status === 'pending'
                          ? 'bg-amber-500/20'
                          : 'bg-red-500/20'
                      }`}
                    >
                      {payment.status === 'approved' && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                      {payment.status === 'pending' && (
                        <Clock className="w-5 h-5 text-amber-400" />
                      )}
                      {payment.status === 'rejected' && (
                        <XCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className="font-medium">${payment.amount.toFixed(2)}</p>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            payment.status === 'approved'
                              ? 'bg-green-500/20 text-green-300'
                              : payment.status === 'pending'
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-red-500/20 text-red-300'
                          }`}
                        >
                          {payment.status === 'approved'
                            ? 'Aprobado'
                            : payment.status === 'pending'
                            ? 'Pendiente'
                            : 'Rechazado'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{payment.date}</p>
                      {payment.fileName && (
                        <p className="text-xs text-muted-foreground mt-1">
                          📎 {payment.fileName}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <h3 className="text-sm font-medium mb-3">Resumen</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Pagos aprobados</span>
              <span className="text-green-400">
                {payments.filter((p) => p.status === 'approved').length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Pagos pendientes</span>
              <span className="text-amber-400">
                {payments.filter((p) => p.status === 'pending').length}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Pagos rechazados</span>
              <span className="text-red-400">
                {payments.filter((p) => p.status === 'rejected').length}
              </span>
            </div>
            <div className="pt-2 mt-2 border-t border-border flex items-center justify-between font-medium">
              <span>Total recibido</span>
              <span className="text-primary">
                $
                {payments
                  .filter((p) => p.status === 'approved')
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
