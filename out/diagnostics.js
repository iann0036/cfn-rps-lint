"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const schema_1 = require("./schema");
var JsonMap = require('json-source-map');
var Ajv = require("ajv");
var RefParser = require('json-schema-ref-parser');
function refreshDiagnostics(doc, rpdkSchemaDiagnostics) {
    let diagnostics = [];
    let rpdkSchema = getRPDKSchema(doc);
    if (rpdkSchema) {
        RefParser.dereference("", rpdkSchema, {})
            .then(function (derefedSchema) {
            var ajv = new Ajv({
                allErrors: true,
                missingRefs: "ignore"
            });
            if (!ajv.validate(schema_1.RPDK_SCHEMA, derefedSchema)) {
                ajv.errors.forEach(function (validationErr) {
                    let range = getValidationRange(validationErr);
                    if (range) {
                        let diagnostic = new vscode.Diagnostic(range, validationErr.dataPath.substring(1) + " " + validationErr.message, vscode.DiagnosticSeverity.Error);
                        diagnostic.code = "rp_schema";
                        diagnostics.push(diagnostic);
                    }
                });
            }
            rpdkSchemaDiagnostics.set(doc.uri, diagnostics);
        }).catch(function (err) {
            console.error("Invalid schema: dereference error - " + err);
        });
    }
}
exports.refreshDiagnostics = refreshDiagnostics;
function subscribeToDocumentChanges(context, rpdkSchemaDiagnostics) {
    if (vscode.window.activeTextEditor) {
        refreshDiagnostics(vscode.window.activeTextEditor.document, rpdkSchemaDiagnostics);
    }
    context.subscriptions.push(vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            refreshDiagnostics(editor.document, rpdkSchemaDiagnostics);
        }
    }));
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(e => refreshDiagnostics(e.document, rpdkSchemaDiagnostics)));
    context.subscriptions.push(vscode.workspace.onDidCloseTextDocument(doc => rpdkSchemaDiagnostics.delete(doc.uri)));
}
exports.subscribeToDocumentChanges = subscribeToDocumentChanges;
function getValidationRange(validationErr) {
    let docText = vscode.window.activeTextEditor.document.getText();
    let map = JsonMap.parse(docText);
    let pointerStr = validationErr.dataPath
        .replace(/\./g, "/")
        .replace(/\[([0-9]+)\]/g, "/$1")
        .replace(/\[\'(.+)\'\]/g, "/$1");
    if (pointerStr in map.pointers) {
        return new vscode.Range(new vscode.Position(map.pointers[pointerStr].value.line, map.pointers[pointerStr].value.column), new vscode.Position(map.pointers[pointerStr].valueEnd.line, map.pointers[pointerStr].valueEnd.column));
    }
    else {
        console.warn("Couldn't find pointer string: " + pointerStr);
    }
    return undefined;
}
function getRPDKSchema(doc) {
    try {
        let fileName = doc.fileName;
        if (fileName.match(/[a-z0-9]{2,64}\-[a-z0-9]{2,64}\-[a-z0-9]{2,64}\.json$/g)) {
            let jsonDoc = JSON.parse(doc.getText());
            if ("typeName" in jsonDoc || ("sourceUrl" in jsonDoc && "primaryIdentifier" in jsonDoc)) {
                return jsonDoc;
            }
        }
    }
    catch (e) {
        ;
    }
    return null;
}
//# sourceMappingURL=diagnostics.js.map