package com.example.chatapp.data

import kotlinx.serialization.Serializable

@Serializable
data class ChatMessage(
    val type: String = "message",
    val roomId: String,
    val sender: String,
    val text: String,
    val timestamp: Long = System.currentTimeMillis(),
)

data class ChatRoom(
    val id: String,
    val title: String,
)
