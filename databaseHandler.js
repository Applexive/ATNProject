const {MongoClient, ObjectId} = require('mongodb')
const DATABASE_URL = 'mongodb+srv://apple-user23:applesensei34@cluster0.1keu9.mongodb.net/test'
const DATABASE_NAME = 'QuangDB'

async function insertToDB(obj, collectionName){
    const dbo = await getDatabase()
    const result = dbo.collection(collectionName).insertOne(obj)
}

async function getDatabase() {
    const client = await MongoClient.connect(DATABASE_URL)
    const dbo = client.db(DATABASE_NAME)
    return dbo
}

async function getAll(collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).find({}).toArray()
    return result
}

async function deleteObject(id,collectionName){
    const dbo = await getDatabase()
    dbo.collection(collectionName).deleteOne({_id:ObjectId(id)})
}

async function updateDocument(id, updateValues,collectionName){
    const dbo = await getDatabase();
    await dbo.collection(collectionName).updateOne({_id:ObjectId(id)},updateValues)
}

async function getDocumentById(id,collectionName){
    const dbo = await getDatabase()
    const result = await dbo.collection(collectionName).findOne({_id:ObjectId(id)})
    return result;
}

module.exports = {insertToDB, getAll, deleteObject, getDocumentById, updateDocument}



