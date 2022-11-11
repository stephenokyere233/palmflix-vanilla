export const API_KEY = '49aadc9bda210df9f0d47e374c404fd5'

export const api_url = `https://api.themoviedb.org/3/`;
export const img_path = `https://image.tmdb.org/t/p/w1280`;
export const popular_movies = `${api_url}movie/popular?api_key=${API_KEY}&language=en-US`;
export const discover_movies = `${api_url}discover/movie?api_key=${API_KEY}&language=en-US`;
export const tv_shows = `${api_url}tv/popular?api_key=${API_KEY}&language=en-US`;
export const trending_movies = `${api_url}trending/all/day?api_key=${API_KEY}&language=en-US`;
export const top_rated = `${api_url}discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${API_KEY}&language=en-US`;
export const search_url = `${api_url}search/multi?api_key=${API_KEY}&language=en-US&page=1`;