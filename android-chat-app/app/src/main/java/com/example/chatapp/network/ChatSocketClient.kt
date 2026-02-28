package com.example.chatapp.network

import com.example.chatapp.data.ChatMessage
import io.ktor.client.HttpClient
import io.ktor.client.engine.cio.CIO
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.plugins.websocket.WebSockets
import io.ktor.client.plugins.websocket.webSocketSession
import io.ktor.serialization.kotlinx.json.json
import io.ktor.websocket.Frame
import io.ktor.websocket.WebSocketSession
import io.ktor.websocket.readText
import io.ktor.websocket.send
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableSharedFlow
import kotlinx.coroutines.flow.asSharedFlow
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import kotlinx.serialization.json.Json

class ChatSocketClient {
    private val json = Json { ignoreUnknownKeys = true }

    private val client = HttpClient(CIO) {
        install(WebSockets)
        install(ContentNegotiation) {
            json(json)
        }
    }

    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    private var listenJob: Job? = null
    private var session: WebSocketSession? = null

    private val _incoming = MutableSharedFlow<ChatMessage>(extraBufferCapacity = 32)
    val incoming: Flow<ChatMessage> = _incoming.asSharedFlow()

    suspend fun connect(url: String) {
        session = client.webSocketSession(urlString = url)
        listenJob?.cancel()
        listenJob = scope.launch {
            val activeSession = session ?: return@launch
            while (isActive) {
                val frame = activeSession.incoming.receiveCatching().getOrNull() ?: break
                if (frame is Frame.Text) {
                    runCatching {
                        json.decodeFromString(ChatMessage.serializer(), frame.readText())
                    }.getOrNull()?.let { _incoming.emit(it) }
                }
            }
        }
    }

    suspend fun send(message: ChatMessage) {
        val payload = json.encodeToString(ChatMessage.serializer(), message)
        session?.send(Frame.Text(payload))
    }

    suspend fun close() {
        listenJob?.cancel()
        session?.close()
        client.close()
    }
}
