const authurl = "/api/auth/";
const meeturl = "/api/meet/";

/* eslint-disable no-async-promise-executor */

class postService {
    static createUser = async (user) => {
        try {
            let res = await fetch(authurl + 'signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then(data => data.json());
            return res;
        } catch (err) {
            console.log(err)
        }
    }

    static loginUser = async (user) => {
        try {
            let res = await fetch(authurl + 'login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            }).then(data => data.json());
            return res;
        } catch (err) {
            console.log(err)
        }
    }

    static meetSchedule = async (userId) => {
        try{
            let res = await fetch(meeturl + userId,{
                method: "GET"
            }).then(data => data.json());
            return res;
        } catch (err){
            console.log(err);
        }
    }

    static getParticularMeet = async (userId) => {
        try{
            let res = await fetch(meeturl +"particular/" + userId,{
                method: "GET"
            }).then(data => data.json());
            return res;
        } catch (err){
            console.log(err);
        }
    }

    static uploadMeetSchedule = async (meetDetail, dbId, particularMeetId) => {
        try{
            let allDetails = {
                title:meetDetail.title,
                description: meetDetail.description,
                link: meetDetail.link,
                date: meetDetail.date,
                image: meetDetail.image,
                start: meetDetail.start,
                end: meetDetail.end,
                dbId: dbId,
                particularMeetId: particularMeetId
            }
            let res = await fetch(meeturl ,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ allDetails }.allDetails)
            }).then(data => data.json());
            return res;
        } catch (err){
            console.log(err);
        }
    }

    static deleteMeet = async (id) => {
        try{
            let res = await fetch(meeturl + id,{
                method: "DELETE"
            })
            return res;
        } catch (err) {
            console.log(err);
        }
    }
}

export default postService;
