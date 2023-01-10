let fs = require("fs");
let acorn = require("acorn");
let escodegen = require("escodegen");
let beautify = require('js-beautify');

fs.rmSync("./out", { recursive: true, force: true });
fs.mkdirSync("out");

let inputText = fs.readFileSync('in/app.min.js', 'utf8');

let acornNode = acorn.parse(inputText, {ecmaVersion: 2020});

let miscCount = 0;
let currentName = "misc";
let fileContents = "";

acornNode.body.forEach(bodyElement => {
  let name = "";

  if (bodyElement.type == "VariableDeclaration")
  {
    processVariableDeclaration(bodyElement);
    return;
  }
  else if (bodyElement.type == "FunctionDeclaration")
  {
    name = bodyElement.id.name;
  }
  else if (bodyElement.type == "ExpressionStatement" && bodyElement.expression.type == 'AssignmentExpression')
  {
    name = bodyElement.expression.left.name || name;
  }

  processElement(name, bodyElement);
});

finishWritingFileContents();

/// end of processing ///


// a variable declaration may define multiple variables like: `var a = 20, b = 55, c = 0;`
// This function treats them all individually.
function processVariableDeclaration(bodyElement) {
  let decls = [];
  decls = bodyElement.declarations;

  for (let index = 0; index < decls.length; index++) {
    const decl = decls[index];
    // set body variable declaration to have only a single declaration and process it
    bodyElement.declarations = [decl];
    processElement(decl.id.name, bodyElement);
  }
}

function processElement(name, bodyElement) {
  if (name.startsWith("_")) {
    name = "misc";
  }

  let nameChanged = name && (name != currentName);

  if (nameChanged) {
    finishWritingFileContents();
    currentName = name;
  }

  let code = escodegen.generate(bodyElement);
  fileContents += code + "\n";
}

function finishWritingFileContents() {
  let filename = currentName;

  if (currentName == "misc")
  {
    filename += miscCount++;
  }

  if (fileContents) {
    fileContents = beautify(fileContents, { indent_size: 2, space_in_empty_paren: true });
    fs.writeFileSync(`./out/${filename}.js`, fileContents);
    fileContents = "";
  }
}
