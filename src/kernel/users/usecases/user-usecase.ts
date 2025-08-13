import { UseCase } from "@/kernel/common/usecase.js";
import { createError } from "@/kernel/error/app-error.js";
import type { UserRepository } from "@/kernel/users/user-repository.js";
import type {
  GetUsersParams,
  GetUsersResult,
} from "@/kernel/users/user-types.js";

export class GetUsersUsecase extends UseCase<
  UserRepository,
  [GetUsersParams],
  GetUsersResult
> {
  protected async _execute(params: GetUsersParams): Promise<GetUsersResult> {
    const result = await this.repository.findAll(params);

    // 総件数が0の場合はエラーにしない
    // offsetが総件数を超える場合のみエラー
    if (result.totalCount > 0 && params.offset >= result.totalCount) {
      throw createError.rangeNotSatisfiable(
        `offset ${params.offset} exceeds total count ${result.totalCount}`
      );
    }

    return result;
  }
}
