# Instruções para Gerar APK do TV Box Launcher

## Pré-requisitos
- Node.js instalado
- Android Studio instalado
- Java JDK 11 ou superior

## Passos para Gerar o APK

### 1. Exportar o Projeto para GitHub
- Clique no botão "Export to GitHub" no Lovable
- Clone o repositório para sua máquina local

### 2. Instalar Dependências
```bash
npm install
```

### 3. Build do Projeto Web
```bash
npm run build
```

### 4. Sincronizar com Android
```bash
npx cap sync android
```

### 5. Abrir no Android Studio
```bash
npx cap open android
```

### 6. Gerar APK no Android Studio

#### Opção A: APK de Debug (para testes)
1. No Android Studio, vá em: **Build → Build Bundle(s) / APK(s) → Build APK(s)**
2. Aguarde a compilação
3. O APK estará em: `android/app/build/outputs/apk/debug/app-debug.apk`

#### Opção B: APK Release (para distribuição)
1. No Android Studio, vá em: **Build → Generate Signed Bundle / APK**
2. Selecione **APK**
3. Crie uma keystore (se não tiver) ou use uma existente
4. Preencha os dados da keystore
5. Selecione **release** como build variant
6. O APK estará em: `android/app/build/outputs/apk/release/app-release.apk`

### 7. Distribuir o APK

Você pode hospedar o APK de várias formas:

#### Opção 1: GitHub Releases
1. Vá no seu repositório GitHub
2. Clique em "Releases" → "Create a new release"
3. Faça upload do APK
4. Publique a release
5. O link direto será: `https://github.com/seu-usuario/seu-repo/releases/download/v1.0/app-release.apk`

#### Opção 2: Servidor Web Próprio
1. Faça upload do APK para seu servidor
2. Configure o MIME type: `application/vnd.android.package-archive`
3. Acesse via: `https://seusite.com/tvbox-launcher.apk`

#### Opção 3: Google Drive
1. Faça upload do APK para o Google Drive
2. Clique com botão direito → Compartilhar
3. Configure para "Qualquer pessoa com o link"
4. Use um encurtador de URL se necessário

### 8. Instalação no TV Box

1. No TV Box, abra o navegador
2. Digite o URL do APK
3. O download começará automaticamente
4. Após o download, clique para instalar
5. Permita instalação de fontes desconhecidas (se solicitado)

## Configurações para TV Box

O manifest já está configurado com:
- ✅ Categoria LEANBACK_LAUNCHER (para aparecer no launcher de TV)
- ✅ Orientação landscape
- ✅ Suporte para controle remoto
- ✅ Tela sem necessidade de touchscreen

## Atualizações Futuras

Para atualizar o app:
1. Faça as mudanças no código
2. Aumente o versionCode em `android/app/build.gradle`
3. Gere novo APK
4. Distribua o novo APK

## Troubleshooting

Se tiver problemas:
- Certifique-se que o Android SDK está instalado
- Verifique se o Java JDK está configurado
- Execute `npx cap doctor` para diagnosticar problemas
- Limpe o build: `cd android && ./gradlew clean`

## Recursos Úteis

- [Documentação Capacitor](https://capacitorjs.com/docs/android)
- [Documentação Android TV](https://developer.android.com/tv)
- [Lovable + Capacitor](https://docs.lovable.dev/tips-tricks/mobile-apps)
