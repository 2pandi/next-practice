export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <p>현대카드 무이자 이벤트중</p>
        {children}
      </body>
    </html>
  );
}
