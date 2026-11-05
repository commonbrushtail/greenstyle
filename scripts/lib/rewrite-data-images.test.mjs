import test from "node:test";
import assert from "node:assert/strict";
import { parseDataImage, rewriteDataImages } from "./rewrite-data-images.mjs";

const PNG = `data:image/png;base64,${Buffer.from("png-bytes").toString("base64")}`;
const JPEG = `data:image/jpeg;base64,${Buffer.from("jpeg-bytes").toString("base64")}`;

const fakeUpload = async ({ bytes, ext }) =>
  `https://store.example/${bytes.toString()}.${ext}`;

test("parseDataImage decodes bytes and maps the mime type to an extension", () => {
  const parsed = parseDataImage(PNG);
  assert.equal(parsed.ext, "png");
  assert.equal(parsed.contentType, "image/png");
  assert.equal(parsed.bytes.toString(), "png-bytes");
  assert.equal(parseDataImage(JPEG).ext, "jpg");
});

test("parseDataImage ignores ordinary strings", () => {
  assert.equal(parseDataImage("hello"), null);
  assert.equal(parseDataImage("https://x.test/a.png"), null);
  assert.equal(parseDataImage("/images/logo.png"), null);
});

test("replaces images at any depth and leaves every other value identical", async () => {
  const input = {
    heading: "สวัสดี",
    image: PNG,
    count: 3,
    flag: false,
    nothing: null,
    stages: [{ icon: JPEG, title: "one" }, { icon: "", title: "two" }],
  };
  const { value, replaced, skipped } = await rewriteDataImages(input, fakeUpload);
  assert.deepEqual(value, {
    heading: "สวัสดี",
    image: "https://store.example/png-bytes.png",
    count: 3,
    flag: false,
    nothing: null,
    stages: [
      { icon: "https://store.example/jpeg-bytes.jpg", title: "one" },
      { icon: "", title: "two" },
    ],
  });
  assert.equal(replaced, 2);
  assert.deepEqual(skipped, []);
});

test("does not mutate its input, so a failed run can't corrupt the original", async () => {
  const input = { image: PNG, nested: [{ icon: JPEG }] };
  const copy = structuredClone(input);
  await rewriteDataImages(input, fakeUpload);
  assert.deepEqual(input, copy);
});

test("running it again on its own output changes nothing", async () => {
  const first = await rewriteDataImages({ image: PNG }, fakeUpload);
  let uploads = 0;
  const second = await rewriteDataImages(first.value, async (f) => {
    uploads += 1;
    return fakeUpload(f);
  });
  assert.equal(uploads, 0);
  assert.equal(second.replaced, 0);
  assert.deepEqual(second.value, first.value);
});

test("a failed upload rejects rather than dropping the image", async () => {
  await assert.rejects(
    rewriteDataImages({ image: PNG }, async () => {
      throw new Error("store down");
    }),
    /store down/
  );
});

test("reports a data image it can't convert and keeps it in place", async () => {
  const odd = "data:image/tiff;base64,AAAA";
  const embedded = `<p>see <img src="${PNG}"></p>`;
  const { value, replaced, skipped } = await rewriteDataImages(
    { a: odd, b: { c: embedded } },
    fakeUpload
  );
  assert.equal(replaced, 0);
  assert.deepEqual(value, { a: odd, b: { c: embedded } });
  assert.deepEqual(skipped, ["a", "b.c"]);
});
