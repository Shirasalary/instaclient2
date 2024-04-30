import React from "react";
import axios from "axios";
import ProfileImage from "./ProfileImage";
import PrintList from "./PrintList";
import {sendApiRequest} from "./Api";


class MyProfile extends React.Component{

    state = {
        user: {},
        picture:"",
        newPost:"",
        allPosts: [],
        showProfile: true,

        path:""
    }
    SERVER_URL = "http://localhost:9030/"

    changeValueByKey = (key, value) => {
        this.setState({
            [key]: value
        })
    }

    getFromServer = (path , onSuccess) =>{
        axios.get(path)
            .then((response) => {
                if (response.data.success){
                    console.log("success");
                    onSuccess(response);
                }else {
                    console.log("errorCode " +response.data.errorCode );
                }
            })

    }


    componentDidMount() {

        this.getUser();
        this.getAllUserPosts();

    }

    getUser = () => {
        this.getFromServer(this.SERVER_URL + "get-user-by-token?token="+ this.props.token,
            (response)=>{this.changeValueByKey("user",response.data.user)});

    }

    getAllUserPosts =() =>{

        this.getFromServer(this.SERVER_URL + "get-user-all-posts?token="+ this.props.token,
            (response)=>{this.changeValueByKey("allPosts",response.data.list)});
    }

    saveNewPost = () =>{

        this.getFromServer(this.SERVER_URL + "save-post?id="+ this.state.user.id
            + "&text=" + this.state.newPost,(response)=>{
            this.getAllUserPosts();
            this.changeValueByKey("newPost","");});

    }
    saveProfileImage = () => {
        this.getFromServer(this.SERVER_URL+ "save-image-url?id="+this.state.user.id + "&url="+this.state.picture,
            (response)=>{
                this.getUser();
                this.changeValueByKey("picture","");
            })

    }

    createButton = (text, onClick) => {
        return (
            <button onClick={onClick}>
                {text}
            </button>
        );
    }


    goBack = () =>{
        this.changeValueByKey("showProfile", true)
    }

    onClickFollowersAndFollowing = (path)=>{
        this.changeValueByKey("showProfile", false);
        this.changeValueByKey("path", path);
    }

    render() {
        return (
            <div>
                {this.state.showProfile ? (
                    <div>
                        <ProfileImage imageUrl={this.state.user.pictureUrl} />
                        <div>
                            {this.createButton("Followers", () => {
                                this.onClickFollowersAndFollowing(this.SERVER_URL + "get-followers?id="+this.state.user.id);
                            })}

                            {this.createButton("Following",()=>{
                                this.onClickFollowersAndFollowing (this.SERVER_URL+"get-following?id="+this.state.user.id);
                            })}

                            <div>
                                {this.state.allPosts.length === 0 ?
                                    <div> No posts </div>
                                :
                                    <div>
                                        {this.state.allPosts.map(item =>(<div> {item.text}
                                        </div>))}
                                    </div>
                                }
                            </div>
                            
                        </div>
                        <div >
                            <div className="left">
                                <input
                                    value={this.state.picture}
                                    onChange={(event) => {
                                        this.changeValueByKey("picture", event.target.value);
                                    }}
                                />
                                {this.createButton("Change Image",this.saveProfileImage )}
                            </div>

                            <div className="left">
                                <textarea
                                    value={this.state.newPost}
                                    onChange={(event) => {
                                        this.changeValueByKey("newPost", event.target.value);
                                    }}
                                ></textarea>
                                {this.createButton("Post",this.saveNewPost)}
                            </div>
                        </div>
                    </div>
                ) :
                    (
                    <div>
                        <PrintList path={this.state.path}
                                   backButton={"true"}
                                   funcGoBack={this.goBack}/>
                    </div>
                    )}
            </div>
        );
    }

}

export default MyProfile;