const vscode = require('vscode');
const path = require('path');

function activate(context) {
  let disposable = vscode.commands.registerCommand('ballBouncingExtension.launch', () => {
    const panel = vscode.window.createWebviewPanel(
      'ballBouncingExtension',
      'Ball Bouncing',
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(context.extensionPath, 'media'))
        ]
      }
    );

    panel.webview.html = getWebViewContent(context, panel.webview);
  });

  context.subscriptions.push(disposable);
}

function getWebViewContent(context, webview) {
  const scriptUri = webview.asWebviewUri(
    vscode.Uri.file(path.join(context.extensionPath, 'index.js'))
  );

  const styleUri = webview.asWebviewUri(
    vscode.Uri.file(path.join(context.extensionPath, 'styles.css'))
  );

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Ball Bouncing Extension</title>
      <link href="${styleUri}" rel="stylesheet">
    </head>
    <body>
      <button id="launchButton">Launch Ball</button>
      <script src="${scriptUri}"></script>
    </body>
    </html>
  `;
}

module.exports = {
  activate
};
