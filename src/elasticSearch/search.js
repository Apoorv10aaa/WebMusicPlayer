import { Client, Functions, ExecutionMethod } from 'appwrite';
import conf from '../conf/conf'

export class ElasticSearchService{
    client;
    functions;

    constructor(){
        this.client=new Client()
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