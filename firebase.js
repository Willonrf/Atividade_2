import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyBQ3WcPxKVOlaw7KU9hRj_MWs_kXvSMci0",
    authDomain: "atividade2-71262.firebaseapp.com",
    databaseURL: "https://atividade2-71262-default-rtdb.firebaseio.com",
    projectId: "atividade2-71262",
    storageBucket: "atividade2-71262.appspot.com",
    messagingSenderId: "478152651083",
    appId: "1:478152651083:web:d3301613817ad1a5b538ce"
  };

export const firebaseapp = firebase.initializeApp(firebaseConfig);
export const contatoDB = firebaseapp.database().ref().child("contato");