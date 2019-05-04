import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CargaPostService {

  imagenes: ArchivoSubir[] = [];

  constructor(
    private afDB: AngularFireDatabase,
    private toastCtrl: ToastController
  ) { }

  cargarImagen( archivo: ArchivoSubir ) {
    const promesa = new Promise( (resolve, reject) => {
      this.mostrarToast('Cargando...');

      const storeRef = firebase.storage().ref();
      const nombreArchivo: string = new Date().valueOf().toString();

      const uploadTask: firebase.storage.UploadTask =
            storeRef.child(`img/${ nombreArchivo }`)
            .putString( archivo.img, 'base64', {contentType: 'iahe/jpeg'} );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
        () => { }, // Saber cuantos MBs se han subido
        ( error ) => {
          console.log('Error en la carga');
          console.log(JSON.stringify( error ));
          this.mostrarToast(JSON.stringify( error ));
          reject();
        },
        () => {
          // Todo bien!!!
          console.log('Archivo Subido');
          this.mostrarToast('Imagen subida...');

          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('file avaliable at ', downloadURL);
            const url = downloadURL;
            this.mostrarToast('url: ' + url);
            this.crearPost( archivo.producto, url, nombreArchivo, archivo.cadInicio, archivo.cadFin );
            resolve();
          });
        }
      );
    });

    return promesa;
  }

  private crearPost( producto: string, url: string, nombreArchivo: string, cadInicio: Date, cadFinal: Date ) {
    const post: ArchivoSubir = {
      img: url,
      producto: producto,
      key: nombreArchivo,
      cadInicio: cadInicio,
      cadFin: cadFinal
    };

    console.log( JSON.stringify(post) );

    this.afDB.object(`/post/${ nombreArchivo }`).update(post).then( () => {
      this.imagenes.push(post);
    }
    );
  }

  async mostrarToast( msg: string ) {
      const toast = await this.toastCtrl.create({
        message: msg,
        duration: 2000
      });
      toast.present();
  }
}

interface ArchivoSubir {
  producto: string;
  img: string;
  cadInicio?: Date;
  cadFin?: Date;
  key?: string;
}
