import axios from 'axios';
import { setAlert } from './alert';
import { ADD_POST, DELETE_POST, GET_POSTS, POST_ERROR, UPDATE_LIKES } from './types';


// Get posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// Add like
export const addLike = (postID) => async dispatch => {
    try {
        const res = await axios.put(`api/posts/like/${postID}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postID, likes: res.data }
        })
    } catch (err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// Remove likes
export const removeLike = (postID) => async dispatch => {
    try {
        const res = await axios.put(`api/posts/unlike/${postID}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { postID, likes: res.data }
        })
    } catch (err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}


// Delete post
export const deletePost = (postID) => async dispatch => {
    try {
        await axios.delete(`api/posts/${postID}`);

        dispatch({
            type: DELETE_POST,
            payload: postID
        })

        dispatch(setAlert('Post removed', 'success'));
    } catch (err) { 

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}

// Add post
export const addPost = formData => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }


    try {
        const res = await axios.post(`api/posts/`, formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        })

        dispatch(setAlert('Post created', 'success'));
    } catch (err) {

        dispatch({
            type: POST_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        })
    }
}