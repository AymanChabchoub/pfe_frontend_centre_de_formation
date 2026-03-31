import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionFormationService } from 'src/services/session_formation/sessionformation.service';
import { AuthService } from 'src/services/auth/auth.service';
import { SalleService } from 'src/services/salle/salle.service';
import { InscriptionService } from 'src/services/inscription/inscription.service';
import { PaiementService } from 'src/services/payment/payment.service';
import { FactureService } from 'src/services/facture/facture.service';
import { FormationService } from 'src/services/formation/formation.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-liste-session-formation-by-formation-id',
  templateUrl: './liste-session-formation-by-formation-id.component.html',
  styleUrls: ['./liste-session-formation-by-formation-id.component.css']
})
export class ListeSessionFormationByFormationIdComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['index', 'titre', 'description', 'dateDebut', 'dateFin',
    'heureDebut', 'heureFin', 'formateur', 'salle', 'adresse', 'action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  formationId!: number;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  formation:any;
  selectedSession:any;

  currentUserId!: undefined | number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private sessionService: SessionFormationService,
    private authService: AuthService,
    private salleService: SalleService,
    private inscriptionService: InscriptionService,
    private factureService: FactureService,
    private paiementService: PaiementService,
    private formationService: FormationService
    
  ) {}

  ngOnInit(): void {
    this.formationId = Number(this.route.snapshot.paramMap.get('formationId'));

    const user = this.authService.getCurrentUser();
    if (user) {
      this.currentUserId = user.id;
    }
    // 1️⃣ récupérer la formation complète
    this.getFormationById(this.formationId);

    this.loadSessions();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFormationById(formationId: number): void {
    this.formationService.getById(formationId).subscribe({
      next: formation => {
        this.formation = formation;
      },
      error: err => {
        console.error('Erreur récupération formation', err);
        this.errorMessage = 'Impossible de récupérer la formation';
      }
    });
  }

  loadSessions(): void {
    this.isLoading = true;

    this.sessionService.getByFormationId(this.formationId).subscribe(
      res => {
        this.dataSource.data = res;

        this.dataSource.data.forEach(s => {
          // Associer le prix de la formation (avec remise si applicable)
          s.prix = this.getPrixRemise(s.formation);
          if (s.formateurId) {
            this.authService.getUserById(s.formateurId).subscribe(user => {
              s.formateurNom = user.nom + ' ' + user.prenom;
            });
          }

          if (s.salleId) {
            this.salleService.getById(s.salleId).subscribe(salle => {
              s.salleNom = salle.nom;
              s.salleAdresse = salle.adresse;
            });
          }
        });

        this.isLoading = false;
      },
      () => this.isLoading = false
    );
  }

  isRemiseValide(formation: any): boolean {
    if (!formation || !formation.tauxRemise || formation.tauxRemise <= 0) return false;
    if (!formation.dateExpirationRemise) return true;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const expiration = new Date(formation.dateExpirationRemise);
    return expiration >= today;
  }

  getPrixRemise(formation: any): number {
    if (this.isRemiseValide(formation)) {
      return formation.prix * (1 - formation.tauxRemise / 100);
    }
    return formation.prix || 0;
  }

  getSessionById(sessionId: number): void {
    this.sessionService.getById(sessionId).subscribe({
      next: session => {
        this.selectedSession = session;
      },
      error: err => {
        console.error('Erreur récupération session', err);
        this.errorMessage = 'Impossible de récupérer la session';
      }
    });
  }

  // ✅ INSCRIPTION
  inscrire(sessionId: number): void {
    if (!this.currentUserId) {
      this.errorMessage = 'Vous devez être connecté pour vous inscrire';
      return;
    }

    const inscription = {
      userId: this.currentUserId,
      sessionId: sessionId
    };

    this.inscriptionService.create(inscription).subscribe(
      () => {
        this.successMessage = 'Inscription effectuée avec succès';
        this.errorMessage = '';
      },
      err => {
        this.errorMessage = err.error?.message || 'Déjà inscrit ou erreur serveur';
        this.successMessage = '';
      }
    );
  }
  
  createPayment(session: any): void {
    if (!this.currentUserId) {
      this.errorMessage = 'Vous devez être connecté';
      return;
    }

    // Assigner le montant depuis la formation (avec remise si applicable)
    const montant = this.getPrixRemise(this.formation);

    // 1️⃣ vérifier si inscription existe
    this.inscriptionService.getBySession(session.id).subscribe(inscriptions => {

      const inscriptionExistante = inscriptions.find(
        i => i.apprenant?.id === this.currentUserId
      );

      if (inscriptionExistante) {
        // 🔹 CAS 1 : inscription existe
        this.processPayment(inscriptionExistante.id, montant, session.id);
      } else {
        // 🔹 CAS 2 : inscription n'existe pas
        const inscription = {
          userId: this.currentUserId,
          sessionId: session.id,
        };

        this.inscriptionService.create(inscription).subscribe(newInscription => {
          this.processPayment(newInscription.id, montant, session.id);
        });
      }
    });
  }

  processPayment(inscriptionId: number, montant: number, sessionId: number): void {
    const factureDTO = {
      numeroFacture: 'FAC-' + Date.now(),
      montantHT: montant,
      montantTVA: montant * 0.19,
      montantTTC: montant * 1.19,
      userId: this.currentUserId,
      sessionId: sessionId
    };
    console.log('FactureDTO envoyé :', factureDTO);

    this.factureService.create(factureDTO).subscribe({
      next: f => {
        const paiement = {
          factureId: f.id,
          montant: f.montantTTC,
          datePaiement: new Date(),
          mode: 'CARTE'
        };

        this.paiementService.create(paiement).subscribe(() => {
          this.inscriptionService.update(inscriptionId, { payee: true }).subscribe(() => {
            this.successMessage = 'Paiement effectué avec succès';
            this.errorMessage = '';
            this.getSessionById(sessionId); 
            this.genererFacturePDF(factureDTO, { id: sessionId });
          });
        });
      },
      error: err => {
        console.error('Erreur création facture', err);
        this.errorMessage = 'Erreur lors de la création de la facture';
      }
    });
  }
genererFacturePDF(facture: any,session: any): void {

  const doc = new jsPDF();

  const user = this.authService.getCurrentUser();
    if (!user) {
    this.errorMessage = 'Utilisateur non connecté';
    return;
  }

  // ====== TITRE ======
  doc.setFontSize(18);
  doc.text('FACTURE', 105, 20, { align: 'center' });

  // ====== INFOS FACTURE ======
  doc.setFontSize(11);
  doc.text(`Numéro facture : ${facture.numeroFacture}`, 20, 40);
  doc.text(`Date : ${new Date().toLocaleDateString()}`, 20, 48);

  // ====== CLIENT ======
  doc.text('Client :', 20, 65);
  doc.text(`${user.nom} ${user.prenom}`, 20, 72);
  doc.text(`${user.email}`, 20, 79);

  // ====== SESSION / FORMATION ======
  doc.text('Formation :', 120, 65);
  doc.text(this.formation?.titre || '', 120, 72);
  doc.text(`Session ID : ${session.id}`, 120, 79);

  // ====== TABLE FACTURE ======
  autoTable(doc, {
    startY: 95,
    head: [['Description', 'Montant']],
    body: [
      ['Prix formation (HT)', `${facture.montantHT.toFixed(2)} DT`],
      ['TVA (19%)', `${facture.montantTVA.toFixed(2)} DT`],
      ['Total TTC', `${facture.montantTTC.toFixed(2)} DT`],
    ],
  });

  // ====== FOOTER ======
  const finalY = (doc as any).lastAutoTable.finalY;
  doc.text('Paiement effectué avec succès.', 20, finalY + 15);

  // ====== TELECHARGEMENT ======
  doc.save(`facture_${facture.numeroFacture}.pdf`);
}




}
