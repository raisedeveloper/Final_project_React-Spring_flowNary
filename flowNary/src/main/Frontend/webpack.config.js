import { resolve as _resolve } from 'path';

export const entry = './src/index.js';
export const output = {
  filename: 'bundle.js', // 번들 파일 이름
  path: _resolve(__dirname, 'dist'), // 번들 파일이 저장될 경로
  clean: true, // 이전 빌드 파일들을 모두 제거
};
export const mode = 'development';
export const module = {
  rules: [
    {
      test: /\.js$/, // .js 확장자를 가진 파일에 대하여
      exclude: /node_modules/, // node_modules 폴더는 제외
      use: {
        loader: 'babel-loader', // babel-loader를 사용하여 ES6+ 코드를 변환
        options: {
          presets: ['@babel/preset-env'] // @babel/preset-env 프리셋 사용
        }
      }
    }
  ]
};
export const resolve = {
  fallback: {
    "http": require.resolve("stream-http") // http 모듈에 대한 폴리필 지정
  }
};
