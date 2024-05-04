import { Client as ElasticClient} from '@elastic/elasticsearch' ;
import { Client, Functions, ExecutionMethod } from "appwrite";
import conf from '../conf/conf'

export class ElasticSearchService{
    elasticClient;
    client = new Client();
    functions;

    constructor(){
        this.elasticClient=new ElasticClient({
            node: 'https://efcf1b6ef1b548ecba76d729779e8b9e.us-central1.gcp.cloud.es.io:443',
            auth:{
                apiKey:conf.elasticSearchApi
            }
        });
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.functions=new Functions(this.client);
    }

    async searchTracks(query){
        try {
            const result = await this.functions.createExecution(
                conf.appwriteElasticSearchFunctionId,
                query,
                ExecutionMethod.POST, 
            );
            console.log(result);
            return result;
        } catch (error) {
            console.log("Error in Elastic Search => ",error);
            throw error;
        }
    }
}

const elasticsearchService =new ElasticSearchService();
export default elasticsearchService;