import { MongoClient, ObjectId } from "mongodb";

const handler = async(req, res)=>{
    if(req.method === 'PATCH'){
        const { todoId } = req.query;
        const status = req.body;

        const client = await MongoClient.connect('mongodb+srv://nehab:T9DcXVDbTd82KCTP@cluster0.q4j14gt.mongodb.net/todos');
        const db = client.db();
        const todoCollection = db.collection('todosdb');

        const id = new ObjectId(todoId);
        try{
            const result = await todoCollection.updateOne({_id: id},{$set:status});
            console.log(result);
            if(result.matchedCount > 0){
                res.status(200).json({message: 'Todo Updated!'});
            }else{
                res.status(404).json({message: 'Could not find todo'});
            }
        }catch(error){
            console.error('Error updating todo:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }finally{
            client.close();
        }
    }
}

export default handler;