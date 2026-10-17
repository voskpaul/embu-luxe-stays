import { describe, expect, it } from "vitest";
import { PROPERTIES, filterProperties } from "@/data/properties";
describe("property filters", () => {
  it("filters by type", () => expect(filterProperties(PROPERTIES, { type: "Villa" }).every((p) => p.type === "Villa")).toBe(true));
  it("filters by max price", () => expect(filterProperties(PROPERTIES, { maxPrice: 10000 }).map((p) => p.slug)).toEqual(["embu-executive-residence"]));
  it("requires all amenities", () => expect(filterProperties(PROPERTIES, { amenities: ["Infinity pool", "Private chef"] }).map((p) => p.slug)).toEqual(["kirimiri-ridge-villa"]));
});
