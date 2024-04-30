import React from "react";
import axios from "axios";

class Search extends React.Component{

     state = {
         searchBox: "",
         allUsers:[],
         user:{}
      }

    SERVER_URL = "http://localhost:9030/";

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

    componentDidMount(){
        this.getFromServer(this.SERVER_URL + "get-user-by-token?token="+ this.props.token,
            (response)=>{this.changeValueByKey("user",response.data.user)});
    }

    getUsers =()=>{

        this.getFromServer(this.SERVER_URL + "get-users-by-prefix?prefix="+this.state.searchBox + "&id=" + this.state.user.id,
            (response)=>{
            this.setState({
                allUsers : response.data.list
            },this.updateFollowingStatus)

            })

    }

    handleSearchBoxChange = (event) =>{
        this.setState({
            searchBox: event.target.value
        },()=>{
            this.getUsers();
        })

    }



    updateFollowingStatus = () => {

        const updatedUsers = [...this.state.allUsers];

        updatedUsers.forEach((user, index) => {
            const url =
                this.SERVER_URL +
                "is-user-following?id=" +
                this.state.user.id +
                "&followingId=" +
                user.id;

            this.getFromServer(url, (response) => {
                if (response.data.success) {
                    const isFollowing = response.data.result;

                    updatedUsers[index] = { ...user, following: isFollowing };

                    if (index === updatedUsers.length - 1) {
                        this.setState({ allUsers: updatedUsers });
                    }
                }
            });
        });
    };

    addFollow =(followingId) =>{

        this.getFromServer(this.SERVER_URL + "add-follow?id=" + this.state.user.id +"&followingId=" + followingId,
            (response)=>{
            if (response.data.success){
                this.setState((prevState) => ({
                    allUsers: prevState.allUsers.map((user) =>
                        user.id === followingId
                            ? { ...user, following: true }
                            : user
                    ),
                }))
            }

        })

    }

      render() {
         return(
             <div>
                 <input value={this.state.searchBox}
                        onChange={this.handleSearchBoxChange}
                 />

                 {
                     this.state.allUsers.length===0?
                         <div> No users</div>
                         :
                         <div>
                             <div>
                                 {this.state.allUsers.map(item =>
                                     (<div> {item.username}
                                         { item.following === false &&
                                         <button  onClick={() => this.addFollow(item.id)}>
                                             Follow
                                         </button>}
                                     </div>))}
                             </div>
                         </div>
                 }

             </div>
         )
      }
}

export default Search;