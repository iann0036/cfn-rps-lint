import * as vscode from 'vscode';
import { subscribeToDocumentChanges } from './diagnostics';

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider('json', new RDPKSchemaActionProvider(), {
			providedCodeActionKinds: RDPKSchemaActionProvider.providedCodeActionKinds
		})
	);

	const rpdkSchemaDiagnostics = vscode.languages.createDiagnosticCollection("rpdk-schema");
	context.subscriptions.push(rpdkSchemaDiagnostics);

	subscribeToDocumentChanges(context, rpdkSchemaDiagnostics);
}

export class RDPKSchemaActionProvider implements vscode.CodeActionProvider {

	public static readonly providedCodeActionKinds = [
		vscode.CodeActionKind.Empty
	];

	provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.CodeAction[] {
		return context.diagnostics
			.filter(diagnostic => diagnostic.code === "rpdk_schema_diagnostic")
			.map(diagnostic => this.createCommandCodeAction(diagnostic));
	}

	private createCommandCodeAction(diagnostic: vscode.Diagnostic): vscode.CodeAction {
		const action = new vscode.CodeAction('No actions available', vscode.CodeActionKind.Empty);
		action.diagnostics = [diagnostic];
		action.isPreferred = true;
		return action;
	}
}

export function deactivate() {}
