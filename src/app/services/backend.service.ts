import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor() {}

  async getData() {
    const req = await fetch('http://localhost:3000/data');
    const data = await req.json();
    return data;
  }

  async saveData(data: any) {
    const req = await fetch('http://localhost:3000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
  }

  async delete(id: string) {
    const req = await fetch(`http://localhost:3000/data/${id}`, {
      method: 'DELETE',
    });
    const res = await req.json();
  }

  async update(data: any) {
    const req = await fetch(`http://localhost:3000/data/${data.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    const res = await req.json();
  }
}
