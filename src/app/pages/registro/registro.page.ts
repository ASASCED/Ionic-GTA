import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { CargaPostService } from '../../services/carga-post.service';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.page.html',
    styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

    fechaCompra: Date = new Date();
    fechaCaducidad: Date = new Date();
    imagen: any;
    imagenPreview: string = '';
    titulo: string = '';

    constructor(
        private modalCtrl: ModalController,
        private camera: Camera,
        private imgPic: ImagePicker,
        private cargarPost: CargaPostService
    ) { }

    ngOnInit() {
    }

    cerrarModal() {
        this.modalCtrl.dismiss();
    }

    abrirCamara() {
        const options: CameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };

        this.camera.getPicture(options).then((imageData) => {
            this.imagenPreview = 'data:image/jpeg;base64,' + imageData;
            this.imagen = imageData;
        }, (err) => {
            console.log('Error: ' + JSON.stringify(err));
        });
    }

    seleccionarImagen() {
        const opciones: ImagePickerOptions = {
            quality: 50,
            outputType: 1,
            maximumImagesCount: 1
        };
        this.imgPic.getPictures(opciones).then((imagenes) => {
            for (let i = 0; i < imagenes.length; i++) {
                this.imagenPreview = 'data:image/jpeg;base64,' + imagenes[i];
                this.imagen = imagenes[i];
            }
        }, (err) => {
            console.log('Error: ' + JSON.stringify(err));
        });
    }

    crearPost() {
        const archivo = {
            img: this.imagen,
            producto: this.titulo,
            cadInicio: this.fechaCompra,
            cadFin: this.fechaCaducidad
        };

        this.cargarPost.cargarImagen(archivo).then( () => {
            this.cerrarModal();
        });
    }

}
