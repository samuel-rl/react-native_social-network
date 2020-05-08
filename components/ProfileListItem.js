import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Avatar } from 'react-native-paper';
import Fire from '../tools/Fire';

class ProfileListItem extends Component {
	state = {
        follow: false,
        me: true,
	};

	componentDidMount() {
		this.loadSearch();
    }

    loadSearch = () =>{
        Fire.shared.following(this.props.uid).then(res => {
			if(this.props.uid == Fire.shared.uid){
                console.log("true")
                this.setState({
                    follow: res,
                    me: true
                });
            }else{
                console.log("false")
                this.setState({
                    follow: res,
                    me: false
                });
            }
        });
    }

    
    followHim = async(uid) => {
        const follow = this.state.follow;
        const me = this.state.me;
        if(me == false){
            if(follow === false){
                this.setState({
                    follow: true
                })
                Fire.shared.follow(uid)
            }
            if(follow === true){
                this.setState({
                    follow: false
                })
                Fire.shared.unfollow(uid)
            }
        }else{
            alert("impossible")
        }
    }

	renderFollow = () => {
        var follow = this.state.follow;
        const me = this.state.me;
        if(me === true){

            return(<View></View>);
        }
		if (follow === false) {
			return <SimpleLineIcons name="user-follow" size={30} />;
		} else {
			return <SimpleLineIcons name="user-following" size={30} />;
		}
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.avatar}>
					<Avatar.Image
						source={this.props.avatar ? { uri: this.props.avatar } : require('../assets/avatar.png')}
						size={100}
					/>
				</View>
				<View style={styles.containerDescription}>
					<Text style={styles.description}>
						{this.props.firstname + ' ' + this.props.name}
					</Text>
				</View>
				<TouchableOpacity style={styles.containerFollow} onPress={() => this.followHim(this.props.uid)}>
					{this.renderFollow()}
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		alignContent: 'center',
		justifyContent: 'center',
		marginVertical: 10,
		marginLeft: 10,
	},
	description: {
		fontSize: 18,
	},
	avatar: {
		flex: 1,
	},
	containerDescription: {
		flex: 2,
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerAdd: {
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerFollow: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default ProfileListItem;
