import firestore from './setup';

export default async function (username: string) {
  const collectionRef = firestore.collection("todo-users");
  const fieldName: string = 'username';
  const query = collectionRef.where(fieldName, '==', username).limit(1);

  try {
    const querySnapshot = await query.get();

    return !querySnapshot.empty;
  } catch (error) {
      console.error("Error checking if username already exists", error);
      throw error;
  }
}