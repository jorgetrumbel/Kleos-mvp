import { useRef, useState, useEffect } from 'react';
import { X, Pen, Eraser, RotateCcw, Trash2, Minus, Plus } from 'lucide-react';

interface DrawingBoardProps {
  onSave: (dataUrl: string, fileName: string) => void;
  onClose: () => void;
}

const COLORS = [
  '#ffffff', '#c4ff0e', '#4ade80', '#38bdf8',
  '#f87171', '#fb923c', '#c084fc', '#fbbf24', '#000000',
];

export function DrawingBoard({ onSave, onClose }: DrawingBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#ffffff');
  const [lineWidth, setLineWidth] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [history, setHistory] = useState<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#1a3a45';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (
    e: React.MouseEvent | React.TouchEvent,
    canvas: HTMLCanvasElement
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e, canvas);
    setIsDrawing(true);
    setLastPos(pos);
    setHistory((prev) => [
      ...prev.slice(-20),
      ctx.getImageData(0, 0, canvas.width, canvas.height),
    ]);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.strokeStyle = isEraser ? '#1a3a45' : color;
    ctx.lineWidth = isEraser ? lineWidth * 4 : lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    setLastPos(pos);
  };

  const stopDrawing = () => setIsDrawing(false);

  const undo = () => {
    const canvas = canvasRef.current;
    if (!canvas || history.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.putImageData(history[history.length - 1], 0, 0);
    setHistory((h) => h.slice(0, -1));
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#1a3a45';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHistory([]);
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    onSave(dataUrl, `pizarra-${Date.now()}.png`);
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-card border-b border-border flex-shrink-0">
        <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
          <X className="w-5 h-5" />
        </button>
        <span className="font-medium text-sm">Pizarra</span>
        <button
          onClick={save}
          className="px-4 py-1.5 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors"
        >
          Guardar
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-card/80 border-b border-border flex-shrink-0 overflow-x-auto">
        {/* Colors */}
        <div className="flex gap-1.5 flex-shrink-0">
          {COLORS.map((c) => (
            <button
              key={c}
              onClick={() => {
                setColor(c);
                setIsEraser(false);
              }}
              className={`w-6 h-6 rounded-full border-2 transition-all flex-shrink-0 ${
                color === c && !isEraser
                  ? 'border-white scale-125'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <div className="w-px h-6 bg-border flex-shrink-0" />

        {/* Tool buttons */}
        <button
          onClick={() => setIsEraser(false)}
          className={`p-1.5 rounded-lg flex-shrink-0 transition-colors ${
            !isEraser ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'
          }`}
        >
          <Pen className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsEraser(true)}
          className={`p-1.5 rounded-lg flex-shrink-0 transition-colors ${
            isEraser ? 'bg-primary text-primary-foreground' : 'hover:bg-muted text-muted-foreground'
          }`}
        >
          <Eraser className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-border flex-shrink-0" />

        {/* Line width */}
        <button
          onClick={() => setLineWidth((w) => Math.max(1, w - 2))}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-xs w-5 text-center flex-shrink-0">{lineWidth}</span>
        <button
          onClick={() => setLineWidth((w) => Math.min(20, w + 2))}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-border flex-shrink-0" />

        <button
          onClick={undo}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={clear}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors flex-shrink-0 text-red-400"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full h-full touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
    </div>
  );
}
