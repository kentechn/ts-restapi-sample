import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import { AppError } from "@/kernel/error/app-error.js";
import { GetUsersUsecase } from "@/kernel/users/usecases/user-usecase.js";
import type { UserRepository } from "@/kernel/users/user-repository.js";
import type { GetUsersParams, User } from "@/kernel/users/user-types.js";

describe("GetUsersUsecase", () => {
  let mockUserRepository: {
    findAll: Mock;
  };
  let getUsersUsecase: GetUsersUsecase;

  beforeEach(() => {
    mockUserRepository = {
      findAll: vi.fn(),
    };
    getUsersUsecase = new GetUsersUsecase(mockUserRepository as UserRepository);
  });

  describe("execute", () => {
    const mockUsers: User[] = [
      {
        id: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
        username: "johndoe",
        email: "john.doe@example.com",
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-01-02T00:00:00Z"),
      },
      {
        id: "01ARZ3NDEKTSV4RRFFQ69G5FAW",
        username: "janesmith",
        email: "jane.smith@example.com",
        createdAt: new Date("2023-01-01T00:00:00Z"),
        updatedAt: new Date("2023-01-02T00:00:00Z"),
      },
    ];

    describe("416 Range Not Satisfiable エラーケース", () => {
      it("総件数5件でoffset=5の場合、416エラーを返すこと", async () => {
        mockUserRepository.findAll.mockResolvedValue({
          users: [],
          totalCount: 5,
        });

        const params: GetUsersParams = { offset: 5, limit: 10 };

        await expect(getUsersUsecase.execute(params)).rejects.toThrow(AppError);

        try {
          await getUsersUsecase.execute(params);
        } catch (error) {
          expect(error).toBeInstanceOf(AppError);
          expect((error as AppError).statusCode).toBe(416);
          expect((error as AppError).toResponseObj().code).toBe(
            "RANGE_NOT_SATISFIABLE"
          );
        }
      });

      it("総件数5件でoffset=10の場合、416エラーを返すこと", async () => {
        mockUserRepository.findAll.mockResolvedValue({
          users: [],
          totalCount: 5,
        });

        const params: GetUsersParams = { offset: 10, limit: 10 };

        await expect(getUsersUsecase.execute(params)).rejects.toThrow(AppError);
      });

      it("総件数100件でoffset=100の場合、416エラーを返すこと", async () => {
        mockUserRepository.findAll.mockResolvedValue({
          users: [],
          totalCount: 100,
        });

        const params: GetUsersParams = { offset: 100, limit: 10 };

        await expect(getUsersUsecase.execute(params)).rejects.toThrow(AppError);
      });
    });

    describe("正常ケース", () => {
      it("総件数5件でoffset=0, limit=3の場合、3件のデータを返すこと", async () => {
        const expectedUsers = [
          mockUsers[0],
          mockUsers[1],
          {
            id: "01ARZ3NDEKTSV4RRFFQ69G5FAX",
            username: "thirduser",
            email: "third.user@example.com",
            createdAt: new Date("2023-01-03T00:00:00Z"),
            updatedAt: new Date("2023-01-03T00:00:00Z"),
          },
        ];
        mockUserRepository.findAll.mockResolvedValue({
          users: expectedUsers,
          totalCount: 5,
        });

        const params: GetUsersParams = { offset: 0, limit: 3 };
        const result = await getUsersUsecase.execute(params);

        expect(result.users).toHaveLength(3);
        expect(result.totalCount).toBe(5);
        expect(result.users).toEqual(expectedUsers);
        expect(mockUserRepository.findAll).toHaveBeenCalledWith(params);
      });

      it("総件数5件でoffset=3, limit=3の場合、2件のデータを返すこと", async () => {
        const expectedUsers = mockUsers.slice(0, 2); // 残り2件をシミュレート
        mockUserRepository.findAll.mockResolvedValue({
          users: expectedUsers,
          totalCount: 5,
        });

        const params: GetUsersParams = { offset: 3, limit: 3 };
        const result = await getUsersUsecase.execute(params);

        expect(result.users).toHaveLength(2);
        expect(result.totalCount).toBe(5);
        expect(mockUserRepository.findAll).toHaveBeenCalledWith(params);
      });

      it("総件数0件でoffset=0の場合、空配列を返すこと", async () => {
        mockUserRepository.findAll.mockResolvedValue({
          users: [],
          totalCount: 0,
        });

        const params: GetUsersParams = { offset: 0, limit: 10 };
        const result = await getUsersUsecase.execute(params);

        expect(result.users).toHaveLength(0);
        expect(result.totalCount).toBe(0);
        expect(mockUserRepository.findAll).toHaveBeenCalledWith(params);
      });

      it("offsetが総件数未満の場合、正常にデータを返すこと", async () => {
        const expectedUsers = [mockUsers[0]];
        mockUserRepository.findAll.mockResolvedValue({
          users: expectedUsers,
          totalCount: 5,
        });

        const params: GetUsersParams = { offset: 4, limit: 10 };
        const result = await getUsersUsecase.execute(params);

        expect(result.users).toHaveLength(1);
        expect(result.totalCount).toBe(5);
        expect(mockUserRepository.findAll).toHaveBeenCalledWith(params);
      });
    });
  });
});
