// reflect-metadataはTypeScriptのデコレータとメタデータAPIを有効にする
// InversifyJSが型情報を取得するために必要
import "reflect-metadata";
import { Container } from "inversify";
import { GetUsersUsecase } from "@/kernel/users/usecases/get-users-usecase.js";
import { TYPES } from "./types.js";

// DIコンテナのインスタンスを作成
const container = new Container();

// バインディング（依存関係の登録）
// bind<インターフェース型>(識別子).to(実装クラス).スコープ()

// UserServiceの登録
// UserServiceがUserRepositoryに依存していても、
// InversifyJSが自動的に依存関係を解決してインスタンスを生成
container
  .bind<GetUsersUsecase>(TYPES.GetUsersUsecase)
  .to(GetUsersUsecase)
  .inSingletonScope();

export { container };
