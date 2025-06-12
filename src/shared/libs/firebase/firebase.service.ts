import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
const path = require('path');
const privateKey = require(path.join(process.cwd(), 'keys', 'firebase-private.json'));


@Injectable()
export class FirebaseService {
  public firebaseApp: admin.app.App;

  constructor() {
    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(privateKey),
    });
  }
}