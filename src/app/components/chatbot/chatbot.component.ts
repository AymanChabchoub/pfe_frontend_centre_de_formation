import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { ChatbotService } from 'src/app/services/chatbot.service';

interface ChatMessage {
    text: string;
    type: 'incoming' | 'outgoing';
    isError?: boolean;
}

@Component({
    selector: 'app-chatbot',
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements AfterViewChecked {
    showChat = false;
    userMessage = '';
    messages: ChatMessage[] = [];
    isLoading = false;

    @ViewChild('chatbox') private chatboxRef!: ElementRef;

    constructor(private chatbotService: ChatbotService) { }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.chatboxRef.nativeElement.scrollTop = this.chatboxRef.nativeElement.scrollHeight;
        } catch (err) { }
    }

    toggleChat() {
        this.showChat = !this.showChat;
    }

    handleEnter(event: Event) {
        event.preventDefault(); // Prevents newline
        this.sendMessage();
    }

    sendMessage() {
        const text = this.userMessage.trim();
        if (!text) return;

        // Add user message
        this.messages.push({ text: text, type: 'outgoing' });
        this.userMessage = '';
        this.isLoading = true;

        // Call service
        this.chatbotService.sendMessage(text).subscribe({
            next: (response) => {
                this.messages.push({ text: response.response, type: 'incoming' });
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Erreur chatbot:', error);
                this.messages.push({
                    text: 'Désolé, une erreur est survenue. Veuillez réessayer.',
                    type: 'incoming',
                    isError: true
                });
                this.isLoading = false;
            }
        });
    }
}
