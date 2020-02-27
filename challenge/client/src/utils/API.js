import axios from "axios";

export default {
    getUserInfo: function(userID) {
      return axios.get("/api/users/find/" + userID);
    },
    createUser: function(userData){
      return axios.post("/api/users/create", userData);
    },
    createChallenge: function(challengeData){
      return axios.post("/api/challenges/create",challengeData)
    },
    joinChallenge: function(joinData){
      return axios.post("/api/challenges/join",joinData)
    },
    startChallenge: function(startChallengeData){
      return axios.post("api/challenges/start",startChallengeData)
    }
};


