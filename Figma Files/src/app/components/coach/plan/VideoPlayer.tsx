import { useState, useRef } from 'react';
import { X, Upload, PlayCircle } from 'lucide-react';

interface VideoPlayerProps {
  initialUrl?: string;
  onSave: (url: string) => void;
  onClose: () => void;
}

function getEmbedUrl(url: string): string | null {
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
}

export function VideoPlayer({ initialUrl, onSave, onClose }: VideoPlayerProps) {
  const [tab, setTab] = useState<'url' | 'upload'>('url');
  const [url, setUrl] = useState(initialUrl || '');
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const embedUrl = url ? getEmbedUrl(url) : null;
  const isDirectVideo = url && !embedUrl && (url.startsWith('blob:') || /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setBlobUrl(objectUrl);
    setUrl(objectUrl);
  };

  const handleSave = () => {
    if (url) onSave(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end">
      <div className="w-full bg-card rounded-t-2xl border-t border-border max-w-[480px] mx-auto">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="font-medium text-sm">Video del Ejercicio</span>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setTab('url')}
            className={`flex-1 py-2.5 text-sm transition-colors ${
              tab === 'url'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Pegar URL
          </button>
          <button
            onClick={() => setTab('upload')}
            className={`flex-1 py-2.5 text-sm transition-colors ${
              tab === 'upload'
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Subir Archivo
          </button>
        </div>

        <div className="p-4 space-y-3">
          {tab === 'url' ? (
            <>
              <input
                type="url"
                placeholder="YouTube, Vimeo o URL directa de video..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-3 py-2.5 bg-input rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {url && (
                <div className="rounded-xl overflow-hidden bg-black aspect-video">
                  {embedUrl ? (
                    <iframe src={embedUrl} className="w-full h-full" allowFullScreen />
                  ) : isDirectVideo ? (
                    <video src={url} controls className="w-full h-full" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
                      <PlayCircle className="w-8 h-8 opacity-50" />
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-8 border-2 border-dashed border-border rounded-xl flex flex-col items-center gap-2 hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <Upload className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Toca para seleccionar video</span>
                <span className="text-xs text-muted-foreground opacity-60">MP4, WebM, MOV</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              {blobUrl && (
                <div className="rounded-xl overflow-hidden bg-black aspect-video">
                  <video src={blobUrl} controls className="w-full h-full" />
                </div>
              )}
            </>
          )}

          <div className="flex gap-2 pt-1">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-muted rounded-xl text-sm hover:bg-muted/80 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              disabled={!url}
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl text-sm hover:bg-primary/90 transition-colors disabled:opacity-40"
            >
              Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
