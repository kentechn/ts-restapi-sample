import type { AppError } from "../error/app-error.js";

export abstract class UseCase<
  R,
  TArgs extends readonly unknown[] = unknown[],
  TResult = unknown
> {
  constructor(protected repository: R) {}

  /**
   * 具象クラスで実装するビジネスロジック本体
   */
  protected abstract _execute(...args: TArgs): Promise<TResult>;

  /**
   * 具象クラスでオーバーライド可能な、特殊エラーハンドリング
   * デフォルトはnullを返して基底クラスの共通処理に委譲
   */
  protected handleSpecificError(error: unknown): AppError | null {
    return null; // nullを返すと基底クラスの処理に委譲
  }

  /**
   * エラーハンドリングを共通化した公開メソッド
   * 外部からはこのメソッドを呼び出し、内部で具象クラスのビジネスロジックを実行する
   */
  public async execute(...args: TArgs): Promise<TResult> {
    try {
      return await this._execute(...args);
    } catch (error) {
      // 具象クラスの特殊エラー処理を先にチェック
      const specificError = this.handleSpecificError(error);
      if (specificError) {
        throw specificError;
      }

      throw error;
    }
  }
}
