const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://hyeonu:qq98933096@cluster0.gzfxb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function main() {
  try {
    // 커넥션을 생성하고 연결을 시도
    await client.connect();

    console.log('MongoDB 접속 성공');

    // test 데이터베이스의 person 컬렉션을 가져옴
    const collection = client.db('test').collection('person');


    // Document 하나 추가
    await collection.insertOne({ name: 'Andy', age: 30 });
    console.log('document 추가 완료');

    // Document 찾기 
    const documents = await collection.find({ name: 'Andy' }).toArray();
    console.log('찾은 document:', documents);

    // Document 갱신하기
    await collection.updateOne({ name: 'Andy' }, { $set: { age: 31 } });
    console.log('document 업데이트');
    
    // 갱신된 Document 확인하기
    const updatedDocuments = await collection.find({ name: 'Andy' }).toArray();
    console.log('갱신된 document :', updatedDocuments);

    // Document 삭제하기
    // await collection.deleteOne({ name: 'Andy' });
    console.log('document 삭제');

    // 연결 끊기 
    await client.close();
  } catch (err) {
    console.error(err);
  }
}

main();