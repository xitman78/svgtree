import React, { Component } from 'react';
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

import { fetchPosts } from '../../../actions/actionCreator'
import PostInfo from '../../../components/post-info'

class PostDetails extends Component {

  componentDidMount() {
    // console.log(this.props.params.id);

    let postId = this.props.params.id;
    let post = this.props.posts.find(p => p.id == postId);

    if(!post) this.props.fetchPosts();

  }


  render() {

    let postId = this.props.params.id;
    let post = this.props.posts.find(p => p.id == postId);

    return (
      <div className="child-container">
        <Helmet title={post && post.title ? post.title : "Post details" } />
        <h2 className="page-title">Post Details</h2>
          <PostInfo {...post} />
      </div>
    )
  };

}

export default connect(
  state => ({ posts: state.getIn(['posts', 'posts']).toJS() }),
  { fetchPosts }
)(PostDetails);
