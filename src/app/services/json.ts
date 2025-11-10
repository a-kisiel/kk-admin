import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Json {

  private http: HttpClient;

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }
  
  async compile(section: string, operation: string, data: any) {
    // const metadata: any = await lastValueFrom(this.http.get('https://katieart.s3.us-east-2.amazonaws.com/metadata.json'));
    const rawMetadata: any = localStorage.getItem('metadata');
    const metadata: any = rawMetadata ? JSON.parse(rawMetadata) : {};

    console.log('compiling with', section, operation, data)
    if (operation === 'add' || operation === 'edit') {
      if (!metadata[section])
        metadata[section] = {};
      metadata[section][data.id] = data;
    }
    if (operation === 'delete') {
      delete metadata[section][data.id];
      console.log('deleted', section, data.id)
    }

    console.log(metadata)

    localStorage.setItem('metadata', JSON.stringify(metadata));
  }
}
