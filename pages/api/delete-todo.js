import { MongoClient, ObjectId } from "mongodb";

const handler = async(req, res)=>{
    if(req.method === 'DELETE'){
        const { todoId } = req.query;

        const client = await MongoClient.connect('mongodb+srv://nehab:T9DcXVDbTd82KCTP@cluster0.q4j14gt.mongodb.net/todos');
        const db = client.db();
        const todoCollection = db.collection('todosdb');

        const id = new ObjectId(todoId);
        try{
            const result = await todoCollection.deleteOne({_id: id});
            console.log(result);
            res.status(200).json({message: "Todo Deleted!"});
        }catch(error){
            console.error('Error deleting todo:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }finally{
            client.close();
        }
    }
}

export default handler;