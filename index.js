let fs = require("fs");
let acorn = require("acorn");
let escodegen = require("escodegen");

let inputText = `

function mxGraph(a, b, c, d, e) { this.mouseListeners = null; this.renderHint = c;
    this.dialect = mxClient.IS_SVG ? mxConstants.DIALECT_SVG : c == mxConstants.RENDERING_HINT_FASTEST ? mxConstants.DIALECT_STRICTHTML : c == mxConstants.RENDERING_HINT_FASTER ? mxConstants.DIALECT_PREFERHTML : mxConstants.DIALECT_MIXEDHTML;
    this.model = null != b ? b : new mxGraphModel;
    this.multiplicities = [];
    this.imageBundles = [];
    this.cellRenderer = this.createCellRenderer();
    this.setSelectionModel(this.createSelectionModel());
    this.setStylesheet(null != d ? d : this.createStylesheet());
    this.view = this.createGraphView();
    this.view.rendering = null != e ? e : this.view.rendering;
    this.graphModelChangeListener = mxUtils.bind(this, function(f, g) {
      this.graphModelChanged(g.getProperty("edit").changes)
    });
    this.model.addListener(mxEvent.CHANGE, this.graphModelChangeListener);
    this.createHandlers();
    null != a && this.init(a);
    this.view.rendering && this.view.revalidate()
  }
  mxLoadResources ? mxResources.add(mxClient.basePath + "/resources/graph") : mxClient.defaultBundles.push(mxClient.basePath + "/resources/graph");
  mxGraph.prototype = new mxEventSource;mxGraph.prototype.constructor = mxGraph;  mxGraph.prototype.mouseListeners = null;

`;

inputText = fs.readFileSync('app.min.js', 'utf8');

let d = acorn.parse(inputText, {ecmaVersion: 2020});

let miscCount = 0;
let currentName = "misc";
let fileContents = "";

d.body.forEach(bodyElement => {
  let name = "";

  if (bodyElement.type == "VariableDeclaration")
  {
    name = bodyElement.declarations[0].id.name;
  }
  else if (bodyElement.type == "FunctionDeclaration")
  {
    name = bodyElement.id.name;
  }

  if (name.startsWith("_"))
  {
    name = "misc";
  }

  let nameChanged = name && (name != currentName);

  if (nameChanged)
  {   
    finishWritingFileContents();
    currentName = name;
  }

  let code = escodegen.generate(bodyElement);
  fileContents += code + "\n";
});

finishWritingFileContents();

console.log(d);

let o = escodegen.generate(d);

console.log(o);

function finishWritingFileContents() {
  let filename = currentName;

  if (currentName == "misc")
  {
    filename += miscCount++;
  }

  if (fileContents) {
    fs.writeFileSync(`./out/${filename}.js`, fileContents);
    fileContents = "";
  }
}
