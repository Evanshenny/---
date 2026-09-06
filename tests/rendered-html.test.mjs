import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /陈扬波/);
  assert.match(html, /KAIROS/);
  assert.match(html, /AI CREATIVE DESIGNER/);
  assert.match(html, /关于我/);
  assert.match(html, /作品案例/);
  assert.match(html, /下载简历/);
  assert.match(html, /chen-yangbo-aigc-designer\.pdf/);
  assert.match(html, /我的设计能力/);
  assert.match(html, /我的设计历程/);
  assert.match(html, /2016 - 2020/);
  assert.match(html, /ChatGPT/);
  assert.match(html, /tool-icons\/openai\.svg/);
  assert.match(html, /tool-icons\/midjourney\.svg/);
  assert.match(html, /chen-yangbo-signature-transparent\.png/);
  assert.match(html, /AI写真与视觉创作/);
  assert.match(html, /商业视觉设计/);
  assert.match(html, /PPT与网页设计/);
  assert.match(html, /空间设计与场景营造/);
  assert.match(html, /cases\/ai-portrait-169\.png/);
  assert.match(html, /cases\/commercial-visual-169\.png/);
  assert.match(html, /cases\/ppt-web-design-169\.png/);
  assert.match(html, /cases\/spatial-design-169\.png/);
  assert.doesNotMatch(html, /v2-case-nav-overlay/);
  assert.doesNotMatch(html, /精选案例/);
  assert.match(html, /ywhklilv02389@163\.com/);
  assert.doesNotMatch(html, /codex-preview|SkeletonPreview|react-loading-skeleton/);
});

test("keeps the starter preview fully removed", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /id="about"/);
  assert.match(page, /id:\s*"works"/);
  assert.match(page, /id="skills"/);
  assert.match(page, /id="journey"/);
  assert.match(page, /id="contact"/);
  assert.match(page, /className="v2-content-landscape"/);
  assert.doesNotMatch(page, /button-icon--view/);
  assert.match(layout, /lang="zh-CN"/);
  assert.match(layout, /fonts\/lxgwwenkaiscreen\.css/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await access(new URL("../public/chen-yangbo-aigc-designer.pdf", import.meta.url));
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
