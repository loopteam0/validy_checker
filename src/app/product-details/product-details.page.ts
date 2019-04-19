import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss']
})
export class ProductDetailsPage implements OnInit {
  name: string;
  other: string;
  now: any;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams
  ) {
    this.now = Date();
  }

  ngOnInit(): void {}

  ionViewWillEnter() {
    this.name = this.navParams.get('name');
    this.other = this.navParams.get('other');
  }

  async closeSlf() {
    const results = {
      r1: this.name,
      r2: this.other
    };
    await this.modalController.dismiss(results);
  }
}
