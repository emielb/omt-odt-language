import * as vscode from 'vscode';
import * as path from 'path';

export let doc: vscode.TextDocument;
export let editor: vscode.TextEditor;
export let documentEol: string;
export let platformEol: string;

/**
 * Activates the pvr.omt-odt-language extension
 */
export async function activate(docUri: vscode.Uri) {
    // The extensionId is `publisher.name` from package.json
    const ext = vscode.extensions.getExtension('pvr.omt-odt-language');
    if (ext) {
        await ext.activate();
        try {
            doc = await vscode.workspace.openTextDocument(docUri);
            editor = await vscode.window.showTextDocument(doc);
        } catch (e) {
            console.error(e);
        }
    }
}

export const getDocPath = (p: string) => {
    return path.resolve(__dirname, '../../testFixture', p);
};
export const getDocUri = (p: string) => {
    return vscode.Uri.file(getDocPath(p));
};

export async function setTestContent(content: string): Promise<boolean> {
    const all = new vscode.Range(
        doc.positionAt(0),
        doc.positionAt(doc.getText().length)
    );
    return editor.edit(eb => eb.replace(all, content));
}
