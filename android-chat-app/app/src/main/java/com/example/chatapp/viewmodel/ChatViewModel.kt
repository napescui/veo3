package com.example.chatapp.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.chatapp.data.ChatMessage
import com.example.chatapp.data.ChatRepository
import com.example.chatapp.data.ChatRoom
import com.example.chatapp.network.ChatSocketClient
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch

data class ChatUiState(
    val username: String = "",
    val rooms: List<ChatRoom> = listOf(
        ChatRoom("general", "General"),
        ChatRoom("kerja", "Kerja"),
        ChatRoom("keluarga", "Keluarga"),
    ),
    val selectedRoomId: String = "general",
    val messages: List<ChatMessage> = emptyList(),
    val isConnected: Boolean = false,
)

class ChatViewModel : ViewModel() {
    private val repository = ChatRepository(ChatSocketClient())

    private val _uiState = MutableStateFlow(ChatUiState())
    val uiState: StateFlow<ChatUiState> = _uiState.asStateFlow()

    init {
        viewModelScope.launch {
            repository.incomingMessages.collect { message ->
                _uiState.update {
                    it.copy(messages = it.messages + message)
                }
            }
        }
    }

    fun setUsername(name: String) {
        _uiState.update { it.copy(username = name) }
    }

    fun selectRoom(roomId: String) {
        _uiState.update { it.copy(selectedRoomId = roomId) }
    }

    fun connect(wsUrl: String) {
        viewModelScope.launch {
            repository.connect(wsUrl)
            _uiState.update { it.copy(isConnected = true) }
        }
    }

    fun send(text: String) {
        val state = _uiState.value
        if (state.username.isBlank()) return

        viewModelScope.launch {
            repository.send(
                roomId = state.selectedRoomId,
                sender = state.username,
                text = text,
            )
        }
    }

    override fun onCleared() {
        viewModelScope.launch {
            repository.disconnect()
        }
        super.onCleared()
    }
}
