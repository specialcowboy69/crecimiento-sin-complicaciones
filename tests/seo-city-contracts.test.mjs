import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";
import ts from "typescript";
import { freeAuditJsonLd, ORGANIZATION_ID } from "../app/lib/structuredData.ts";

const slugs = ["madrid", "valencia", "barcelona", "sevilla", "malaga", "alicante"];
const fixture = JSON.parse(
  await readFile(new URL("./fixtures/seo-city-contracts.json", import.meta.url), "utf8"),
);

function parseModule(source, fileName) {
  const sourceFile = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const declarations = new Map();

  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer) {
        declarations.set(declaration.name.text, declaration.initializer);
      }
    }
  }

  return { sourceFile, declarations, fileName };
}

async function loadModule(url) {
  return parseModule(await readFile(url, "utf8"), url.pathname);
}

function unwrap(node) {
  let current = node;
  while (
    ts.isParenthesizedExpression(current)
    || ts.isAsExpression(current)
    || ts.isTypeAssertionExpression(current)
    || ts.isSatisfiesExpression(current)
    || ts.isNonNullExpression(current)
  ) {
    current = current.expression;
  }
  return current;
}

function propertyName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
    return name.text;
  }
  throw new Error(`Unsupported property name: ${name.getText()}`);
}

function evaluate(node, module, scope = Object.create(null), options = {}) {
  const current = unwrap(node);

  if (ts.isStringLiteral(current) || ts.isNoSubstitutionTemplateLiteral(current)) return current.text;
  if (ts.isNumericLiteral(current)) return Number(current.text);
  if (current.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (current.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (current.kind === ts.SyntaxKind.NullKeyword) return null;

  if (ts.isIdentifier(current)) {
    if (current.text === "undefined") return undefined;
    if (current.text === "ORGANIZATION_ID") return ORGANIZATION_ID;
    if (Object.prototype.hasOwnProperty.call(scope, current.text)) return scope[current.text];
    const initializer = module.declarations.get(current.text);
    if (initializer) return evaluate(initializer, module, scope, options);
    if (options.allowUnknownIdentifiers) return undefined;
    throw new Error(`Unresolved identifier ${current.text} in ${module.fileName}`);
  }

  if (ts.isArrayLiteralExpression(current)) {
    const values = [];
    for (const element of current.elements) {
      if (ts.isSpreadElement(element)) {
        values.push(...evaluate(element.expression, module, scope, options));
      } else {
        values.push(evaluate(element, module, scope, options));
      }
    }
    return values;
  }

  if (ts.isObjectLiteralExpression(current)) {
    const value = {};
    for (const property of current.properties) {
      if (ts.isPropertyAssignment(property)) {
        value[propertyName(property.name)] = evaluate(property.initializer, module, scope, options);
      } else if (ts.isShorthandPropertyAssignment(property)) {
        value[property.name.text] = evaluate(property.name, module, scope, options);
      } else if (ts.isSpreadAssignment(property)) {
        Object.assign(value, evaluate(property.expression, module, scope, options));
      } else {
        throw new Error(`Unsupported object member in ${module.fileName}: ${property.getText()}`);
      }
    }
    return value;
  }

  if (ts.isPropertyAccessExpression(current)) {
    const target = evaluate(current.expression, module, scope, options);
    if (target == null && current.questionDotToken) return undefined;
    return target[current.name.text];
  }

  if (ts.isElementAccessExpression(current)) {
    const target = evaluate(current.expression, module, scope, options);
    const key = evaluate(current.argumentExpression, module, scope, options);
    if (target == null && current.questionDotToken) return undefined;
    return target[key];
  }

  if (ts.isTemplateExpression(current)) {
    let value = current.head.text;
    for (const span of current.templateSpans) {
      value += String(evaluate(span.expression, module, scope, options));
      value += span.literal.text;
    }
    return value;
  }

  if (ts.isPrefixUnaryExpression(current)) {
    const operand = evaluate(current.operand, module, scope, options);
    if (current.operator === ts.SyntaxKind.MinusToken) return -operand;
    if (current.operator === ts.SyntaxKind.PlusToken) return +operand;
    if (current.operator === ts.SyntaxKind.ExclamationToken) return !operand;
  }

  if (ts.isConditionalExpression(current)) {
    return evaluate(current.condition, module, scope, options)
      ? evaluate(current.whenTrue, module, scope, options)
      : evaluate(current.whenFalse, module, scope, options);
  }

  if (ts.isBinaryExpression(current)) {
    const left = evaluate(current.left, module, scope, options);
    if (current.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
      return left && evaluate(current.right, module, scope, options);
    }
    if (current.operatorToken.kind === ts.SyntaxKind.BarBarToken) {
      return left || evaluate(current.right, module, scope, options);
    }
    if (current.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken) {
      return left ?? evaluate(current.right, module, scope, options);
    }
    if (current.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      return left + evaluate(current.right, module, scope, options);
    }
  }

  if (ts.isCallExpression(current) && ts.isIdentifier(current.expression) && current.expression.text === "freeAuditJsonLd") {
    return freeAuditJsonLd(...current.arguments.map((argument) => evaluate(argument, module, scope, options)));
  }

  if (ts.isCallExpression(current) && ts.isPropertyAccessExpression(current.expression)) {
    const callee = current.expression;
    if (callee.name.text === "map") {
      const input = evaluate(callee.expression, module, scope, options);
      const callback = unwrap(current.arguments[0]);
      if (!Array.isArray(input) || !ts.isArrowFunction(callback) || callback.parameters.length !== 1) {
        throw new Error(`Unsupported map expression in ${module.fileName}: ${current.getText()}`);
      }
      const parameter = callback.parameters[0].name;
      if (!ts.isIdentifier(parameter) || ts.isBlock(callback.body)) {
        throw new Error(`Unsupported map callback in ${module.fileName}: ${callback.getText()}`);
      }
      return input.map((item) => evaluate(
        callback.body,
        module,
        { ...scope, [parameter.text]: item },
        options,
      ));
    }
  }

  throw new Error(`Unsupported expression in ${module.fileName}: ${current.getText()}`);
}

function variableValue(module, name, options) {
  const initializer = module.declarations.get(name);
  assert.ok(initializer, `${module.fileName} must declare ${name}`);
  return evaluate(initializer, module, Object.create(null), options);
}

function walk(node, visitor) {
  visitor(node);
  ts.forEachChild(node, (child) => walk(child, visitor));
}

function tagName(node) {
  return node.tagName.getText(node.getSourceFile());
}

function findJsxOpening(module, wantedTag) {
  let match;
  walk(module.sourceFile, (node) => {
    if (match) return;
    if (
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node))
      && tagName(node) === wantedTag
    ) {
      match = node;
    }
  });
  return match;
}

function jsxAttribute(node, name) {
  return node.attributes.properties.find(
    (attribute) => ts.isJsxAttribute(attribute) && attribute.name.text === name,
  );
}

function jsxAttributeValue(attribute, module, scope = Object.create(null), options = {}) {
  assert.ok(attribute?.initializer, `${module.fileName} must define ${attribute?.name?.text ?? "attribute"}`);
  if (ts.isStringLiteral(attribute.initializer)) return attribute.initializer.text;
  if (ts.isJsxExpression(attribute.initializer) && attribute.initializer.expression) {
    return evaluate(attribute.initializer.expression, module, scope, options);
  }
  throw new Error(`Unsupported JSX attribute in ${module.fileName}: ${attribute.getText()}`);
}

function isInternalPath(value) {
  return typeof value === "string" && value.startsWith("/") && !value.startsWith("//");
}

function collectInternalPaths(module, root = module.sourceFile, scope = Object.create(null)) {
  const paths = new Set();
  walk(root, (node) => {
    let candidate;
    try {
      if (ts.isJsxAttribute(node) && node.name.text === "href" && node.initializer) {
        candidate = jsxAttributeValue(node, module, scope, { allowUnknownIdentifiers: true });
      } else if (ts.isPropertyAssignment(node) && propertyName(node.name) === "href") {
        candidate = evaluate(node.initializer, module, scope, { allowUnknownIdentifiers: true });
      }
    } catch {
      return;
    }
    if (isInternalPath(candidate)) paths.add(candidate);
  });
  return paths;
}

function isInside(node, ancestor) {
  return node.pos >= ancestor.pos && node.end <= ancestor.end;
}

function isActive(node, module, scope) {
  for (let current = node; current.parent; current = current.parent) {
    const parent = current.parent;
    try {
      if (
        ts.isBinaryExpression(parent)
        && parent.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
        && isInside(node, parent.right)
        && !evaluate(parent.left, module, scope, { allowUnknownIdentifiers: true })
      ) {
        return false;
      }
      if (ts.isConditionalExpression(parent)) {
        const condition = Boolean(evaluate(parent.condition, module, scope, { allowUnknownIdentifiers: true }));
        if ((isInside(node, parent.whenTrue) && !condition) || (isInside(node, parent.whenFalse) && condition)) {
          return false;
        }
      }
    } catch {
      // Unknown framework expressions do not hide an otherwise literal section.
    }
  }
  return true;
}

function collectSectionIds(module, scope = Object.create(null)) {
  const ids = new Set();
  walk(module.sourceFile, (node) => {
    if (
      !(ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node))
      || tagName(node) !== "section"
      || !isActive(node, module, scope)
    ) return;

    const id = jsxAttribute(node, "id");
    if (!id) return;
    try {
      const value = jsxAttributeValue(id, module, scope, { allowUnknownIdentifiers: true });
      if (typeof value === "string") ids.add(value);
    } catch {
      // A dynamic non-contract id is ignored; expected required ids still fail below.
    }
  });
  return ids;
}

function collectLiteralIds(module) {
  const ids = new Set();
  walk(module.sourceFile, (node) => {
    if (!ts.isJsxAttribute(node) || node.name.text !== "id" || !node.initializer) return;
    try {
      const value = jsxAttributeValue(node, module);
      if (typeof value === "string") ids.add(value);
    } catch {
      // Only literal ids are relevant here.
    }
  });
  return ids;
}

function findSection(module, id) {
  let match;
  walk(module.sourceFile, (node) => {
    if (
      match
      || !ts.isJsxOpeningElement(node)
      || tagName(node) !== "section"
    ) return;
    const attribute = jsxAttribute(node, "id");
    if (!attribute) return;
    try {
      if (jsxAttributeValue(attribute, module) === id) match = node.parent;
    } catch {
      // Dynamic ids cannot be the fixed section requested here.
    }
  });
  return match;
}

const rendererModule = await loadModule(
  new URL("../app/seo/_components/SeoCityLanding.tsx", import.meta.url),
);
const formModule = await loadModule(
  new URL("../app/components/SeoAuditForm.tsx", import.meta.url),
);
const sharedAuditForm = findJsxOpening(rendererModule, "SeoAuditForm");
const rendererComparisonSection = findSection(rendererModule, "ads");
const rendererComparisonPaths = rendererComparisonSection
  ? collectInternalPaths(rendererModule, rendererComparisonSection)
  : new Set();
const rendererPaths = collectInternalPaths(rendererModule);
const formIds = collectLiteralIds(formModule);

async function readCityContract(slug) {
  const routeModule = await loadModule(
    new URL(`../app/seo/${slug}/page.tsx`, import.meta.url),
  );
  const metadata = variableValue(routeModule, "metadata");
  const faqs = variableValue(routeModule, "faqs");
  const jsonLd = variableValue(routeModule, "jsonLd");
  const cityLanding = findJsxOpening(routeModule, "SeoCityLanding");
  let content;

  if (cityLanding) {
    content = jsxAttributeValue(
      jsxAttribute(cityLanding, "content"),
      routeModule,
      Object.create(null),
      { allowUnknownIdentifiers: true },
    );
  }

  const directAuditForm = findJsxOpening(routeModule, "SeoAuditForm");
  const auditFormNode = directAuditForm ?? sharedAuditForm;
  const auditFormModule = directAuditForm ? routeModule : rendererModule;
  const auditScope = directAuditForm ? Object.create(null) : { c: content };
  assert.ok(auditFormNode, `${slug} must render SeoAuditForm`);

  const sectionIds = cityLanding
    ? collectSectionIds(rendererModule, { c: content, auditId: `auditoria-${slug}` })
    : collectSectionIds(routeModule);
  if (formIds.has("audit-request")) sectionIds.add("audit-request");

  const internalHrefs = collectInternalPaths(routeModule);
  if (cityLanding) {
    for (const href of rendererPaths) {
      if (rendererComparisonPaths.has(href) && !content?.comparison) continue;
      if (rendererComparisonPaths.has(href) && content?.comparisonLink?.href) continue;
      internalHrefs.add(href);
    }
  }

  return {
    metadata: {
      canonical: metadata.alternates?.canonical,
      title: metadata.title,
      description: metadata.description,
    },
    faqs,
    jsonLd,
    auditForm: {
      sourcePage: jsxAttributeValue(
        jsxAttribute(auditFormNode, "sourcePage"),
        auditFormModule,
        auditScope,
        { allowUnknownIdentifiers: true },
      ),
      defaultService: jsxAttributeValue(
        jsxAttribute(auditFormNode, "defaultService"),
        auditFormModule,
        auditScope,
        { allowUnknownIdentifiers: true },
      ),
    },
    sectionIds: [...sectionIds].sort(),
    internalHrefs: [...internalHrefs].sort(),
    jsonLdEscaped: routeModule.sourceFile.getFullText().includes("JSON.stringify(jsonLd).replace("),
  };
}

const actual = Object.fromEntries(
  await Promise.all(slugs.map(async (slug) => [slug, await readCityContract(slug)])),
);

test("all six production SEO city routes stay covered by the frozen contract fixture", () => {
  assert.deepEqual(Object.keys(fixture).sort(), [...slugs].sort());
});

test("city metadata keeps canonical URLs and search snippets stable", () => {
  for (const slug of slugs) {
    assert.deepEqual(actual[slug].metadata, fixture[slug].metadata, slug);
  }
});

test("city FAQ copy cannot drift away from the published questions and answers", () => {
  for (const slug of slugs) {
    assert.deepEqual(actual[slug].faqs, fixture[slug].faqs, slug);
  }
});

test("city structured data keeps breadcrumb, service, offer, and FAQ values stable", () => {
  for (const slug of slugs) {
    assert.deepEqual(actual[slug].jsonLd, fixture[slug].jsonLd, slug);
  }
});

test("city JSON-LD scripts keep the defensive less-than escape", () => {
  for (const slug of slugs) {
    assert.equal(actual[slug].jsonLdEscaped, true, slug);
  }
});

test("city audit forms keep exact lead source and default service labels", () => {
  for (const slug of slugs) {
    assert.deepEqual(actual[slug].auditForm, fixture[slug].auditForm, slug);
  }
});

test("city navigation keeps every required section anchor available", () => {
  for (const slug of slugs) {
    for (const sectionId of fixture[slug].sectionIds) {
      assert.ok(actual[slug].sectionIds.includes(sectionId), `${slug}: missing #${sectionId}`);
    }
  }
});

test("city pages keep their existing internal SEO destinations", () => {
  for (const slug of slugs) {
    for (const href of fixture[slug].internalHrefs) {
      assert.ok(actual[slug].internalHrefs.includes(href), `${slug}: missing ${href}`);
    }
  }
});
