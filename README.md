# next.js-practice

pages 폴더 안에 기재된 파일 이름 대로(또는 index.ts를 포함한 디렉토리 이름 대로)
자동으로 routing 기능이 적용됨.

예) src/pages/about.ts
localhost:3000/about 에서 해당 파일내의 컴포넌트를 출력해줌.
컴포넌트의 이름은 상관이 없다. Home이든 Potato든 ...
컴포넌트는 default로 export 되어야 한다.

만약에 user가 존재하지 않는 url로 요청한다면
next.js가 자체적으로 404 페이지를 보여줌. (CRA는 404페이지 따로 만들어야됨...)

## exception

1. src/pages/index.ts는 localhost:3000/ 에서 나타난다.
   -> localhost:3000/index 아님. 404 뜸
2. tsx 확장자가 아니더라도 tsx가 적용 가능함. + react를 import하지 않아도 됨.
   -> 안되는데..?? 흠..
3. CRA는 CSR용 라이브러리로 html 파일을 열어봤을 때 빈 div 객체만 있지만
   next.js는 pre-rendering 기능이 있어서 미리 내용을 담아서 html을 만들어준다. (hydration)
   SEO에 매우 좋은 기능임.
