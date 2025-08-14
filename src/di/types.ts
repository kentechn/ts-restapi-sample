// DIコンテナで使用する識別子（シンボル）を定義
// Symbol.for()を使うことで、同じ文字列から同じシンボルが生成される
export const TYPES = {
  UserRepository: Symbol.for("UserRepository"),
  GetUsersUsecase: Symbol.for("GetUsersUsecase"),
};
