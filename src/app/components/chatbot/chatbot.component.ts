import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { Router } from '@angular/router';
import { ChatbotService } from 'src/app/services/chatbot.service';

interface ChatMessage {
    text: string;
    type: 'incoming' | 'outgoing';
    isError?: boolean;
    route?: string;
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

    constructor(
        private chatbotService: ChatbotService,
        private router: Router
    ) { }

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
        event.preventDefault();
        this.sendMessage();
    }

    sendMessage() {
        const text = this.userMessage.trim();
        if (!text) return;

        this.messages.push({ text: text, type: 'outgoing' });
        this.userMessage = '';
        this.isLoading = true;

        this.chatbotService.sendMessage(text).subscribe({
            next: (response) => {
                const parsed = this.parseResponse(response.response);
                this.messages.push(parsed);
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

    parseResponse(rawText: string): ChatMessage {
        const routeRegex = /\[ROUTE:(\/[^\]]+)\]/;
        const match = rawText.match(routeRegex);

        const cleanText = rawText.replace(routeRegex, '').trim();

        return {
            text: cleanText,
            type: 'incoming',
            route: match ? match[1] : undefined
        };
    }

    navigateTo(route: string): void {
        this.router.navigate([route]);
        this.showChat = false;
    }
}
