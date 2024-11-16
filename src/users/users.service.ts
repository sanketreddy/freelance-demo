import { Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from 'src/firebase/firebase.config';

@Injectable()
export class UsersService {
  private collection = firestore.collection('users');

  async createUser(data: any): Promise<any> {
    const docRef = await this.collection.add(data);
    return { id: docRef.id, ...data };
  }

  async getUsers(): Promise<any[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

  async getUserById(id: string): Promise<any> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { id: doc.id, ...doc.data() };
  }

  async updateUser(id: string, data: any): Promise<any> {
    await this.collection.doc(id).update(data);
    return { id, ...data };
  }

  async deleteUser(id: string): Promise<void> {
    await this.collection.doc(id).delete();
  }
}
