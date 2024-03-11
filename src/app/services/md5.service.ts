import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class Md5Service {

  constructor() { }

  generateHash(ts: string, privateKey: string, publicKey: string): string {
    const hashInput = `${ts}${privateKey}${publicKey}`;
    return Md5.hashStr(hashInput).toString();
  }
}
