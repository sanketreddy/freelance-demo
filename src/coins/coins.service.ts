import { Injectable } from '@nestjs/common';
import { firestore } from 'src/firebase/firebase.config';

@Injectable()
export class CoinsService {
  private collection = firestore.collection('coins');

  async getCoins(): Promise<number> {
    try {
      const snapshot = await this.collection.get();
      if (snapshot.empty) {
        console.log('No coins found');
      }
      const coins = snapshot.docs.map((doc) => doc.data());
      return coins[0]?.amount;
    } catch (error) {
      console.error('Error getting coins:', error);
      throw error;
    }
  }

  async incrementCoins(amount: number): Promise<number> {
    if (amount < 0) {
      throw new Error('Coins to increment must be positive');
    }

    const snapshot = await this.collection.get();
    if (snapshot.empty) {
      throw new Error('No coins document was found');
    }

    const doc = snapshot.docs[0];
    const currentCoins = doc.data().amount;

    const updatedCoins = currentCoins + amount;

    await doc.ref.update({
      amount: updatedCoins,
    });

    return updatedCoins;
  }
}
