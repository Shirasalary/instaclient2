import React from "react";
import axios from "axios";


class MyProfile extends React.Component{

    state = {
        user: {},
        picture:"",
        newPost:"",
        allPosts: [],
        showProfile: true
    }
    SERVER_URL = "http://localhost:9030/"

    changeValueByKey = (key, value) => {
        this.setState({
            [key]: value
        })
    }


    getFromServer = (path,key)=>{
        axios.get(path)
            .then(response => {
                if (response.data.success){
                    switch (key){
                        case "user":
                            this.changeValueByKey("user",response.data.user);break;

                        case "allPosts":
                            this.changeValueByKey("allPosts",response.data.list);break;
                    }

                }
            })
    }
    componentDidMount() {
        this.getUser();
         this.getAllUserPosts();
    }

    getUser = () => {
        this.getFromServer(this.SERVER_URL + "get-user-by-token?token="+ this.props.token,
            "user");
    }

    getAllUserPosts =() =>{

        this.getFromServer(this.SERVER_URL + "get-user-all-posts?token="+ this.props.token,
            "allPosts");
    }
    render() {
        return(
            <div>כאן נערוך את הפרופיל</div>
        )
    }
}
export default MyProfile;