import React, { Component } from "react";
import api from "../services/api";
import io from "socket.io-client";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from "react-native";

import Camera from "../assets/camera.png";
import More from "../assets/more.png";
import like from "../assets/like.png";
import coment from "../assets/coment.png";
import send from "../assets/send.png";

export default class Feed extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate("New")}>
        <Image style={{ marginRight: 20 }} source={Camera} />
      </TouchableOpacity>
    )
  });

  state = {
    feed: []
  };

  async componentDidMount() {
    this.registerToSoccket();

    const response = await api.get("posts");

    this.setState({ feed: response.data });
  }

  registerToSoccket = () => {
    const socket = io("http://192.168.1.3:3333");

    socket.on("post", newPost => {
      this.setState({ feed: [newPost, ...this.state.feed] });
    });

    socket.on("like", likedPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post.id === likedPost.id ? likedPost : post
        )
      });
    });
  };

  handleLike = id => {
    api.post(`/posts/${id}/like`);
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.name}>{JSON.stringify(this.state.feed )}</Text> */}
        <FlatList
          data={this.state.feed}
          keyExtractor={post => post.id}
          renderItem={({ item }) => (
            <View style={styles.feedItem}>
              <View style={styles.feedItemHeader}>
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item.author}</Text>
                  <Text style={styles.place}>{item.place}</Text>
                </View>

                <Image source={More} />
              </View>
              <Image
                style={styles.feedImage}
                source={{ uri: `http://192.168.1.3:3333/files/${item.image}` }}
              />

              <View style={styles.feedItemfooter}>
                <View style={styles.actions}>
                  <TouchableOpacity
                    style={styles.action}
                    onPress={() => this.handleLike(item.id)}
                  >
                    <Image source={like} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={coment} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.action} onPress={() => {}}>
                    <Image source={send} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.likes}>{item.likes} Curtidas </Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.hashtags}>{item.hashtags}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  feedItem: {
    marginTop: 20
  },

  feedItemHeader: {
    paddingHorizontal: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  name: {
    fontSize: 14,
    color: "#000"
  },

  place: {
    fontSize: 12,
    color: "#666",
    marginTop: 2
  },

  feedImage: {
    width: "100%",
    height: 400,
    marginVertical: 15
  },
  feedItemfooter: {
    paddingHorizontal: 15
  },

  actions: {
    flexDirection: "row"
  },

  action: {
    marginRight: 8
  },
  like: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#000"
  },
  description: {
    lineHeight: 18,
    color: "#000"
  },
  hashtags: {
    color: "#7159c1"
  }
});
