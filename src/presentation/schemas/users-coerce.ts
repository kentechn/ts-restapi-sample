import { z as zod } from "zod";
import {
  getAllUsersQueryLimitDefault,
  getAllUsersQueryLimitMax,
  getAllUsersQueryOffsetDefault,
  getAllUsersQueryOffsetMin,
} from "../generated/schemas/users.js";

/**
 * Query parameters for getAllUsers with automatic string-to-number coercion
 * This wraps the auto-generated schema to add coerce functionality
 */
export const getAllUsersQueryParamsWithCoerce = zod.object({
  offset: zod.coerce
    .number()
    .min(getAllUsersQueryOffsetMin)
    .default(getAllUsersQueryOffsetDefault)
    .optional()
    .describe(
      "Number of records to skip (must be non-negative integer). Returns 422 if the offset is out of range or invalid.",
    ),
  limit: zod.coerce
    .number()
    .min(1)
    .max(getAllUsersQueryLimitMax)
    .default(getAllUsersQueryLimitDefault)
    .optional()
    .describe(
      "Number of items per page (1-100). Returns 422 if the limit is out of range or invalid.",
    ),
});
