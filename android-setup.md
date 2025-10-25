# Configuração para Android TV Box

## Passos para instalar no TV Box Android:

### 1. Preparar o projeto
```bash
git clone [seu-repositorio]
cd box-launcher-prime
npm install
npm run build
```

### 2. Adicionar plataforma Android
```bash
npx cap add android
npx cap update android
```

### 3. Sincronizar
```bash
npx cap sync
```

### 4. Abrir no Android Studio
```bash
npx cap open android
```

### 5. Configurar como Launcher padrão

No arquivo `android/app/src/main/AndroidManifest.xml`, adicione estas permissões e configurações:

```xml
<manifest>
    <uses-feature android:name="android.software.leanback" android:required="false" />
    <uses-feature android:name="android.hardware.touchscreen" android:required="false" />
    
    <application
        android:banner="@drawable/banner"
        android:theme="@style/Theme.AppCompat.Leanback">
        
        <activity
            android:name=".MainActivity"
            android:launchMode="singleTask">
            
            <!-- Launcher Intent -->
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
                <category android:name="android.intent.category.LEANBACK_LAUNCHER" />
                <category android:name="android.intent.category.HOME" />
                <category android:name="android.intent.category.DEFAULT" />
            </intent-filter>
            
        </activity>
    </application>
</manifest>
```

### 6. Compilar APK
No Android Studio:
- Build > Generate Signed Bundle/APK
- Escolha APK
- Crie uma keystore ou use uma existente
- Build release APK

### 7. Instalar no TV Box
```bash
# Conecte o TV Box via USB ou use ADB via rede
adb connect [IP_DO_TVBOX]:5555
adb install app-release.apk
```

### 8. Configurar como Launcher Padrão
1. No TV Box, vá em Configurações > Apps
2. Encontre "Apps padrão" ou "Launcher padrão"
3. Selecione "box-launcher-prime"
4. A launcher iniciará automaticamente ao ligar o TV Box

## URLs dos Apps Configuradas:

- **YouTube**: Intent para app Android + fallback para web
- **Netflix**: Intent para app Android + fallback para web
- **Prime Video**: Intent para app Android + fallback para web
- **Spotify**: Intent para app Android + fallback para web
- **Outros apps**: URLs web configuradas

## Observações:

- A launcher funciona com controle remoto e teclado
- Navegação por setas ← → ↑ ↓
- Enter para abrir apps
- O banner principal abre o RedPlay
- Apps tentam abrir a versão Android primeiro, depois abrem no navegador

## Desenvolvimento com Hot Reload:

Durante desenvolvimento, o app conecta automaticamente ao servidor Lovable para atualizações em tempo real. Para produção, faça build completo.
