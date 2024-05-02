const conf={
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteUsersId: String(import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID),
    appwriteTracksId: String(import.meta.env.VITE_APPWRITE_TRACKS_COLLECTION_ID),
    appwriteAlbumsId: String(import.meta.env.VITE_APPWRITE_ALBUMS_COLLECTION_ID),
    appwritePlaylistsId: String(import.meta.env.VITE_APPWRITE_PLAYLISTS_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    elasticSearchApi: String(import.meta.env.VITE_ELASTIC_SEARCH_API),
    appwriteApiKey: String(import.meta.env.VITE_APPWRITE_API_KEY),
    appwriteElasticSearchFunctionId: String(import.meta.env.VITE_APPWRITE_ELASTIC_SEARCH_FUNCTION_ID),
}
export default conf;