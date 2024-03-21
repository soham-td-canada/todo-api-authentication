import firestore from './setup';

interface userDetails {
  username: string;
  password: string;
  roles: string[];
}

export default async function(newUserDetails: userDetails) {
  try {
    await firestore.collection('todo-users').add(newUserDetails);
    console.log('document added successfully');
  } catch (error) {
      console.error('Error adding username and password', error);
      throw Error;
  }
}