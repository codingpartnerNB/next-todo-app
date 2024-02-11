import { MongoClient } from "mongodb";

const handler = async(req, res)=>{
    if(req.method === 'POST'){
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://nehab:T9DcXVDbTd82KCTP@cluster0.q4j14gt.mongodb.net/todos');
        const db = client.db();
        const todoCollection = db.collection('todosdb');
        const result = await todoCollection.insertOne(data);
        console.log(result);
        client.close();
        res.status(201).json({message: "Todo Inserted!"});
    }
}

export default handler;