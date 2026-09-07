import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  ChatMessage,
  ChatService
} from './chat.service';

import {
  ApiService
} from '../core/services/api.service';

import {
  AuthService,
  LoginResponse
} from '../auth/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {

  /**
   * Identifiant de la conversation utilisée
   * pour le PoC.
   *
   * Dans une version complète, cet identifiant
   * serait récupéré depuis le backend après
   * authentification.
   */
  conversationId = 1;

  /**
   * Utilisateur actuellement connecté.
   */
  currentUser: LoginResponse | null = null;

  /**
   * Liste des messages affichés dans le chat.
   */
  messages: ChatMessage[] = [];

  /**
   * Contenu du message en cours de rédaction.
   */
  newMessage = '';

  /**
   * Indique si la connexion WebSocket
   * est considérée comme active.
   */
  connected = false;

  constructor(
    private chatService: ChatService,
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {
  }

  /**
   * Initialisation du composant.
   */
  ngOnInit(): void {

    /*
     * Récupération de l'utilisateur connecté
     * depuis le stockage local.
     */
    this.currentUser =
      this.authService.getCurrentUser();

    /*
     * Si aucun utilisateur n'est connecté,
     * on retourne vers la page de login.
     */
    if (!this.currentUser) {

      this.router.navigate(['/login']);

      return;
    }

    /*
     * Récupération des anciens messages.
     */
    this.loadHistory();

    /*
     * Connexion au serveur WebSocket/STOMP.
     */
    this.chatService.connect(
      this.conversationId
    );

    /*
     * Écoute des nouveaux messages reçus
     * en temps réel.
     */
    this.chatService.messages$
      .subscribe(message => {

        this.messages.push(message);

      });

    this.connected = true;
  }

  /**
   * Récupère l'historique de la conversation
   * depuis l'API REST.
   */
  loadHistory(): void {

    this.apiService
      .getMessages(this.conversationId)
      .subscribe({

        next: messages => {

          this.messages = messages;

        },

        error: error => {

          console.error(
            'Erreur lors de la récupération de l’historique :',
            error
          );

        }

      });
  }

  /**
   * Envoie un nouveau message.
   */
  sendMessage(): void {

    const content =
      this.newMessage.trim();

    /*
     * Ne rien envoyer si le message est vide.
     */
    if (!content) {
      return;
    }

    /*
     * Sécurité supplémentaire :
     * l'utilisateur doit être connecté.
     */
    if (!this.currentUser) {

      this.router.navigate(['/login']);

      return;
    }

    /*
     * Envoi du message via WebSocket/STOMP.
     *
     * L'identifiant de l'expéditeur provient
     * maintenant de l'utilisateur connecté.
     */
    this.chatService.sendMessage({

      conversationId:
        this.conversationId,

      senderId:
        this.currentUser.userId,

      content

    });

    /*
     * Nettoyage du champ de saisie.
     */
    this.newMessage = '';
  }

  /**
   * Déconnexion de l'utilisateur.
   */
  logout(): void {

    /*
     * Fermeture de la connexion WebSocket.
     */
    this.chatService.disconnect();

    /*
     * Suppression de l'utilisateur stocké
     * côté navigateur.
     */
    this.authService.logout();

    /*
     * Retour à la page de connexion.
     */
    this.router.navigate(['/login']);
  }

  /**
   * Nettoyage lorsque le composant est détruit.
   */
  ngOnDestroy(): void {

    this.chatService.disconnect();

    this.connected = false;
  }
}
