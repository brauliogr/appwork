//db.js
const mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost:27017", { useUnifiedTopology: true })
            .then(conn => global.conn = conn.db("appwork"))
            .catch(err => console.log(err))

function findAll(callback){
    global.conn.collection("customers").find({}).toArray(callback);

}


var ObjectId = require("mongodb").ObjectId;

function findOne(id, callback){  
    global.conn.collection("customers").find(new ObjectId(id)).toArray(callback);
}

function insert(customer, callback){
    global.conn.collection("customers").insert(customer, callback);
}


function update(id, customer, callback){
    global.conn.collection("customers").updateOne({_id: new ObjectId(id)}, {$set: {nome:customer.nome, sobrenome:customer.sobrenome, idade:customer.idade}}, callback);
}

function deleteOne(id, callback){
    global.conn.collection("customers").deleteOne({_id: new ObjectId(id)}, callback);
}

module.exports = { findAll, insert, findOne, update, deleteOne  }

