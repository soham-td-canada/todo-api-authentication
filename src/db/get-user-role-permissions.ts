import firestore from './setup';

export default async function(role: string) {
  try {
      return (await firestore
        .collection('todo-user-roles')
        .where('roleName', '==', role)
        .limit(1)
        .get()).docs[0];
  } catch (error) {
    console.error('Error fetching user role permissions', error);
    throw Error;
  }
}