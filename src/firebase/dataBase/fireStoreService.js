import { db } from '../config';



// export const getAll = async folder => {
// 	const querySnapshot = await getDocs(collection(dbfirestore, folder));
// 	return querySnapshot.docs.map(doc => ({
// 		...doc.data(),
// 		userid: doc.id,
// 	}));
// };

export const store = async (uid, folder, data) => {
	if (!folder) throw new Error('FOLDER is requerired!!!');
	if (!uid) throw new Error('USER ID is requerired!!!');
	if (!data) throw new Error('DATA is requerired!!!');

    return await db.collection(folder).add({
        uid,...data
    })
};

/***
 * @param {string} uid
 * @param {string} folder
 * @returns {Promise<firebase.firestore.DocumentData>} | null
 */
 export const getById = async (uid, folder) => {
 	if (!uid) throw new Error('USER ID is requerired!!!');
 	if (!folder) throw new Error('FOLDER is requerired!!!');

 	// const response = doc(dbfirestore, folder, uid);
 	// const snap = await getDoc(response);
 	// return snap.exists() ? snap.data() : null;
   const users = [] 
   db.collection(folder).where("uid",'==', uid).onSnapshot(docs => [...users, docs]) 
   return users
 };