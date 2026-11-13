import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export default function App() {
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState('Escolha uma opção para registrar uma imagem.');
  const [busy, setBusy] = useState(false);

  async function capturePhoto(source) {
    setBusy(true);
    setStatus('Solicitando acesso à câmera ou galeria...');

    try {
      const permissions = await Camera.checkPermissions();
      const permissionName = source === CameraSource.Camera ? 'camera' : 'photos';

      if (permissions[permissionName] === 'denied') {
        const requested = await Camera.requestPermissions({
          permissions: [permissionName],
        });
        if (requested[permissionName] === 'denied') {
          setStatus('Permissão negada. Autorize o acesso nas configurações do Android.');
          return;
        }
      }

      const image = await Camera.getPhoto({
        quality: 85,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source,
        saveToGallery: false,
        correctOrientation: true,
      });

      if (!image.webPath) {
        setStatus('Não foi possível carregar a pré-visualização da imagem.');
        return;
      }

      setPhoto({
        webPath: image.webPath,
        format: image.format,
      });
      setStatus('Imagem carregada com sucesso! Ela está sendo exibida no aplicativo.');
    } catch (error) {
      // Cancelar a câmera ou o seletor da galeria também pode rejeitar a Promise.
      // O catch impede que o cancelamento interrompa a aplicação.
      console.info('Captura/seleção cancelada ou indisponível:', error);
      setStatus('Ação cancelada ou não concluída. O aplicativo continua funcionando.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true">📚</div>
        <div>
          <p className="eyebrow">BIBLIOTECA ITINERANTE</p>
          <h1>BiblioMóvel</h1>
        </div>
      </header>

      <section className="hero">
        <span className="tag">Aula 12 · Câmera nativa</span>
        <h2>Registre a visita da biblioteca.</h2>
        <p>Use a câmera do celular ou escolha uma imagem da galeria para registrar a experiência do BiblioMóvel.</p>
      </section>

      <section className="panel">
        <h3>Adicionar fotografia</h3>
        <p className="muted">Escolha como deseja adicionar sua imagem.</p>
        <div className="actions">
          <button className="primary" onClick={() => capturePhoto(CameraSource.Camera)} disabled={busy}>
            <span aria-hidden="true">📷</span> Tirar foto
          </button>
          <button className="secondary" onClick={() => capturePhoto(CameraSource.Photos)} disabled={busy}>
            <span aria-hidden="true">🖼️</span> Abrir galeria
          </button>
        </div>

        <div className="status" role="status" aria-live="polite">
          <strong>Status</strong>
          <p>{busy ? 'Processando...' : status}</p>
        </div>

        {photo && (
          <div className="preview">
            <div className="preview-heading">
              <h3>Pré-visualização</h3>
              <span className="format">{photo.format.toUpperCase()}</span>
            </div>
            <img src={photo.webPath} alt="Imagem selecionada para o BiblioMóvel" />
            <button className="text-button" onClick={() => { setPhoto(null); setStatus('Imagem removida da pré-visualização.'); }}>
              Remover imagem
            </button>
          </div>
        )}
      </section>

      <footer>
        <span>Projeto acadêmico · Número 23</span>
        <span>Serviço público • Leitura • Comunidade</span>
      </footer>
    </main>
  );
}
