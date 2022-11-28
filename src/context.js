import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";

const API = 'http://hn.algolia.com/api/v1/search?'

const initialState = {
    isLoading: true,
    query: 'HTML',
    page: 0,
    nbPages: 0,
    hits: [],
}

const AppContext = createContext()

const AppProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    const fetchApiData = async (url) => {
        dispatch({type: 'SET_LOADING'})
        try {
            const res = await fetch(url)
            const data = await res.json()
            dispatch({type:'GET_STORIES', payload: {hits:data.hits, nbPages: data.nbPages}})
        } catch (error) {
            console.log(error)
        }
    }

    // Removing post
    const removePost = (postId) => {
        dispatch({type: 'REMOVE_POST', payload: postId})
    }

    // Searching post
    const searchPost = (serachQuery) => {
        dispatch({type:'SEARCH_POST', payload:serachQuery})
    }

    // Pagination
    // prev page
    const getPrevPage = () => {
        dispatch({type: 'PREV_PAGE'})
    }

    // next page
    const getNextPage = () => {
        dispatch({type: 'NEXT_PAGE'})
    }

    // fteching api data
    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page}`)
    }, [state.query, state.page])


    return <AppContext.Provider value={{ ...state, removePost, searchPost, getPrevPage, getNextPage }}>{children}</AppContext.Provider>
}

const useGlobalContext = () => {
    return useContext(AppContext)
}

export {AppProvider, useGlobalContext}