import axios from 'axios'
import { API_KEY, BASE_URL } from '../config/apiConfig';

export const fetchShows = async (type,category) => {
    try {
        const url = `${BASE_URL}/${type}/${category}?api_key=${API_KEY}`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export const fetchSearch = async (search, searchCategory) => {
    try {
        const url = `${BASE_URL}/search/${searchCategory}?api_key=${API_KEY}&query=${search}`;
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
};
