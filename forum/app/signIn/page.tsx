export default function SignIn() {
  return (
    <div className="p-20">
      <h4>회원가입</h4>
      <form action="/api/signin" method="POST">
        <input type="text" name="userId" placeholder="아이디" />
        <input type="password" name="password" placeholder="비밀번호" />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
