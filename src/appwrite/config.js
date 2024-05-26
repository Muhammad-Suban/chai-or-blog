import conf from '../conf/conf'
import { Client, Databases ,ID,Query,Storage} from "appwrite";

export class Service{

    client = new Client();
    databases;
    bucket;  // like storage

    constructor(){

        this.client 

        .setEndpoint(conf.appwriteUrl) // Your API Endpoint
        .setProject(conf.appwriteProjectId)
  
        this.databases = new Databases(this.client)
        this.bucket = new Databases(this.client)
    }

    async createBlog({title,content,featuredImage,slug,status,userId}){

        try {
            
           return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

        } catch (error) {
            console.log("Appwrite service ::  Update blog ::error",error)
            
        }

    }

    //slug role like user-id (unique)
    async updateBlog(slug,{title,content,featuredImage,status}){

        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
            
        } catch (error) {
            console.log("Appwrite service ::  create blog ::error",error)
            
        }
    }

    async deleteBlog(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
            
        } catch (error) {
            console.log("Appwrite service ::  Delete blog ::error",error)
            
            return false
        }
    } 

    // get 1 blog
    async getBLog(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            // return true

        } catch (error) {
            console.log("Appwrite service ::  GET SINGLE blog ::error",error)
            return false
        }
        
    }
    
    // get all blog     which (status = active )
                        // use(querie)   SYNTAX var queries = []
    async getBlogs(queries = [Query.equal ("status","active")]){
        try {
            
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )

        } catch (error) {
            
            console.log("Appwrite service ::  GET SINGLE blog ::error",error)
            return false
        }
    }

    //file services
                      // file argument --> blog like addres
    async fileUpload(file){
        try {
            
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),  //import in above 
                file
            ) 
        } catch (error) {
            console.log("Appwrite service ::  GET file ::error",error)
            return false
        }
    }
    
   
    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,  //in above fx (create file return file_id which we used here)
            )
            
        } catch (error) {
            console.log("Appwrite service ::  Delete file ::error",error)
            return false
            
        }
    }
    
    filePreview (fileId){
            
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
    }

}

const service = new Service();

export default  service