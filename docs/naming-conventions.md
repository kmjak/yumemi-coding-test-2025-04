# 命名規則

## 変数

- **規則**: キャメルケース
- **例**:
  - `const userName = 'John';`
  - `const userAge = 25;`

## 定数

- **規則**: スネークケース（全大文字）
- **例**:
  - `const MAX_USER_COUNT = 100;`
  - `const API_URL = 'https://api.example.com';`

## 関数

- **規則**: キャメルケース
- **例**:
  - `function calculateTotalPrice(price, quantity) { return price * quantity; }`
  - `const fetchData = () => { /* fetch logic */ };`

## 関数の引数

- **規則**: キャメルケース
- **例**:
  - `function getUserInfo(userId, userName) { /* ... */ }`
  - `const handleClick = (event) => { /* ... */ };`

## 設定オブジェクト

- **規則**: キャメルケース
- **例**:
  - `const apiConf = { ... };`
  - `const apiPath = { ... };`

## コンポーネント

- **規則**: パスカルケース
- **例**:
  - `function UserProfile() { /* JSX content */ };`
  - `const Header = () => { /* JSX content */ };`

## 型定義

- **規則**: パスカルケース
- **例**:
  - `interface UserProfile { name: string; age: number; };`
  - `interface ProductDetails { id: number; title: string; price: number; };`
