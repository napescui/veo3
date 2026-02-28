package com.example.chatapp.data

import com.example.chatapp.network.ChatSocketClient
import kotlinx.coroutines.flow.Flow

class ChatRepository(
    private val socketClient: ChatSocketClient,
) {
    val incomingMessages: Flow<ChatMessage> = socketClient.incoming

    suspend fun connect(baseWsUrl: String) {
        socketClient.connect(baseWsUrl)
    }

    suspend fun send(roomId: String, sender: String, text: String) {
        if (text.isBlank()) return
        socketClient.send(
            ChatMessage(
                roomId = roomId,
                sender = sender,
                text = text.trim(),
            ),
        )
    }

    suspend fun disconnect() {
        socketClient.close()
    }
}
