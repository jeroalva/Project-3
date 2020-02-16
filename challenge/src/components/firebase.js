import app from 'firebase/app';//The app variable represents the firebase application.

//We have to import auth and firestore to use the features.
import 'firebase/auth';
import 'firebase/firebase-firestore';

//For firebase config setting
var firebaseConfig = {
    apiKey: "AIzaSyBJia1rgx4R_wjwu0rIQVgkxyJPWHuptmk",
    authDomain: "challenge-850e8.firebaseapp.com",
    databaseURL: "https://challenge-850e8.firebaseio.com",
    projectId: "challenge-850e8",
    storageBucket: "challenge-850e8.appspot.com",
    messagingSenderId: "335858666630",
    appId: "1:335858666630:web:dd7e95368db0ec07d99507"
  };

  class Firebase{

    constructor(){

        app.initializeApp(firebaseConfig)//Let config information initialize firebase
        //With this.auth and this.db variables we can access auth and firestore
        this.auth=app.auth()
        this.db=app.firestore()
    };

    login(email,pass){
        //firebase login function
        return this.auth.signInWithEmailAndPassword(email,pass)
    };

    logout(){
        //firebase logout function
        return this.auth.signOut()
    };

    async register(name,email,pass){
        //firebase register function
        await this.auth.createUserWithEmailAndPassword(email,pass)
        //We've updated the username of the register result.
        return this.auth.currentUser.updateProfile({
            displayName:name
        })
    };

    addFruit(fruit){
        //user presence control
        if(!this.auth.currentUser){
            return alert('Not authorized')
        }

        //Adding documents to the collection of pckurdu
        return this.db.doc(`pckurdu/${this.auth.currentUser.uid}`).set({
            fruit:fruit
        })
    };

    isInitialized(){
        //hold until the process ends
        return new Promise(resolve=>{
            //firebase notifies status change
            this.auth.onAuthStateChanged(resolve)
        })
    };

    getCurrentUsername() {
        //return displayName if user is logged in
		return this.auth.currentUser && this.auth.currentUser.displayName
    };   

    async getCurrentUserFruit() {
        //Access to the fruit field in the user uid document in the pckurdu collection.
        const fruit = await this.db.doc(`pckurdu/${this.auth.currentUser.uid}`).get()
        //export data
		return fruit.get('fruit')
    };
};

export default new Firebase();