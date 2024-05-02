import { Client as ElasticClient} from '@elastic/elasticsearch' ;
import conf from '../conf/conf'

export class ElasticSearchService{
    elasticClient;

    constructor(){
        this.elasticClient=new ElasticClient({
            node: 'https://efcf1b6ef1b548ecba76d729779e8b9e.us-central1.gcp.cloud.es.io:443',
            auth:{
                apiKey:conf.elasticSearchApi
            }
        });
    }

    async searchTracks(query){
        try {
            const response = await fetch(conf.appwriteElasticSearchFunctionId , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': conf.appwriteProjectId,
                    'X-Appwrite-Key': conf.appwriteApiKey,
                },
                body: JSON.stringify({ query: query })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Error in Elastic Search => ",error);
            throw error;
        }
    }
}

const elasticsearchService =new ElasticSearchService();
export default elasticsearchService;