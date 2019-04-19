import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProductDetailsPage } from '../product-details/product-details.page';
import { OverlayEventDetail } from '@ionic/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
// import {
//   BarcodeScanner,
//   BarcodeScanResult,
//   BarcodeScannerOptions
// } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  constructor(
    private modalController: ModalController,
    private qrScanner: QRScanner // private barcode: BarcodeScanner
  ) {}

  ngOnInit(): void {}

  async openModal() {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: ProductDetailsPage,
      componentProps: {
        name: 'Product Name',
        other: 'data'
      }
    });

    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail !== null) {
        console.log('The result:', detail.data);
      }
    });

    await modal.present();
  }

  async openQRScanner() {
    this.qrScanner
      .prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          // start scanning
          this.qrScanner.show();
          document.getElementsByTagName('body')[0].style.opacity = '0';
          const scanSub = this.qrScanner.scan().subscribe((text: string) => {
            alert(text);
            document.getElementsByTagName('body')[0].style.opacity = '0';
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            this.openModal();
          });
        } else if (status.denied) {
          console.log('denied');
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  // async openBarcodeScanner() {
  //   // let data:BarcodeScannerOptions;
  //   this.barcode.scan().then((res: BarcodeScanResult) => {
  //     console.log(res.text);
  //   });
  // }
}
