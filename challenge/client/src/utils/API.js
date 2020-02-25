import axios from "axios";

export default {
    // Saves a book to the database
    // createChallenge: function(challengeData) {
    //   return axios.post("/api/challenges/create", challengeData);
    // },
    getUserInfo: function(userID) {
      console.log("axios jalando");
      return axios.get("/api/users/find/" + userID);
    },
    createUser: function(userData){
      return axios.post("/api/users/create", userData);
    }
};


