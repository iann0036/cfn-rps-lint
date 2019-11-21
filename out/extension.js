"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const diagnostics_1 = require("./diagnostics");
function activate(context) {
    context.subscriptions.push(vscode.languages.registerCodeActionsProvider('json', new RDPKSchemaActionProvider(), {
        providedCodeActionKinds: RDPKSchemaActionProvider.providedCodeActionKinds
    }));
    const rpdkSchemaDiagnostics = vscode.languages.createDiagnosticCollection("rp-schema");
    context.subscriptions.push(rpdkSchemaDiagnostics);
    diagnostics_1.subscribeToDocumentChanges(context, rpdkSchemaDiagnostics);
}
exports.activate = activate;
class RDPKSchemaActionProvider {
    provideCodeActions(document, range, context, token) {
        return context.diagnostics
            .filter(diagnostic => diagnostic.code === "rp_schema")
            .map(diagnostic => this.createCommandCodeAction(diagnostic));
    }
    createCommandCodeAction(diagnostic) {
        const action = new vscode.CodeAction('No actions available', vscode.CodeActionKind.Empty);
        action.diagnostics = [diagnostic];
        action.isPreferred = true;
        return action;
    }
}
RDPKSchemaActionProvider.providedCodeActionKinds = [
    vscode.CodeActionKind.Empty
];
exports.RDPKSchemaActionProvider = RDPKSchemaActionProvider;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map