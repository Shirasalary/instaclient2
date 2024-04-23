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

    componentDidMount() {
       axios.get(this.SERVER_URL + "get-user-by-token?token="+ this.props.token)
           .then(response => {
               if (response.data.success){
                   this.changeValueByKey("user",response.data.user);
               }
           })

         this.getAllUserPosts();
    }

    getAllUserPosts =() =>{
        axios.get(this.SERVER_URL + "get-user-all-posts?token="+ this.props.token)
            .then(response => {
                if (response.data.success){
                    this.changeValueByKey("allPosts",response.data.posts);
                }
            })

    }
    render() {
        return(
            <div>כאן נערוך את הפרופיל</div>
        )
    }
}
export default MyProfile;