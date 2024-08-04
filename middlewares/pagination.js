export const pagination = (Model) => async (req, res, next) => {
    const page = parseInt(req.query.page)||1;
    const limit = parseInt(req.query.limit)||10;
    console.log('page', page);
    console.log('limit', limit);
    const startIndex = (page-1)*limit;
    console.log('startIndex', startIndex);
    const endIndex = page * limit;
    const id = req.params.postId;
    console.log('id', id);
    try{
        const totalNumOfRes = await Model.countTotal(id);
        console.log('totalNumOfRes', totalNumOfRes);
        const results = await Model.findAllPaginated(startIndex, limit,id);
        console.log('results', results);
        const paginatedResult = {
            results: results,
            totalNumOfRes: totalNumOfRes,
        };
        if(startIndex > 0) {
            paginatedResult.previousPage = page - 1
        }

        if (endIndex < totalNumOfRes) {
            paginatedResult.nextPage = page + 1
        }
            
        req.paginatedResult = paginatedResult;
        next();
    } catch (error) {
        console.error('Error paginating:', error);
        return response.status(500).json({ message: error.message });
    }
}