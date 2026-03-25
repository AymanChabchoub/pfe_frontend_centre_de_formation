import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InscriptionService } from 'src/services/inscription/inscription.service';
import { PresenceService } from 'src/services/presence/presence.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-liste-inscription-by-session-id',
  templateUrl: './liste-inscription-by-session-id.component.html',
  styleUrls: ['./liste-inscription-by-session-id.component.css']
})
export class ListeInscriptionBySessionIdComponent implements OnInit {

  inscriptions: any[] = [];
  sessionId!: number;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private inscriptionService: InscriptionService,
      private presenceService: PresenceService

  ) {}

  ngOnInit(): void {
    this.sessionId = Number(this.route.snapshot.paramMap.get('sessionId'));
    this.loadInscriptions();
  }

  loadInscriptions(): void {
    this.loading = true;
    this.inscriptionService.getBySession(this.sessionId).subscribe({
      next: (data) => {
        this.inscriptions = data;
        console.log("data", data);
        this.loading = false;
      },
      error: () => {
        this.inscriptions = [];
        this.loading = false;
      }
    });
  }
  markPresentPointage(inscription: any): void {
  this.presenceService.pointage(inscription.id).subscribe({
    next: () => inscription.present = true,
    error: err => console.error(err)
  });
}

  markPresent(inscription: any): void {

  const presencePayload = {
    participantNom:inscription.apprenant.nom + ' ' + inscription.apprenant.prenom,
    present: true,
    sessionFormation: {
      id: inscription.sessionFormation.id
    },
    inscription: {
      id: inscription.id
    },
    heureArrivee: new Date().toISOString().substring(11, 19),
    date: new Date()
  };

  this.presenceService.create(presencePayload).subscribe({
    next: () => {
      inscription.present = true; // état frontend
      console.log("presencePayload", presencePayload);
    },
    error: (err) => {
      console.error('Erreur présence', err);
      console.log("presencePayload", presencePayload);

    }
  });
}
generateQr(inscription: any): void {
  this.presenceService.generateQr(inscription.id).subscribe({
    next: (blob) => {
      const url = URL.createObjectURL(blob);
      window.open(url);
    },
    error: (err) => {
      console.error('Erreur QR', err);
    }
  });
}

  exportPDF(): void {
    const doc = new jsPDF();

    // Titre
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Liste des Apprenants Inscrits - Session #${this.sessionId}`, 14, 20);

    // Date de génération
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Généré le : ${new Date().toLocaleDateString('fr-FR')} à ${new Date().toLocaleTimeString('fr-FR')}`, 14, 28);

    // Nombre d'inscrits
    doc.text(`Nombre d'inscrits : ${this.inscriptions.length}`, 14, 34);

    // Données du tableau
    const body = this.inscriptions.map((insc, i) => [
      i + 1,
      `${insc.apprenant?.nom || ''} ${insc.apprenant?.prenom || ''}`,
      insc.sessionFormation?.titre || '',
      insc.dateInscription ? new Date(insc.dateInscription).toLocaleDateString('fr-FR') : '',
      insc.payee ? 'Payée' : 'Non payée',
      insc.present ? 'Présent' : 'Absent'
    ]);

    autoTable(doc, {
      startY: 40,
      head: [['#', 'Apprenant', 'Session', 'Date Inscription', 'Statut', 'Présence']],
      body: body,
      styles: { fontSize: 9, cellPadding: 3 },
      headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [245, 245, 245] },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        4: { halign: 'center' },
        5: { halign: 'center' }
      }
    });

    doc.save(`inscriptions_session_${this.sessionId}.pdf`);
  }

}
