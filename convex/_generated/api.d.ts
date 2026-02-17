/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as api_ from "../api.js";
import type * as applicationLeads from "../applicationLeads.js";
import type * as contacts from "../contacts.js";
import type * as emails from "../emails.js";
import type * as leadMagnetLeads from "../leadMagnetLeads.js";
import type * as valueCalculatorLeads from "../valueCalculatorLeads.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  api: typeof api_;
  applicationLeads: typeof applicationLeads;
  contacts: typeof contacts;
  emails: typeof emails;
  leadMagnetLeads: typeof leadMagnetLeads;
  valueCalculatorLeads: typeof valueCalculatorLeads;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
