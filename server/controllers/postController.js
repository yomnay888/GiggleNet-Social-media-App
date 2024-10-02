import postService from '../services/postService.js';
class postController{
        static async createPost(request, response) {
            try{
                const userId = request.userId;
                const postContent = request.body.content;
                console.log('postContent:', postContent);
                const mediaFiles = (request.files || []).map(file => ({
                    mediaType: file.mimetype.startsWith('image') ? 'image' : 'video',
                    path: file.path.replaceAll('\\', '/'),
                }))
    
                const createdPost = await postService.createPost(postContent, mediaFiles, userId);
                console.log('createdPost:', createdPost);
                return response.status(201).json(createdPost);
            } catch(error){
                console.error('Error creating post:', error);
                return response.status(500).json({ message: error.message });
            }
    
        }
        static async updatePost(request,response){
            try {
                const userId = request.userId;
                const postId = +request.params.postId;
                const postContent = request.body.content;
                const existingMediaFiles = (request.body.existingMediaFiles || []).map(fileString => (JSON.parse(fileString)));
                const newMediaFiles = (request.files || []).map(file => ({
                    mediaType: file.mimetype.startsWith('image') ? 'image' : 'video',
                    path: file.path.replaceAll('\\', '/'),
                }))    
    
                const mediaFiles = [...existingMediaFiles, ...newMediaFiles];
                console.log('mediaFiles:', mediaFiles);
                const post = await postService.updatePost(postContent, postId, mediaFiles, userId);
                return response.status(200).json(post);
    
            } catch(error){
                console.error('Error updating post:', error);
                return response.status(500).json({ message: error.message });
            }
        }
        static async deletePost(req,res){
            const postId = +req.params.postId;
            const userId = req.userId;
            try{
                await postService.deletePost(postId,userId);
                res.status(201).json({ message: 'Post deleted successfully'});
            }
            catch(error){
                res.status(400).json({ error: error.message });    
            }
        }
        static async getUserPostsByPagination(request,response){
            const page = +request.query.page  ||1;
            const limit = +request.query.limit  ||10;
            const userId = +request.params.userId;
            try{
                const paginationResults = await postService.getUserPostsByPagination(page, limit, userId);
                return response.status(200).json(paginationResults);
            }catch(error){
                console.error('Error getting user posts:', error);
                return response.status(422).json({ message: error.message });
            }
        }
        static async getAllPosts(req,res){
            return res.status(200).json(req.paginatedResult);
        }
       static async getPostsByPagination (request, response){
            const page = +request.query.page  ||1;
            const limit = +request.query.limit  ||10;
            const userId = request.userId;
            console.log(page,limit);
            try{
                const paginationResults = await postService.getPostsByPagination(userId,page, limit);
                return response.status(200).json(paginationResults);
            }catch(error){
                console.error('Error getting posts:', error);
                return response.status(422).json({ message: error.message });
            }
        }
        static async likePost(req,res){
            const postId= +req.params.postId;
            const userId = req.userId;
            try{
                await postService.likePost(postId,userId);
                res.status(200).json({ message: 'Post liked successfully'});
            }catch(error){
                res.status(400).json({error:error.message});
            }
        }
        static async unlikePost(req,res){
            const postId = +req.params.postId;
            const userId = req.userId;
            try{
                await postService.unlikePost(postId,userId);
                res.status(200).json({ message: 'Post unliked successfully'});
            }catch(error){
                res.status(400).json({error:error.message});
            }
        }
        static async getPostLikes(req,res){
            const postId = +req.params.postId;
            try{
                const likes = await postService.getPostLikes(postId);
                res.status(200).json({ likes });
            }catch(error){
                res.status(400).json({error:error.message});
            }
        }
}
export default postController;