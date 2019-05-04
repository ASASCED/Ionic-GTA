import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RegistroPage } from '../registro/registro.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  async abrirModal() {
    const modal = await this.modalCtrl.create({
      component: RegistroPage,
    });
    return await modal.present();
  }

}
