const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();

let db;

async function conectarMongo() {
    const client = new MongoClient(process.env.MONGOURL, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        db = client.db("gestor_financeiro");
        console.log("Conexão com o MongoDB bem-sucedida!");
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB:", error);
        process.exit(1);
    }
}

function getDb() {
    if (!db) {
        throw new Error('Banco de dados não conectado!');
    }
    return db;
}

async function criarDocumento(collectionName, data) {
    const db = getDb();
    const result = await db.collection(collectionName).insertOne(data);
    return result;
}

async function consultarDocumentos(collectionName, filter = {}) {
    const db = getDb();
    const documentos = await db.collection(collectionName).find(filter).toArray();
    return documentos;
}

async function consultarDocumentoPorId(collectionName, id) {
    const db = getDb();
    const documento = await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
    return documento;
}

async function atualizarDocumento(collectionName, id, updateData) {
    const db = getDb();
    const result = await db.collection(collectionName).updateOne(
        { _id: new ObjectId(id) },
        updateData
    );
    return result;
}

async function deletarDocumento(collectionName, id) {
    const db = getDb();
    const result = await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
    return result;
}

async function deletarColecao(collectionName) {
    const db = getDb();
    const result = await db.collection(collectionName).drop();
    return result;
}

async function criarColecao(collectionName) {
    const db = getDb();
    const result = await db.createCollection(collectionName);
    return result;
}

module.exports = {
    conectarMongo,
    getDb,
    criarDocumento,
    consultarDocumentos,
    consultarDocumentoPorId,
    atualizarDocumento,
    deletarDocumento,
    deletarColecao,
    criarColecao,
    ObjectId
};