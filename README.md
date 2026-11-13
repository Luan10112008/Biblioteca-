# BiblioMóvel · Aula 12 — Câmera Nativa

Aplicativo acadêmico React + Capacitor para demonstrar a captura de uma foto pela câmera nativa ou a seleção de uma imagem da galeria, com pré-visualização na interface.

## Requisitos

- Node.js LTS e npm
- Android Studio
- Android SDK
- Dispositivo Android com depuração USB ou emulador

## Instalação

```bash
npm install
npx cap add android
npm run build
npx cap sync android
npx cap open android
```

Se a pasta `android/` já existir, não execute `npx cap add android` novamente.

## Executar no navegador

```bash
npm run dev
```

A câmera nativa deve ser testada em dispositivo Android ou emulador compatível. O navegador pode apresentar comportamento diferente.

## Funcionalidades da Aula 12

- Botão para abrir a câmera.
- Botão para selecionar uma imagem da galeria.
- Uso de `Camera.getPhoto()` com `CameraResultType.Uri`.
- Renderização da imagem usando `webPath`.
- Tratamento de cancelamento e erros com `try/catch`.
- Estado de carregamento e mensagens de status.

## Permissões Android

Depois de executar `npx cap add android`, abra:

`android/app/src/main/AndroidManifest.xml`

Dentro da tag `<manifest>` e antes de `<application>`, confira/adapte as permissões conforme a versão Android e o fluxo exigido pela atividade:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission
    android:name="android.permission.READ_EXTERNAL_STORAGE"
    android:maxSdkVersion="32" />
```

O seletor de fotos do Android pode não exigir permissão ampla de armazenamento em versões recentes. Não duplique declarações existentes. Para a entrega, demonstre a solicitação de permissão nativa e valide o comportamento no aparelho utilizado.

## Roteiro do vídeo de entrega

1. Abrir o BiblioMóvel no Android.
2. Tocar em **Tirar foto** e demonstrar o diálogo de permissão, se solicitado.
3. Capturar uma foto e mostrar a pré-visualização.
4. Abrir novamente a câmera e cancelar/voltar.
5. Mostrar que o aplicativo continua funcionando e apresenta uma mensagem de status.

## Identificação

- Aplicativo: BiblioMóvel
- Número: 23
- Tema: acompanhar em qual praça está a biblioteca itinerante da prefeitura.

## Observação

Esta pasta corresponde somente à Aula 12. As integrações com Supabase Storage, geolocalização, notificações, ícones e Splash Screen serão adicionadas em entregas separadas nas respectivas atividades.
