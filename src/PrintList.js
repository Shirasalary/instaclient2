import React from "react";
import axios from "axios";

class PrintList extends React.Component{

    state = {
        list: [],
        backButton: false
    }

    componentDidMount(){
        axios.get(this.props.path)
            .then(response => {
                if (response.data.success) {
                    this.setState({
                        list : response.data.list
                    })
                }else {
                  console.log("הרשימה לא הגיעה" + response.data.errorCode )
                }

            })
        this.setState({
            backButton: this.props.backButton
        })
    }

    render() {
        return (
            <div>
                {this.state.backButton &&
                <button onClick={this.props.funcGoBack} className={"right"}>
                    Go back
                </button>}

                {this.state.list.length === 0 ? (
                    <div>No data to show</div>
                ) : (
                    <div>
                        {this.state.list.map((item) => (
                            <div >{this.state.backButton? item.username : item.text}</div>
                        ))}
                    </div>
                )}
            </div>
        );
    }

}
export default PrintList;