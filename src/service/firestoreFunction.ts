// import { firestore } from './firebase';
// import { Item } from './types';

// // Function to add a new item to Firestore
// export const addItem = async (item: Item): Promise<void> => {
//   try {
//     await firestore.collection('items').add(item);
//     console.log('Item added successfully');
//   } catch (error) {
//     console.error('Error adding item: ', error);
//   }
// };

// // Function to get all items from Firestore
// export const getItems = async (): Promise<Item[]> => {
//   try {
//     const snapshot = await firestore.collection('items').get();
//     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() as Item }));
//   } catch (error) {
//     console.error('Error getting items: ', error);
//     return [];
//   }
// };

// // Function to update an existing item in Firestore
// export const updateItem = async (itemId: string, newData: Partial<Item>): Promise<void> => {
//   try {
//     await firestore.collection('items').doc(itemId).update(newData);
//     console.log('Item updated successfully');
//   } catch (error) {
//     console.error('Error updating item: ', error);
//   }
// };

// // Function to delete an item from Firestore
// export const deleteItem = async (itemId: string): Promise<void> => {
//   try {
//     await firestore.collection('items').doc(itemId).delete();
//     console.log('Item deleted successfully');
//   } catch (error) {
//     console.error('Error deleting item: ', error);
//   }
// };
