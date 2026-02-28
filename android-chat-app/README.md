# Android Chat App (mirip WhatsApp) - Starter Code

Ini starter project **Android chatting online realtime** menggunakan:
- **Kotlin + Jetpack Compose**
- **Ktor WebSocket Client** untuk koneksi realtime
- **MVVM + StateFlow**

## Fitur yang sudah disiapkan
- Login sederhana dengan username
- Daftar room chat
- Kirim & terima pesan realtime via WebSocket
- Tampilan chat bubble dasar

## Struktur
- `app/src/main/java/com/example/chatapp/network` → koneksi WebSocket
- `app/src/main/java/com/example/chatapp/data` → model data + repository
- `app/src/main/java/com/example/chatapp/viewmodel` → state UI
- `app/src/main/java/com/example/chatapp/ui` → Compose screens

## Endpoint backend yang diharapkan
Client ini mengirim/terima JSON format:

```json
{
  "type": "message",
  "roomId": "general",
  "sender": "budi",
  "text": "halo"
}
```

Sediakan WebSocket endpoint, contoh:
- `ws://10.0.2.2:8080/chat`

> `10.0.2.2` dipakai saat testing Android Emulator untuk mengakses localhost mesin host.

## Dependency utama (tambahkan di gradle module app)
```kotlin
implementation("androidx.activity:activity-compose:1.9.2")
implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.5")
implementation("androidx.lifecycle:lifecycle-viewmodel-compose:2.8.5")
implementation("org.jetbrains.kotlinx:kotlinx-coroutines-android:1.8.1")
implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.7.1")

implementation("io.ktor:ktor-client-core:2.3.12")
implementation("io.ktor:ktor-client-cio:2.3.12")
implementation("io.ktor:ktor-client-websockets:2.3.12")
implementation("io.ktor:ktor-client-content-negotiation:2.3.12")
implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.12")
```

## Catatan produksi
Untuk jadi mirip WhatsApp secara production-ready, tambahkan:
- autentikasi JWT/OAuth
- enkripsi end-to-end
- upload media (gambar/video/audio)
- push notification (Firebase Cloud Messaging)
- penyimpanan lokal (Room)
- paging chat history + read receipts
