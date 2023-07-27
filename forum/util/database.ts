import { FindOptions, ConnectOptions, MongoClient, ObjectId } from "mongodb";

const url = process.env.NEXT_APP_MONGO_DB_URL;
const options = { useNewUrlParser: true };
let connectDB: Promise<MongoClient>;

// ⭐️ 개발 환경 상태면 global이라는 전역변수 안에 보관해줘
if (process.env.NODE_ENV === "development") {
  if (!global._mongo) {
    global._mongo = new MongoClient(url!, options as ConnectOptions).connect();
  }
  connectDB = global._mongo;
} else {
  connectDB = new MongoClient(url!, options as ConnectOptions).connect();
}

export { connectDB };

/** ⭐️ 처럼 작성하는 이유
 * Next.js의 경우 파일이 저장될 때마다 js 파일이 재실행되기 때문에
 * connect 함수 하나만 그냥 적어 놓으면 MongoClient.connect가 동시에 여러개 실행될 수도 있다.
 * 그렇게 되면 DB의 입출력 속도가 매우 저해될 수 있다.
 * 이를 방지하기 위해서 if문으로 개발(development) 상태일 때 mongoClient를 global 객체에 저장하는 것.
 *
 * 개발 환경이 아닌 실제 프로덕션 상태일 때는 global을 사용하지 않는 게 좋기 때문에 else로 예외처리를 해준다.
 * (프로덕션 환경에서는 중복으로 실행될 일이 없음.)
 */

export const getDB = async (DBName: string) => {
  return (await connectDB).db(DBName);
};

export const getCollection = async (DBName: string, collectionName: string) => {
  return (await getDB(DBName)).collection(collectionName);
};

export const getDBResultToArray = async (
  DBName: string,
  collectionName: string
) => {
  return (await getCollection(DBName, collectionName)).find().toArray();
};

export const findOneDocument = async (
  DBName: string,
  collectionName: string,
  query: any,
  options?: FindOptions
) => {
  return (await getCollection(DBName, collectionName)).findOne(query, options);
};

export const insertOneDocument = async (
  DBName: string,
  collectionName: string,
  doc: any
) => {
  await (await getCollection(DBName, collectionName)).insertOne(doc);
};

export const updateOneDocument = async (
  DBName: string,
  collectionName: string,
  id: string,
  doc: any
) => {
  return (await getCollection(DBName, collectionName)).updateOne(
    // 수정할 게시물 정보
    { _id: new ObjectId(id) },
    // 수정할 내용
    { $set: { ...doc } }
  );
};

export const deleteOneDocument = async (
  DBName: string,
  collectionName: string,
  id: string
) => {
  return (await getCollection(DBName, collectionName)).deleteOne({
    _id: new ObjectId(id),
  });
};
