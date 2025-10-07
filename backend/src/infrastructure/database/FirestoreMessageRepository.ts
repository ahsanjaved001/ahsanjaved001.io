import { firebaseConfig } from '../../infrastructure/config/FirebaseConfig';
import {
  MessageEntity,
  IMessageRepository,
} from '../../domains/message/entities/MessageEntity';
import { generateId } from '../../shared/utils';
import { NotFoundError } from '../../shared/errors';

export class FirestoreMessageRepository implements IMessageRepository {
  private readonly collectionName = 'messages';

  async create(
    messageData: Omit<MessageEntity, 'id' | 'createdAt' | 'isRead'>
  ): Promise<MessageEntity> {
    try {
      const firestore = firebaseConfig.getFirestore();
      const id = generateId();
      const createdAt = new Date();

      const messageEntity = new MessageEntity(
        id,
        messageData.name,
        messageData.email,
        messageData.subject,
        messageData.message,
        createdAt,
        false
      );

      await firestore.collection(this.collectionName).doc(id).set({
        id,
        name: messageData.name,
        email: messageData.email,
        subject: messageData.subject,
        message: messageData.message,
        createdAt: createdAt.toISOString(),
        isRead: false,
      });

      return messageEntity;
    } catch (error) {
      console.error('Error creating message in Firestore:', error);
      throw error;
    }
  }

  async findAll(): Promise<MessageEntity[]> {
    try {
      const firestore = firebaseConfig.getFirestore();
      const snapshot = await firestore
        .collection(this.collectionName)
        .orderBy('createdAt', 'desc')
        .get();

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return new MessageEntity(
          data.id,
          data.name,
          data.email,
          data.subject,
          data.message,
          new Date(data.createdAt),
          data.isRead
        );
      });
    } catch (error) {
      console.error('Error fetching messages from Firestore:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<MessageEntity | null> {
    try {
      const firestore = firebaseConfig.getFirestore();
      const doc = await firestore.collection(this.collectionName).doc(id).get();

      if (!doc.exists) {
        return null;
      }

      const data = doc.data()!;
      return new MessageEntity(
        data.id,
        data.name,
        data.email,
        data.subject,
        data.message,
        new Date(data.createdAt),
        data.isRead
      );
    } catch (error) {
      console.error('Error fetching message by ID from Firestore:', error);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<MessageEntity[]> {
    try {
      const firestore = firebaseConfig.getFirestore();
      const snapshot = await firestore
        .collection(this.collectionName)
        .where('email', '==', email)
        .orderBy('createdAt', 'desc')
        .get();

      return snapshot.docs.map(doc => {
        const data = doc.data();
        return new MessageEntity(
          data.id,
          data.name,
          data.email,
          data.subject,
          data.message,
          new Date(data.createdAt),
          data.isRead
        );
      });
    } catch (error) {
      console.error('Error fetching messages by email from Firestore:', error);
      throw error;
    }
  }

  async markAsRead(id: string): Promise<MessageEntity | null> {
    try {
      const firestore = firebaseConfig.getFirestore();
      const docRef = firestore.collection(this.collectionName).doc(id);

      await docRef.update({ isRead: true });

      const doc = await docRef.get();
      if (!doc.exists) {
        throw new NotFoundError('Message not found');
      }

      const data = doc.data()!;
      return new MessageEntity(
        data.id,
        data.name,
        data.email,
        data.subject,
        data.message,
        new Date(data.createdAt),
        true
      );
    } catch (error) {
      console.error('Error marking message as read in Firestore:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const firestore = firebaseConfig.getFirestore();
      await firestore.collection(this.collectionName).doc(id).delete();
      return true;
    } catch (error) {
      console.error('Error deleting message from Firestore:', error);
      throw error;
    }
  }
}
