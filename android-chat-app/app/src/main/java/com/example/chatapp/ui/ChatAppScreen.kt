package com.example.chatapp.ui

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import androidx.lifecycle.viewmodel.compose.viewModel
import com.example.chatapp.data.ChatMessage
import com.example.chatapp.viewmodel.ChatViewModel

@Composable
fun ChatAppScreen(
    viewModel: ChatViewModel = viewModel(),
) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    var wsUrl by remember { mutableStateOf("ws://10.0.2.2:8080/chat") }
    var draft by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
    ) {
        OutlinedTextField(
            value = state.username,
            onValueChange = viewModel::setUsername,
            label = { Text("Username") },
            modifier = Modifier.fillMaxWidth(),
        )

        Spacer(Modifier.height(8.dp))

        OutlinedTextField(
            value = wsUrl,
            onValueChange = { wsUrl = it },
            label = { Text("WebSocket URL") },
            modifier = Modifier.fillMaxWidth(),
        )

        Spacer(Modifier.height(8.dp))

        Button(
            onClick = { viewModel.connect(wsUrl) },
            enabled = !state.isConnected,
        ) {
            Text(if (state.isConnected) "Connected" else "Connect")
        }

        Spacer(Modifier.height(16.dp))

        LazyColumn(
            modifier = Modifier
                .weight(1f)
                .fillMaxWidth(),
            verticalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            items(state.messages) { message ->
                MessageBubble(
                    message = message,
                    isOwn = message.sender == state.username,
                )
            }
        }

        Spacer(Modifier.height(8.dp))

        Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
            OutlinedTextField(
                value = draft,
                onValueChange = { draft = it },
                label = { Text("Ketik pesan...") },
                modifier = Modifier.weight(1f),
            )
            Button(onClick = {
                viewModel.send(draft)
                draft = ""
            }) {
                Text("Kirim")
            }
        }
    }
}

@Composable
private fun MessageBubble(
    message: ChatMessage,
    isOwn: Boolean,
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(start = if (isOwn) 48.dp else 0.dp, end = if (isOwn) 0.dp else 48.dp),
    ) {
        Column(
            modifier = Modifier
                .background(
                    color = if (isOwn) Color(0xFFDCF8C6) else MaterialTheme.colorScheme.surfaceVariant,
                    shape = RoundedCornerShape(12.dp),
                )
                .padding(10.dp),
        ) {
            Text(message.sender, style = MaterialTheme.typography.labelSmall)
            Text(message.text)
        }
    }
}
