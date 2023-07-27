export default function Write() {
  return (
    <div className="p-20">
      <h4>글작성</h4>
      {/* method는 POST와 GET만 가능.. PUT, DELETE 안됨 */}
      <form action="/api/list" method="POST">
        <input
          type="text"
          // name은 formdata에서 value에 대한 키 값이 됨.
          name="title"
          placeholder="글제목"
        />
        <input type="text" name="content" placeholder="글내용" />
        <button type="submit">제출</button>
      </form>
    </div>
  );
}
