import { isValidFile } from "./utils";

test("isValidFile return true", () => {
  const englishFile = ["en.json"];
  const frenchFile = ["fr.json"];
  const englishAndFrenchFile = ["en.json", "fr.json"];

  expect(isValidFile(englishFile)).toBe(true);
  expect(isValidFile(frenchFile)).toBe(true);
  expect(isValidFile(englishAndFrenchFile)).toBe(true);
});

test("isValidFile return false", () => {
  const germanFile = ["de.json"];
  const germanAndFrenchFile = ["de.json", "fr.json"];
  const frenchFilePDF = ["fr.pdf"];

  expect(isValidFile(germanFile)).toBe(false);
  expect(isValidFile(germanAndFrenchFile)).toBe(false);
  expect(isValidFile(frenchFilePDF)).toBe(false);
});
